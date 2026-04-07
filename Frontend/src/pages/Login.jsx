import { useForm } from "react-hook-form"
import { InputForm } from "../components/InputForm"
import { Footer } from "../components/Footer"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../lib/http.js"

//import icons
import { HiOutlineMail } from "react-icons/hi"
import { GoKey } from "react-icons/go"
import { FiEye } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"


export const LoginPage = () => {
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    //show-hide password
    const [changePassword, setChangePassword] = useState(true)
    const changeIcon = changePassword === true ? false : true

    async function submitForm(data) {
        setIsLoading(true)
        try {
            const response = await http("/api/login", {
                method: "POST",
                body: {
                    email: data.email,
                    password: data.password
                }
            })

            if (response.results?.token) {
                localStorage.setItem("token", response.results.token)
                localStorage.setItem("user", JSON.stringify(response.results.user))

                alert(`Welcome back, ${response.results.user.fullname}!`)
                navigate("/")
            } else {
                alert(response.message || "Login Failed!")
            }
        } catch (error) {
            console.log(error)
            alert("Connection error, please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center bg-[#f7f8fa] justify-center min-h-screen">
                <h1 className="flex text-2xl font-extrabold text-black mt-10">ShortLink</h1>

                {/* whitebox */}
                <div className="flex flex-col gap-5 items-center bg-white w-120 h-auto py-10 mt-5 mb-5 rounded shadow-sm">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-extrabold">Welcome Back</span>
                        <span>Please enter your details to sign in.</span>
                    </div>
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
                        eye={<FiEye className="cursor-pointer" onClick={() => { setChangePassword(changeIcon) }} />}
                    >
                        Password
                    </InputForm>

                    {/* login button */}
                    <button
                        className={`w-2/3 px-8 py-3 text-white rounded-xl ${isLoading ? 'bg-gray-400' : 'bg-blue-700'}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Log In"}
                    </button>

                    <span className="text-gray-600">OR CONTINUE WITH</span>

                    {/* login with google */}
                    <button
                        type="button"
                        className="w-2/3 px-8 py-3 border border-black rounded-xl flex items-center justify-center gap-3"
                    >
                        <FcGoogle className="w-7 h-7" />
                        Sign in with Google
                    </button>
                </div>
                <span className="mb-5">Dont have an account? <Link to="/register" className="text-blue-800">Sign up</Link></span>
            </form>
            <Footer />
        </div>
    )
}