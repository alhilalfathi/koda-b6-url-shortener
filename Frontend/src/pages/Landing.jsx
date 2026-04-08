import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState } from "react"
import http from "../lib/http"

// icons
import { FaLink, FaBolt, FaLayerGroup, FaUsers, FaCheckCircle } from "react-icons/fa"

export const Landing = () => {
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleShorten() {
        if (!url) return alert("Please input URL first")
        const token = localStorage.getItem("token")
        if (!token) return alert("Please login first")

        setIsLoading(true)
        try {
            const response = await http("/api/links", {
                method: "POST",
                body: { original_url: url }
            })

            if (response.success) {
                const shortLink = response.results?.shorten_url || response.results?.slug
                alert(`Short link created: ${shortLink}`)
                setUrl("")
            } else {
                alert(response.message || "Failed to shorten link")
            }
        } catch (error) {
            console.log(error)
            alert("Connection error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans">
            <Navbar />
            
            {/* Hero Section */}
            <div className="w-full flex flex-col gap-6 py-24 items-center px-4">
                <h1 className="text-black font-extrabold text-5xl tracking-tight text-center">
                    Shorten URLs. <span className="text-blue-600">Share Easily.</span>
                </h1>

                <p className="max-w-xl text-center text-gray-500 leading-relaxed">
                    Create short, memorable links for your team communications.
                    Transform long, cumbersome URLs into powerful digital assets that
                    drive engagement.
                </p>

                <div className="flex gap-4 mt-2">
                    <Link to="/create-link" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md shadow-blue-100 hover:bg-blue-700 transition-all">
                        Get Started
                    </Link>
                    <button className="px-8 py-3 border border-gray-200 bg-white text-gray-600 font-semibold rounded-md hover:bg-gray-50 transition-all">
                        Learn More
                    </button>
                </div>

                {/* Shorten Input Box */}
                <div className="flex bg-white rounded-xl p-2 pl-5 gap-3 w-full max-w-2xl h-18 items-center justify-between shadow-xl shadow-blue-900/5 mt-10 border border-gray-100">
                    <div className="flex items-center gap-3 flex-1">
                        <FaLink className="text-gray-300" />
                        <input
                            type="text"
                            placeholder="https://put-your-link-here"
                            className="w-full outline-none text-sm text-gray-600 bg-transparent"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleShorten}
                        disabled={isLoading}
                        className={`px-8 h-full text-white font-bold rounded-lg transition-all ${isLoading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}`}
                    >
                        {isLoading ? "..." : "Shorten"}
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto py-20 px-6">
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Architectural Features</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-12">Built for Enterprise Precision</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-50 group hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-6 text-blue-600">
                            <FaBolt />
                        </div>
                        <h3 className="font-bold text-lg mb-3">Easy Create</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Instantly generate high-performance short links with a single click or through our surgical API endpoints.
                        </p>
                        <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-50 hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center mb-6 text-indigo-600">
                            <FaLayerGroup />
                        </div>
                        <h3 className="font-bold text-lg mb-3">Custom Slugs</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Maintain brand authority with readable, custom link endings that resonate with your digital audience.
                        </p>
                        <div className="w-10 h-1 bg-indigo-400 rounded-full"></div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-50 hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center mb-6 text-orange-600">
                            <FaUsers />
                        </div>
                        <h3 className="font-bold text-lg mb-3">Team Ready</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.
                        </p>
                        <div className="w-10 h-1 bg-orange-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <img 
                        src="https://placehold.co/600" 
                        alt="Analytics Dashboard" 
                        className="rounded-2xl z-10 relative"
                    />
                    <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-0"></div>
                </div>
                
                <div className="flex flex-col gap-6">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Data Driven Insights</span>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">Observe your link architecture in real-time.</h2>
                    <p className="text-gray-500 leading-relaxed">
                        Every click is a data point. Our dashboard provides surgical precision into where your traffic originates, who is engaging, and how your team communications are performing across the globe.
                    </p>
                    <ul className="flex flex-col gap-4">
                        {["Geographic Distribution Maps", "Device & Browser Breakdown", "UTM Parameter Tracking"].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                <FaCheckCircle className="text-blue-600" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    )
}