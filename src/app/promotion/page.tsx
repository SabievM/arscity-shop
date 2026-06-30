"use client"
import config from "@/utils/config"
import axios from "axios"
import { MailCheck } from "lucide-react"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
const success = () =>
    toast.success(
        "Поздровляю, теперь вы будете получать информацию о новинках и акциях компании!",
    )
const messageError = () => toast.error("Проверьте почту и повторите попытку!")
const Products = () => {
    const [mail, setEmail] = useState("")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleClick = async (mail: string) => {
        if (!emailRegex.test(mail)) {
            messageError()
            return
        }

        try {
            await axios.post(`${config.BASE_URL}/api/newsletter/subscribe/`, {
                email: mail,
            })
            success()
        } catch (error) {
            messageError()
            console.log(error)
        }
    }

    return (
        <div className="flex gap-5 w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
            <div className="flex flex-col gap-8 px-2 md-px-10">
                <h1 className="text-2xl md:text-4xl text-gray-800 font-bold">
                    Акции и специальные предложения
                </h1>
                <div>
                    <p className="text-blue-500 font-bold text-xl md:text-2xl">
                        Дорогие друзья, будьте в курсе новых поступлений,
                        специальных предложений и скидок! Оставьте свою почту и
                        мы обязательно проинформируем вас!
                    </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center py-8 bg-blue-50">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <label
                            className="text-2xl"
                            htmlFor="mailInput"
                        >
                            Введите почту
                        </label>
                        <input
                            type="email"
                            placeholder="Почта"
                            className=" h-10 md:h-14 text-xl md:text-2xl bg-white rounded-sm pl-2 focus:outline-none"
                            id="mailInput"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="px-8 py-4 text-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 inline-flex items-center justify-center gap-3 font-medium transition-all duration-300 rounded-xl"
                            onClick={() => handleClick(mail)}
                        >
                            {<MailCheck />}
                            Подписаться
                        </button>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            gutter={8}
                            containerClassName=""
                            containerStyle={{}}
                            toasterId="default"
                            toastOptions={{
                                success: {
                                    duration: 6000,
                                    style: {
                                        background: "rgb(0,190,0)",
                                        color: "white",
                                    },
                                },
                                error: {
                                    style: {
                                        background: "rgb(90,0,0)",
                                        color: "white",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
