import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import http from "../lib/http"

//icons
import { IoSearchOutline } from "react-icons/io5"
import { LinkBox } from "../components/LinkBox"

export const DashboardPage = () => {
    const [links, setLinks] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function fetchLinks() {
        setIsLoading(true)
        try {
            const response = await http("/api/links", {
                method: "GET"
            })

            if (response.success) {
                setLinks(response.results || [])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    // filter search
    const filteredLinks = links.filter(link =>
        link.original_url?.toLowerCase().includes(search.toLowerCase()) ||
        link.short_url?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Navbar />
            <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col gap-5 items-center py-20">

                <div className="w-3/5">
                    <div className="flex justify-between w-full">
                        <span className="text-2xl font-bold">My Links</span>
                        <span className="text-xl font-bold text-gray-600">TOTAL ACTIVE</span>
                    </div>

                    <div className="flex justify-between w-full">
                        <span>Manage and track your shortened digital assets.</span>
                        <span className="text-2xl text-blue-700 font-bold">
                            {links.length}
                        </span>
                    </div>

                    {/* search */}
                    <div className="w-full bg-white p-3 mt-5 flex gap-5 rounded">
                        <IoSearchOutline className="w-7 h-7" />
                        <input
                            type="text"
                            placeholder="Search by name or URL..."
                            className="w-full outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredLinks.length === 0 ? (
                    <p>No links found</p>
                ) : (
                    filteredLinks.map((link) => (
                        <LinkBox
                            key={link.id}
                            link={link}
                            refresh={fetchLinks}
                        />
                    ))
                )}
            </div>

            <Footer />
        </div>
    )
}