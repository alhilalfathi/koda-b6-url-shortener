import { IoLink } from "react-icons/io5"
import { MdContentCopy } from "react-icons/md"
import { RiDeleteBin6Fill } from "react-icons/ri"
import http from "../lib/http"

export const LinkBox = ({ link, refresh }) => {

    async function handleDelete() {
        if (!confirm("Delete this link?")) return

        try {
            const response = await http(`/api/links/${link.id}`, {
                method: "DELETE"
            })

            if (response.success) {
                alert("Deleted successfully")
                refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(link.shorten_url)
        alert("Copied to clipboard!")
    }

    return (
        <div className="bg-white w-3/5 rounded flex p-3 items-center justify-between">
            <div className="flex flex-col gap-3 w-2/3">

                <div className="flex gap-3 text-blue-800 items-center">
                    <IoLink />
                    <span>{link.shorten_url}</span>
                </div>

                <span className="text-gray-600 truncate">
                    {link.original_url}
                </span>

                <p className="font-bold text-sm text-gray-500">
                    {new Date(link.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="flex gap-3">
                <MdContentCopy
                    className="w-7 h-7 cursor-pointer"
                    onClick={handleCopy}
                />
                <RiDeleteBin6Fill
                    className="w-7 h-7 cursor-pointer"
                    onClick={handleDelete}
                />
            </div>
        </div>
    )
}