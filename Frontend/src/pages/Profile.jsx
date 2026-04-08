import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../lib/http"

//icons
import { IoLink } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

export const Profile = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [linksCount, setLinksCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")

        if (!storedUser) {
            navigate("/login")
            return
        }

        setUser(JSON.parse(storedUser))

        fetchLinks()
    }, [])

    async function fetchLinks() {
        try {
            const response = await http("/api/links")

            if (response.success) {
                setLinksCount(response.results.length)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    return(
        <div>
            <Navbar />
            <div className="w-full h-screen bg-[#f7f8fa] flex flex-col gap-5 items-center py-20">
                <div className="w-3/5">
                    <p>Account Management</p>

                    <div className="flex flex-col gap-5 bg-white w-full px-5 py-10 mt-5 mb-5 rounded">
                        <p className="text-xl">Profile</p>

                        <div className="flex gap-5">
                            <img 
                                src="https://placehold.co/100x100" 
                                alt="profile" 
                                className="rounded-full"
                            />
                            <div className="flex flex-col gap-3">
                                <p className="text-xl font-bold">
                                    {user?.fullname || "-"}
                                </p>
                                <p className="text-gray-500">
                                    ShortLink User
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-1/2 bg-[#f7f8fa] p-3 rounded">
                                <p className="text-gray-600">Email Address</p>
                                <span>{user?.email || "-"}</span>
                            </div>

                            <div className="w-1/2 bg-[#f7f8fa] p-3 rounded">
                                <p className="text-gray-600">ACCOUNT TENURE</p>
                                <span>
                                    Member since: {user?.created_at 
                                        ? new Date(user.created_at).toLocaleDateString() 
                                        : "-"}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between bg-blue-800 text-white w-full rounded p-5">
                            <div className="flex gap-6 items-center">
                                <IoLink className="w-7 h-7"/>
                                <div className="flex flex-col">
                                    <p>ACTIVE ASSETS</p>
                                    <span>
                                        {isLoading ? "Loading..." : linksCount}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate("/dashboard")}
                                className="bg-blue-600 p-3 rounded cursor-pointer"
                            >
                                VIEW LINKS
                            </button>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="w-full p-3 bg-[#f7f8fa] rounded cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-200"
                        >
                            <CiLogout className="w-5 h-5"/>
                            Logout Session
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}