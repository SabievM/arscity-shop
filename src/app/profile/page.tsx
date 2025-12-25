"use client"
import { LogOut, MoveRight } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import Order from "./_components/order"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useFavorites } from "../../../store/AddToFavorites"
import config from "@/utils/config"
import { useCartStore } from "../../../store/CartStore"

export type OrdersTypeItemProduct = {
    id: number
    name: string
    price: number
}

export type OrdersTypeItem = {
    id: number
    product: OrdersTypeItemProduct
    quantity: number
}

export type OrdersType = {
    id: number
    created_at: string
    status: string
    payment_receipt_url: string
    first_name: string
    last_name: string
    patronymic: string
    phone: string
    email: string
    comment: string
    delivery_method: string
    delivery_address: string
    payment_method: string
    total_price: string
    items: OrdersTypeItem[]
}

const Profile = () => {
    const [auth, setAuth] = useState(false)
    const [is_superUser, setIsSuperUser] = useState(false)
    const router = useRouter()
    const [orders, setOrders] = useState<OrdersType[]>([])
    const { favorites } = useFavorites()
    const { resetCart } = useCartStore()
    const ISSERVER = typeof window === "undefined"

    useEffect(() => {
        if (ISSERVER) return
        const isAuth = async () => {
            try {
                const token = localStorage.getItem("access_token")
                if (!token) {
                    router.push("/auth/register")
                    return
                }

                const response = await axios.get(
                    `${config.BASE_URL}/api/user/me/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (response.data.is_superuser) {
                    setIsSuperUser(true)
                }

                if (response.status === 200) {
                    setAuth(true)
                } else {
                    router.push("/auth/register")
                }
            } catch (error) {
                console.error(error)
                router.push("/auth/register")
            }
        }

        isAuth()
    }, [router])

    useEffect(() => {
        if (ISSERVER) return
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `${config.BASE_URL}/api/order/orders/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                setOrders(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrder()
    }, [])

    const logOut = useCallback(() => {
        if (ISSERVER) return
        localStorage.removeItem("access_token")
        localStorage.removeItem("favorite-storage")
        resetCart()
        router.push("/")
    }, [])

    if (!auth) return <div>Loadig...</div>

    return (
        <>
            <div className="w-screen md:max-w-screen lg:w-[1370px] bg-linear-to-b -mt-40 from-[#D2D2D2] to-white h-[200px]  items-center  -z-1"></div>
            <div className="flex flex-col md:max-w-screen lg:w-[1370px] md:px-12 mx-auto">
                <div className="flex items-center gap-3 pl-4 md:pl-0 md:mt-6 text-gray-400">
                    <span>Главная</span>
                    <MoveRight
                        color="#ee1b1b"
                        strokeWidth={1}
                    />
                    <span>Профиль</span>
                </div>
                <h2 className="text-2xl pl-4 md:pl-0 md:text-3xl my-10">
                    Личный кабинет
                </h2>
                <div className="flex items-center text-[0.8rem] px-4 md:pl-0 md:text-2xl gap-10 mb-4">
                    <span className="border border-solid border-red-500 px-4 py-2 bg-red-500 text-white">
                        МОИ ЗАКАЗЫ
                    </span>
                    <Link href="/favorites">
                        МОИ ИЗБРАННЫЕ ({favorites?.length})
                    </Link>
                    {is_superUser && (
                        <Link
                            href={`${config.BASE_URL}/admin`}
                            className="border border-solid border-blue-500 px-4 py-2 text-blue-600 text-center hover:bg-red-500 hover:text-white transition-all duration-200"
                        >
                            Админ панель
                        </Link>
                    )}
                    <div
                        onClick={logOut}
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <span>Выйти из личного кабинета</span>
                        <LogOut />
                    </div>
                </div>
                <div className="w-full h-[1px] bg-red-400 mb-10"></div>
                <div>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <>
                                <Order
                                    key={order.id}
                                    order={order}
                                />
                                <div className="h-[1px] bg-red-500"></div>
                            </>
                        ))
                    ) : (
                        <div className="w-screen flex flex-col items-center justify-center md:h-[300px] h-[175px] md:w-[100%] text-2xl md:text-3xl ">
                            У вас пока нет заказов &#128521;
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile
