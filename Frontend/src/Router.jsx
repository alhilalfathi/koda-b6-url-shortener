import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Landing } from "./pages/Landing";
import { RegisterPage } from "./pages/Register";
import { DashboardPage } from "./pages/Dashboard";
import { CreateLink } from "./pages/CreateLink";
import { Profile } from "./pages/Profile";
import { NotFoundPage } from "./pages/NotFound";

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
    },
    {
        path: "/create-link",
        element: <CreateLink />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/page-not-found",
        element: <NotFoundPage />
    }
])

export function Router(){
    return(
        <RouterProvider router={router}/>
    )
}