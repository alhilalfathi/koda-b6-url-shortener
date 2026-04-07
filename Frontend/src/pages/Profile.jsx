import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

//icons
import { IoLink } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";


export const Profile = () => {
    return(
        <div>
            <Navbar />
            <div className="w-full h-screen bg-[#f7f8fa] flex flex-col gap-5 items-center py-20">
                <div className="w-3/5">
                    <p>Account Management</p>

                    <div className="flex flex-col gap-5 bg-white w-full h-125 px-5 py-10 mt-5 mb-5 rounded">
                        <p className="text-xl">Profile</p>
                        <div className="flex gap-5">
                            <img src="https://placehold.co/100x100" alt="profile-image" />
                            <div className="flex flex-col gap-3">
                                <p className="text-xl font-bold">User Name</p>
                                <p>Title</p>
                            </div>
                        </div>

                        {/* user info */}
                        <div className="flex gap-5">
                            <div className="w-1/2 bg-[#f7f8fa] p-3">
                                <p className="text-gray-600">Email Addres</p>
                                <span>email</span>
                            </div>
                            <div className="w-1/2 bg-[#f7f8fa] p-3">
                                <p className="text-gray-600">ACCOUNT TENURE</p>
                                <span>Member since: date</span>
                            </div>
                        </div>

                        <div className="flex justify-between bg-blue-800 text-white w-full rounded p-5">
                            <div className="flex gap-6 items-center">
                                <IoLink className="w-7 h-7"/>
                                <div className="flex flex-col">
                                    <p>ACTIVE ASSETS</p>
                                    <span>assets.count</span>
                                </div>
                            </div>
                            <button className="bg-blue-600 p-3 rounded cursor-pointer">VIEW LINKS</button>
                        </div>

                        {/* logout */}
                        <button className="w-90% p-3 bg-[#f7f8fa] rounded cursor-pointer flex items-center justify-center gap-3">
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