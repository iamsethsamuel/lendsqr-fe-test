import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashBoard from "./page/Dashboard";
import Login from "./page/Login";
import UsersPage from "./page/Users";
import UserProfile from "./page/UserProfile";

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
    {
        path: "/profile",
        element: (
            <App>
                <UserProfile />
            </App>
        ),
    },
]);

export const TestRouter = ({ children, path }: { children: ReactNode; path: string }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <App>
                        <DashBoard />
                    </App>
                </Route>
                {children}
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
