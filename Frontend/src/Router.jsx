import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Landing } from "./pages/Landing";
import { RegisterPage } from "./pages/Register";
import { DashboardPage } from "./pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />
    }
])

export function Router(){
    return(
        <RouterProvider router={router}/>
    )
}