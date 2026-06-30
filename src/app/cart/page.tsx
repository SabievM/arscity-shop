"use client"

import { useCartStore } from "../../../store/CartStore"
import CartItem from "./_components/cart-item"
import TotalCost from "./_components/total-cost"
import Delivery from "./_components/delivery"
import Payment from "./_components/payment"
import ContactDetails from "./_components/contact_details"
import { MoveRight } from "lucide-react"

import { useRouter } from "next/navigation"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import EmptyCart from "./_components/empty-cart"
import config from "@/utils/config"

import toast, { Toaster } from "react-hot-toast"
const success = () =>
    toast.success(
        "Ваш заказ оформлен, менеджер свяжется с вами в ближайшее время!",
    )
const messageError = () =>
    toast.error(
        "Заказ не оформлен, пожалуйста, проверьте что вы заполнили все поля!",
    )

const Cart = () => {
    const { cartList, localCart, totalPrice, fetchCart, fetchTotalPrice } =
        useCartStore()

    const [delivery, setDelivery] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    const [addressDelivery, setAddressDelivery] = useState("")

    const [surname, setSurname] = useState("")
    const [firstName, setFirstName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")

    const clearFields = () => {
        setDelivery("")
        setAddressDelivery("")
        setPaymentMethod("")
        setSurname("")
        setFirstName("")
        setPatronymic("")
        setPhone("")
        setEmail("")
        setComment("")
    }

    const [privacyPolicy, setPrivacyPolicy] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const ISSERVER = typeof window === "undefined"

    const submitOrder = useCallback(async () => {
        if (ISSERVER || loading) return

        try {
            setLoading(true)
            const token = localStorage.getItem("access_token")

            await axios.post(
                `${config.BASE_URL}/api/order/orders/create/`,
                {
                    first_name: firstName,
                    last_name: surname,
                    patronymic: patronymic,
                    phone,
                    email,
                    comment,
                    delivery_method: delivery,
                    payment_method: paymentMethod,
                    delivery_address: addressDelivery,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            )
            success()
            clearFields()
            setTimeout(() => {
                router.push("/profile")
            }, 2000)
        } catch (error: any) {
            console.error(error)
            messageError()
        } finally {
            setLoading(false)
        }
    }, [
        ISSERVER,
        loading,
        firstName,
        surname,
        patronymic,
        phone,
        email,
        comment,
        delivery,
        paymentMethod,
        addressDelivery,
    ])

    useEffect(() => {
        fetchCart()
        fetchTotalPrice()
    }, [fetchCart, fetchTotalPrice])

    const isDisabled =
        loading ||
        !privacyPolicy ||
        !delivery ||
        !paymentMethod ||
        !surname.trim() ||
        !firstName.trim() ||
        !phone.trim() ||
        !email.trim() ||
        (delivery === "delivery" && !addressDelivery.trim())

    if (cartList.length === 0 && localCart.length === 0) return <EmptyCart />

    return (
        <div className="flex flex-col gap-5 min-hscreen mb-30">
            {/* HEADER */}
            <div className="w-screen bg-linear-to-b pt-30 from-[#D2D2D2] to-white h-[200px] -mt-20 flex items-center">
                <div className="flex justify-between w-[1370px] mx-auto px-12">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-gray-400">
                            <span>Главная</span>
                            <MoveRight
                                color="#ee1b1b"
                                strokeWidth={1}
                            />
                            <span>Корзина</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-screen md:max-w-screen lg:w-[1370px] mx-auto px-12 mb-5">
                <h2 className="text-2xl">Корзина заказа</h2>
            </div>

            {/* ITEMS */}
            <div className="flex flex-col gap-20 px-5">
                {(cartList.length > 0 ? cartList : localCart).map((cart) => (
                    <CartItem
                        key={cart.id}
                        id={cart.id}
                        object_id={cart.object_id}
                        product={cart.product}
                        quantity={cart.quantity}
                        content_type_display={cart.content_type_display}
                    />
                ))}
            </div>

            {/* ORDER FORM */}
            <div className="flex flex-col gap-10 w-screen lg:w-[1370px] mx-auto px-12">
                <TotalCost totalPrice={totalPrice} />

                <Delivery
                    setDelivery={setDelivery}
                    setAddressDelivery={setAddressDelivery}
                    delivery={delivery}
                />

                <Payment
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />

                <ContactDetails
                    setSurname={setSurname}
                    setFirstName={setFirstName}
                    setPatronymic={setPatronymic}
                    setPhone={setPhone}
                    setEmail={setEmail}
                    setComment={setComment}
                />

                {/* PRIVACY */}
                <div className="flex gap-3 items-center mt-2">
                    <input
                        onChange={() => setPrivacyPolicy(!privacyPolicy)}
                        id="privacyPolicy"
                        type="checkbox"
                    />
                    <label htmlFor="privacyPolicy">
                        согласен с{" "}
                        <Link
                            href="/personal-data"
                            className="text-blue-600"
                        >
                            политикой обработки персональных данных
                        </Link>
                    </label>
                </div>

                {/* SUBMIT */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
                    <TotalCost totalPrice={totalPrice} />

                    <button
                        disabled={isDisabled}
                        onClick={submitOrder}
                        title={isDisabled ? "Заполните все поля" : ""}
                        className={`px-20 py-3 text-white uppercase font-bold transition ${
                            isDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        {loading ? "оформляем..." : "оформить заказ"}
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
    )
}

export default Cart
