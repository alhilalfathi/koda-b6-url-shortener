import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Landing } from "./pages/Landing";
import { RegisterPage } from "./pages/Register";
import { DashboardPage } from "./pages/Dashboard";
import { CreateLink } from "./pages/CreateLink";
import { Profile } from "./pages/Profile";
import { NotFoundPage } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        )
    },
    {
        path: "/create-link",
        element: (
            <ProtectedRoute>
                <CreateLink />
            </ProtectedRoute>
        )
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
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