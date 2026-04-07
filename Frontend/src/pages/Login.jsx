import { useForm } from "react-hook-form"
import { InputForm } from "../components/InputForm"
import { Footer } from "../components/Footer"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../lib/http.js"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

//import icons
import { HiOutlineMail } from "react-icons/hi"
import { GoKey } from "react-icons/go"
import { FiEye } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"

const loginSchema = yup.object({
    email: yup.string().required("Email must be filled").email("Email Invalid"),
    password: yup.string().required("Password must be filled").min(8, "Password min 8 characters")
})

export const LoginPage = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const navigate = useNavigate()

    //show-hide password
    const [changePassword, setChangePassword] = useState(true)

    async function submitForm(data) {
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

                    {/* EMAIL */}
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
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    {/* PASSWORD */}
                    <InputForm
                        type={changePassword ? "password" : "text"}
                        id={"password"}
                        name={"password"}
                        icon={<GoKey />}
                        register={register}
                        placeholder={"Enter Your Password"}
                        eye={
                            <FiEye
                                className="cursor-pointer"
                                onClick={() => setChangePassword(!changePassword)}
                            />
                        }
                    >
                        Password
                    </InputForm>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    {/* login button */}
                    <button
                        className={`w-2/3 px-8 py-3 text-white rounded-xl ${
                            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
                        }`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Log In"}
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

                <span className="mb-5">
                    Dont have an account?{" "}
                    <Link to="/register" className="text-blue-800">
                        Sign up
                    </Link>
                </span>
            </form>

            <Footer />
        </div>
    )
}