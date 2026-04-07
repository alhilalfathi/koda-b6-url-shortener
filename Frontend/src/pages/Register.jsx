import { useForm } from "react-hook-form"
import { InputForm } from "../components/InputForm"
import { useState } from "react"

//import icons
import { HiOutlineMail } from "react-icons/hi"
import { GoKey } from "react-icons/go"
import { FiEye } from "react-icons/fi"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"


export const RegisterPage = () => {
    const { handleSubmit, register } = useForm()

    //show-hide password
    const [changePassword, setChangePassword] = useState(true)
    const changeIcon = changePassword === true ? false : true
    const [changeConfirm, setChangeConfirm] = useState(true)
    const changeConfirmIcon = changeConfirm === true ? false : true

    function submitForm() {

    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center bg-[#f7f8fa] justify-center min-w-screen">
                <h1 className="flex text-2xl font-extrabold text-black mt-10">Create Account</h1>

                {/* whitebox */}
                <div className="flex flex-col gap-5 items-center bg-white w-120 h-125 py-10 mt-5 mb-5 rounded">
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
                    <InputForm
                        type={changeConfirm ? "password" : "text"}
                        id={"confirmPassword"}
                        name={"confirmPassword"}
                        icon={<GoKey />}
                        register={register}
                        placeholder={"Enter Your Password Again"}
                        eye={<FiEye className="cursor-pointer" onClick={() => { setChangeConfirm(changeConfirmIcon) }} />}
                    >
                        Confirm Password
                    </InputForm>

                    {/* register button */}
                    <button
                        className="w-2/3 px-8 py-3 bg-blue-700 text-white rounded-xl"
                        type="submit"
                    >
                        Sign up
                    </button>
                </div>
                <span className="mb-5">Already have an account? <Link to="/login" className="text-blue-800">Sign in</Link></span>
            </form>
            <Footer />
        </div>
    )
}