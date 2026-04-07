import { Link } from "react-router-dom"

import { FaArrowLeft } from "react-icons/fa";

export const NotFoundPage = () => {
    return (
        <div className="w-full h-screen bg-[#f7f8fa] flex flex-col gap-5 items-center py-20">
            <h1 className="text-4xl text-blue-700 font-extrabold">404 </h1>
            <h1 className="text-xl font-bold">PAGE NOT FOUND</h1>
            <p className="w-80 text-center">
                The page you're looking for doesn't exist. It may
                have been moved, deleted, or the link might be
                broken.
            </p>

            <div className="flex gap-5">
                <Link to="/dashboard" className="w-60 px-8 py-3 bg-blue-700 text-white rounded-xl flex gap-3 items-center">
                    <FaArrowLeft className="w-5 h-5"/>
                    Go to Dashboard
                </Link>
                <Link to="/" className="w-60 px-8 py-3 bg-white text-blue-700 rounded-xl">
                    Report an Issue
                </Link>
            </div>
        </div>
    )
}