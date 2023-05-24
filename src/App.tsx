import { ReactNode, createContext, useEffect, useState } from "react";
import { UserType } from "./utils/types";
import { useNavigate, useRoutes } from "react-router-dom";

const AppContext = createContext<{ user?: UserType; db?: IDBDatabase }>({});
const AppProvider = AppContext.Provider;

type AppType = {
    children: ReactNode;
};

function App(props: AppType) {
    const [user, setUser] = useState<UserType>();
    const [db, setDb] = useState<IDBDatabase>(); // State to store the database connection
    const navigate = useNavigate()

    useEffect(() => {
        openDatabase();
    }, []);

    const openDatabase = () => {
        const request = indexedDB.open("myDB", 1);

        request.onupgradeneeded = (event) => {
            // @ts-ignore
            const db = event.target.result as IDBDatabase;
            const objectStore = db.createObjectStore("users", { keyPath: "username" });
            objectStore.createIndex("username", "username", { unique: true });
        };

        request.onsuccess = (event) => {
            // @ts-ignore

            const db = event.target.result as IDBDatabase;
            setDb(db); // Store the database connection in the state

            // Access the object store
            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            // Get the user from the database
            const getRequest = objectStore.get("username");

            getRequest.onsuccess = (event) => {
                // @ts-ignore
                const user = event.target.result as UserType;
                if(!user){
                  navigate("/login")
                  return
                }
                setUser(user); // Set the user state
            };
        };

        request.onerror = (event) => {
            // @ts-ignore
            console.error("Error opening database:", event.target.error);
        };
    };

    const addUserToDatabase = (user: UserType) => {
      if (!db) {
        console.error("Database connection not available");
        return;
      }
  
      const transaction = db.transaction("users", "readwrite");
      const objectStore = transaction.objectStore("users");
  
      const addRequest = objectStore.add(user);
  
      addRequest.onsuccess = () => {
        console.log("User added to the database");
      };
  
      addRequest.onerror = (event) => {
        // @ts-ignore
        console.error("Error adding user to the database:", event.target.error);
      };
    };

    return <AppProvider value={{ user, db }}>{props.children}</AppProvider>;
}

export default App;
