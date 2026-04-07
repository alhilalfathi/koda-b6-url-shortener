import { Link } from "react-router-dom"


export const Navbar = () => {
    return (
        <div className="flex justify-between w-full h-16 bg-white px-5">

            {/* left Navbar */}
            <div className="flex items-center gap-6">
                <span className="text-xl text-black font-bold"><Link to="/">ShortLink</Link></span>
                <ul className="text-gray-800 flex gap-6">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li> <Link to="" >Analytics</Link></li>
                    <li> <Link to="" >Links</Link></li>
                </ul>
            </div>

            {/* right Navbar */}
            <div className="flex items-center gap-6">
                <Link className="w-24 h-10 border flex items-center justify-center rounded" to="/login">SignIn</Link>
                <Link className="w-24 h-10 bg-blue-700 text-white flex items-center justify-center rounded" to="/register">Sign Up</Link>
            </div>
        </div>
    )

}