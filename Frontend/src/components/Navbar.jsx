import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()
    
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        alert("Logged out successfully")
        navigate("/login")
    }

    return (
        <div className="flex justify-between w-full h-16 bg-white px-5 shadow-sm">

            {/* left Navbar */}
            <div className="flex items-center gap-6">
                <span className="text-xl text-black font-bold">
                    <Link to="/">ShortLink</Link>
                </span>
                
                {token && (
                    <ul className="text-gray-800 flex gap-6">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/page-not-found">Analytics</Link></li>
                        <li><Link to="/create-link">Links</Link></li>
                    </ul>
                )}
            </div>

            {/* right Navbar */}
            <div className="flex items-center gap-6">
                {token ? (
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-black"><Link to="/profile">{user?.fullname}</Link></span>
                            <span className="text-xs text-gray-500">{user?.email}</span>
                        </div>
                        <button 
                            onClick={logout}
                            className="px-4 py-2 bg-blue-800 text-white rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link className="w-24 h-10 border flex items-center justify-center rounded border-gray-300 hover:bg-gray-50" to="/login">
                            SignIn
                        </Link>
                        <Link className="w-24 h-10 bg-blue-700 text-white flex items-center justify-center rounded hover:bg-blue-800" to="/register">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}