"use client"
import config from "@/utils/config"
import axios from "axios"
import { Lock, LockOpen, MoveRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { useCartStore } from "../../../../store/CartStore"
import { useFavorites } from "../../../../store/AddToFavorites"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { fetchCart, mergeCarts } = useCartStore()
    const { fetchFavorites, mergeFavorites } = useFavorites()
    const [isLockOpen, setIsLockOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const ISSERVER = typeof window === "undefined"
    const loginFunction = useCallback(
        async (e: React.FormEvent, email: string, password: string) => {
            e.preventDefault()
            setIsLoading(true)
            setError("")
            try {
                const response = await axios.post(
                    `${config.BASE_URL}/api/auth/jwt/create`,
                    {
                        email,
                        password,
                    }
                )
                console.log(response)

                if (!ISSERVER)
                    localStorage.setItem("access_token", response.data.access)
                await mergeCarts()
                await Promise.all([
                    fetchCart(),
                    fetchFavorites(),
                    mergeFavorites(),
                ])
                router?.push("/profile")
            } catch (error: any) {
                setError(error.response?.data?.detail || "Ошибка авторизации")
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    return (
        <div className="flex flex-col gap-10 w-screen md:max-w-screen lg:w-[1380px] md:min-h-screen mx-auto mt-20 px-12">
            <div className="flex gap-5">
                <span>Главная</span>
                <MoveRight />
                <span>Авторизация</span>
            </div>
            <h2 className="text-3xl">Авторизация</h2>
            <div className="flex flex-col w-[100%] gap-5 md:w-1/2 mx-auto p-2 md:p-4 custom-shadow bg-cyan-50-100">
                <h2>Пожалуйста введите логин(email) и пароль</h2>
                {error && <div className="text-red-500">{error}</div>}
                <form
                    onSubmit={(e) => loginFunction(e, email, password)}
                    className="flex flex-col gap-5 md:gap-10"
                >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                        <label
                            className="w-[80px]"
                            htmlFor="email"
                        >
                            E-mail*
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="bg-gray-300 p-2 focus:outline-none"
                            type="email"
                            required
                            placeholder="Ваш email"
                        />
                    </div>
                    <div className=" flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                        <label
                            className="w-[80px]"
                            htmlFor="password"
                        >
                            Пароль*
                        </label>
                        <div className="relative">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="relative w-[100%] bg-gray-300 focus:outline-none p-2"
                                type={isLockOpen ? "text" : "password"}
                                required
                                placeholder="Ваш пароль"
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
                    <button
                        disabled={isLoading}
                        className="py-3 bg-red-500 text-white font-bold uppercase hover:scale-[1.03] transition-all duration-200 disabled:bg-gray-400"
                    >
                        {isLoading ? "Загрузка..." : "Авторизоваться"}
                    </button>
                </form>
                <div className="flex flex-col gap-2">
                    <span>
                        Если вы еще не зарегистрированы, пройдите, пожалуйста,{" "}
                        <Link
                            className="text-blue-500"
                            href="/auth/register"
                        >
                            регистрацию!
                        </Link>
                    </span>
                    <span>
                        Забыли пароль?{" "}
                        <Link
                            className="text-blue-500"
                            href="/auth/password-reset"
                        >
                            Восстановить пароль
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login
