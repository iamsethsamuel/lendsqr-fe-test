import { ReactNode, createContext, useEffect, useState } from "react";
import { UserType } from "./utils/types";
import { useNavigate, useRoutes } from "react-router-dom";
import SnackBar from "./components/snackbar/SnackBar";
import Drawer from "./components/drawer/Drawer";

type AppContextType = {
    showSnackBar: (msg: string) => void;
    closeSnackBar: () => void;
    user?: UserType;
    db?: IDBDatabase;
    handleUserChange: (user: UserType) => void;
};

export const AppContext = createContext<AppContextType>({
    handleUserChange: (_) => {
        /*init */
    },
    showSnackBar: (_) => {
        {
            /*init */
        }
    },
    closeSnackBar: () => {
        {
            /*init */
        }
    },
});
const AppProvider = AppContext.Provider;

type AppType = {
    children: ReactNode;
};

function App(props: AppType) {
    const [user, setUser] = useState<UserType>();
    const [db, setDb] = useState<IDBDatabase>();
    const [message, setSnackBarMsg] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        openDatabase();
    }, []);

    useEffect(() => {
        getUserFromDatabase(localStorage.getItem("userId")?.toString() || "");
    }, [db]);

    const openDatabase = () => {
        const request = indexedDB.open("myDB", 1);

        request.onupgradeneeded = (event) => {
            // @ts-ignore

            const db = event.target.result as IDBDatabase;
            const objectStore = db.createObjectStore("users", { keyPath: "id" });
            objectStore.createIndex("id", "id", { unique: true });
        };

        request.onsuccess = (event) => {
            // @ts-ignore

            const db = event.target.result as IDBDatabase;
            setDb(db); // Store the database connection in the state
        };

        request.onerror = (event) => {
            // @ts-ignore

            console.log("Error opening database:", event.target.error);
        };
    };

    const addUserToDatabase = (user: UserType) => {
        if (!db) {
            console.log("Database connection not available");
            return;
        }

        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");
        const addRequest = objectStore.add(user);

        addRequest.onsuccess = (event) => {
            // @ts-ignore

            const id = event.target.result as number;
            localStorage.setItem("userId", user.id);
            setUser(user);

            console.log("User added to the database with ID:", id);
            navigate("/");
        };

        addRequest.onerror = (event) => {
            // @ts-ignore

            if (String(event.target.error).includes("exists")) {
                navigate("/");
            }
            // @ts-ignore
            console.log("Error adding user to the database:", event.target.error);
        };
    };

    const getUserFromDatabase = (id: string) => {
        if (!db) {
            console.log("Database connection not available");
            return;
        }

        const transaction = db.transaction("users", "readonly");
        const objectStore = transaction.objectStore("users");

        const getRequest = objectStore.get(id);

        getRequest.onsuccess = (event) => {
            // @ts-ignore

            const user = event.target.result as UserType;
            if (!user) {
                navigate("/login");
            } else {
                setUser(user);
            }
            // You can perform further operations with the retrieved user
        };

        getRequest.onerror = (event) => {
            // @ts-ignore

            console.log("Error retrieving user from the database:", event.target.error);
        };
    };

    const handleSnackBarMsg = (msg: string) => {
        setSnackBarMsg(msg);
    };

    const handleCloseSnackBar = () => {
        setSnackBarMsg("");
    };

    return (
        <AppProvider
            value={{
                user: user,
                db: db,
                showSnackBar: handleSnackBarMsg,
                closeSnackBar: handleCloseSnackBar,
                handleUserChange: addUserToDatabase,
            }}>
            {props.children}
            <SnackBar open={message.length > 0} message={message} onClose={handleCloseSnackBar} />
            {user && <Drawer />}
        </AppProvider>
    );
}

export default App;
