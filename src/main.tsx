import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashBoard from "./page/Dashboard";
import Login from "./page/Login";
import UsersPage from "./page/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App>
                <DashBoard />
            </App>
        ),
    },
    {
        path: "/login",
        element: (
            <App>
                <Login />
            </App>
        ),
    },
    {
        path: "/users",
        element: (
            <App>
                <UsersPage />
            </App>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
