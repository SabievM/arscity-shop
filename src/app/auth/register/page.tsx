"use client"
import config from "@/utils/config"
import axios from "axios"
import { Lock, LockOpen, MoveRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const Register = () => {
    const router = useRouter()
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [re_password, setRePassword] = useState("")
    const [isLockOpen, setIsLockOpen] = useState(false)

    const registrationFunction = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${config.BASE_URL}/api/auth/users/`, {
                username: username,
                email: email,
                password: password,
                re_password: re_password,
            })
            alert("Регистрация прошла успешно")
            router.push("/auth/login")
        } catch (error) {
            console.log(error)
            alert("Ошибка регистрации")
        }
    }

    return (
        <div className="flex flex-col gap-10 w-screen md:max-w-screen lg:w-[1380px] md:min-h-screen mx-auto mt-20 px-12">
            <div className="flex gap-5">
                <span>Главная</span>
                <MoveRight />
                <span>Регистрация</span>
            </div>
            <h2 className="text-3xl">Регистрация</h2>
            <div className="flex flex-col w-[100%] gap-5 md:w-1/2 mx-auto p-4 shadow-md bg-cyan-50-100">
                <span>
                    Поля, отмеченные *, обязательны для заполнения.Пароль должен
                    быть не менее 6 символов длиной.
                </span>
                <form
                    onSubmit={registrationFunction}
                    action=""
                    className="flex flex-col gap-5 md:gap-10"
                >
                    <div className="flex flex-col md:flex-row items center gap-2 md:gap-6">
                        <label
                            className="md:w-[80px]"
                            htmlFor="username"
                        >
                            Ф.И.О*
                        </label>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            id="username"
                            className="bg-gray-300 focus:outline-none p-2"
                            type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items center gap-2 md:gap-6">
                        <label
                            className="md:w-[80px]"
                            htmlFor="email"
                        >
                            E-mail*
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="bg-gray-300 p-2 focus:outline-none"
                            type="email"
                            placeholder=""
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items center gap-2 md:gap-6">
                        <label
                            className="md:w-[80px]"
                            htmlFor="password"
                        >
                            Пароль*
                        </label>
                        <div className="relative">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="w-[100%] bg-gray-300 focus:outline-none p-2"
                                type={isLockOpen ? "text" : "password"}
                                placeholder=""
                            />
                            {isLockOpen ? (
                                <Lock
                                    onClick={() => setIsLockOpen(false)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                />
                            ) : (
                                <LockOpen
                                    onClick={() => setIsLockOpen(true)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items center gap-2 md:gap-6">
                        <label
                            className="md:w-[80px]"
                            htmlFor="password"
                        >
                            Пароль (еще раз)*
                        </label>
                        <div className="relative">
                            <input
                                onChange={(e) => setRePassword(e.target.value)}
                                id="password"
                                className="w-[100%] bg-gray-300 focus:outline-none p-2"
                                type={isLockOpen ? "text" : "password"}
                                placeholder=""
                            />
                            {isLockOpen ? (
                                <Lock
                                    onClick={() => setIsLockOpen(false)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                />
                            ) : (
                                <LockOpen
                                    onClick={() => setIsLockOpen(true)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <input type="checkbox" />
                        <label htmlFor="">
                            Отправляя данные, я принимаю условия{" "}
                            <Link href="">«Пользовательского соглашения».</Link>{" "}
                        </label>
                    </div>
                    <button className=" py-3 bg-red-500 text-white font-bold uppercase hover:scale-[1.03] transition-all duration-200">
                        Зарегистрироваться
                    </button>
                    <span>
                        Если вы зарегистрированы, пожалуйста,{" "}
                        <Link
                            className="text-blue-500"
                            href="/auth/login"
                        >
                            авторизуйтесь!
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Register
