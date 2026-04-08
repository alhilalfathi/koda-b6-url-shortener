import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import http from "../lib/http"

//icons
import { FaArrowLeft } from "react-icons/fa";

export const CreateLink = () => {

    const navigate = useNavigate()

    const [url, setUrl] = useState("")
    const [slug, setSlug] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleCreate() {
        if (!url) {
            return alert("Destination URL is required")
        }

        const token = localStorage.getItem("token")
        if (!token) {
            return alert("Please login first")
        }

        setIsLoading(true)
        try {
            const response = await http("/api/links", {
                method: "POST",
                body: {
                    original_url: url,
                    slug: slug || undefined
                }
            })

            if (response.success) {
                alert(`Short link created: ${response.results.shorten_url}`)
                
                // reset form
                setUrl("")
                setSlug("")

                navigate("/dashboard")
            } else {
                alert(response.message || "Failed to create link")
            }

        } catch (error) {
            console.log(error)
            alert("Connection error")
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="w-full h-screen bg-[#f7f8fa] flex flex-col gap-5 items-center py-20">
                <div className="w-3/5">
                    
                    {/* back */}
                    <Link to="/dashboard" className="flex gap-3 items-center text-blue-700">
                        <FaArrowLeft/> Back to dashboard
                    </Link>

                    <h1 className="text-2xl font-bold mt-3">Create New Short Link</h1>
                    <h2 className="text-gray-600">
                        Transform your long URLs into clean, manageable assets.
                    </h2>

                    <div className="flex flex-col gap-5 bg-white w-full px-5 py-10 mt-5 mb-5 rounded">

                        {/* URL */}
                        <div className="flex flex-col gap-3">
                            <span className="font-bold">Destination URL</span>
                            <input 
                                type="text"
                                placeholder="https://example.com/your-long-url-here"
                                className="p-3 bg-[#f7f8fa] rounded outline-none"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <span className="text-gray-600 text-sm font-light">
                                Ensure your URL starts with http:// or https://
                            </span>
                        </div>

                        {/* SLUG */}
                        <div className="flex flex-col gap-3">
                            <span className="font-bold">Custom Slug (Optional)</span>
                            <div className="flex w-full">
                                <span className="p-3 bg-gray-300 w-60 rounded-l">
                                    http://localhost:8888/
                                </span>
                                <input 
                                    type="text"
                                    placeholder="my-custom-slug"
                                    className="w-full p-3 bg-[#f7f8fa] rounded-r outline-none"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div> 
                            <span className="text-gray-600 text-sm font-light">
                                Leave blank to generate a random unique identifier.
                            </span>
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={isLoading}
                            className={`mt-5 w-full py-3 text-white rounded-xl ${
                                isLoading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                            }`}
                        >
                            {isLoading ? "Creating..." : "Create Short Link"}
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}