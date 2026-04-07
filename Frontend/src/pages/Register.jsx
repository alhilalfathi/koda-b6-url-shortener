import { useForm } from "react-hook-form"
import { InputForm } from "../components/InputForm"
import { Footer } from "../components/Footer"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../lib/http.js"

// Import icons
import { HiOutlineMail } from "react-icons/hi"
import { GoKey } from "react-icons/go"
import { FiEye } from "react-icons/fi"
import { FaRegUser } from "react-icons/fa"


export const RegisterPage = () => {
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate()

    // State untuk UI
    const [isLoading, setIsLoading] = useState(false)
    const [changePassword, setChangePassword] = useState(true)
    const [changeConfirm, setChangeConfirm] = useState(true)

    const submitForm = async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert("Password and Confirm Password not match")
        }

        setIsLoading(true)
        try {
            const response = await http("/api/register", {
                method: "POST",
                body: {
                    fullname: data.fullname,
                    email: data.email,
                    password: data.password
                }
            })

            if (response) {
                alert("Registrasi success.")
                navigate("/login")
            }
        } catch (error) {
            console.error("Register error:", error)
            alert("Register error.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center bg-[#f7f8fa] justify-center min-h-screen">
                <h1 className="flex text-2xl font-extrabold text-black mt-10">Create Account</h1>

                {/* Whitebox */}
                <div className="flex flex-col gap-5 items-center bg-white w-120 h-auto py-10 mt-5 mb-5 rounded shadow-sm">
                    <InputForm
                        type={"text"}
                        id={"fullname"}
                        name={"fullname"}
                        icon={<FaRegUser />}
                        register={register}
                        placeholder={"Enter Your Full Name"}
                    >
                        Full Name
                    </InputForm>
                    <InputForm
                        type={"email"}
                        id={"email"}
                        name={"email"}
                        icon={<HiOutlineMail />}
                        register={register}
                        placeholder={"Enter Your Email"}
                    >
                        Email
                    </InputForm>

                    <InputForm
                        type={changePassword ? "password" : "text"}
                        id={"password"}
                        name={"password"}
                        icon={<GoKey />}
                        register={register}
                        placeholder={"Enter Your Password"}
                        eye={<FiEye className="cursor-pointer" onClick={() => setChangePassword(!changePassword)} />}
                    >
                        Password
                    </InputForm>

                    <InputForm
                        type={changeConfirm ? "password" : "text"}
                        id={"confirmPassword"}
                        name={"confirmPassword"}
                        icon={<GoKey />}
                        register={register}
                        placeholder={"Enter Your Password Again"}
                        eye={<FiEye className="cursor-pointer" onClick={() => setChangeConfirm(!changeConfirm)} />}
                    >
                        Confirm Password
                    </InputForm>

                    {/* Register button */}
                    <button
                        className={`w-2/3 px-8 py-3 text-white rounded-xl transition-all ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
                            }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Sign up"}
                    </button>
                </div>
                <span className="mb-5">
                    Already have an account? <Link to="/login" className="text-blue-800">Sign in</Link>
                </span>
            </form>
            <Footer />
        </div>
    )
}