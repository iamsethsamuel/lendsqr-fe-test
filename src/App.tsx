import { ReactNode, createContext, useEffect, useState } from "react";
import { UserType } from "./utils/types";
import { useNavigate} from "react-router-dom";
import SnackBar from "./components/snackbar/SnackBar";
import NavBar from "./components/navbar/NavBar";
import PageWrapper from "./components/PageWrapper";

type AppContextType = {
    showSnackBar: (msg: string) => void;
    closeSnackBar: () => void;
    user?: UserType;
    users: UserType[];
    db?: IDBDatabase;
    handleUserChange: (user: UserType) => void;
    logout: () => void;
};

export const AppContext = createContext<AppContextType>({
    handleUserChange: () => {
        /*init */
    },
    showSnackBar: () => {
        {
            /*init */
        }
    },
    closeSnackBar: () => {
        {
            /*init */
        }
    },
    users: [],
    logout: () => {
        /*init */
    },
});
export const AppProvider = AppContext.Provider;

type AppType = {
    children: ReactNode;
};

function App(props: AppType) {
    const [user, setUser] = useState<UserType>();
    const [users, setUsers] = useState<UserType[]>([]);
    const [db, setDb] = useState<IDBDatabase>();
    const [message, setSnackBarMsg] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        openDatabase();
        fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
            .then((res) => {
                res.json()
                    .then((data) => {
                        setUsers(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        getUserFromDatabase(localStorage.getItem("userId")?.toString() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db, ]);

    useEffect(() => {
        if (user) {
            document.body.style.setProperty("background-color", "#e5e5e5");
        } else {
            document.body.style.setProperty("background-color", "white");
        }
    }, [user]);

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
            navigate("/users");
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

    const deleteUserFromDatabase = (id: string) => {
        if (!db) {
            console.error("Database connection not available");
            return;
        }

        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");

        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = () => {
            navigate("/login")
            console.log("User deleted from the database");
        };

        deleteRequest.onerror = (event) => {
            //@ts-ignore
            console.error("Error deleting user from the database:", event.target.error);
        };
    };

    const logout = () => {
        if (user && user.id) {
            deleteUserFromDatabase(user.id);
        }
        setUser(undefined);
    };

    return (
        <AppProvider
            value={{
                users: users,
                user: user,
                db: db,
                showSnackBar: handleSnackBarMsg,
                closeSnackBar: handleCloseSnackBar,
                handleUserChange: addUserToDatabase,
                logout: logout,
            }}>
            {user ? <PageWrapper>{props.children}</PageWrapper> : props.children}
            <SnackBar open={message.length > 0} message={message} onClose={handleCloseSnackBar} />
            {user && <NavBar />}
        </AppProvider>
    );
}

export default App;
