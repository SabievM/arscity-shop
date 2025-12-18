"use client"
import { useCartStore } from "../../../store/CartStore"
import CartItem from "./_components/cart-item"
import TotalCost from "./_components/total-cost"
import Delivery from "./_components/delivery"
import Payment from "./_components/payment"
import ContactDetails from "./_components/contact_details"
import { MoveRight } from "lucide-react"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import EmptyCart from "./_components/empty-cart"
import config from "@/utils/config"

const Cart = () => {
    const { cartList, localCart, totalPrice, fetchCart, fetchTotalPrice } =
        useCartStore()
    const [delivery, setDelivery] = useState("delivery")
    const [addressDelivery, setAddressDelivery] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("office")
    const [surname, setSurname] = useState("")
    const [firstName, setFirstName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")
    const [privacyPolicy, setPrivacyPolicy] = useState(false)

    const ISSERVER = typeof window === "undefined"

    const submitOrder = useCallback(async () => {
        if (ISSERVER) return
        try {
            const token = localStorage.getItem("access_token")

            const response = await axios.post(
                `${config.BASE_URL}/api/order/orders/create/`,
                {
                    first_name: firstName,
                    last_name: surname,
                    middle_name: patronymic,
                    phone: phone,
                    email: email,
                    comment: comment,
                    delivery_method: delivery,
                    payment_method: paymentMethod,
                    address: addressDelivery,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            console.log("Заказ оформлен:", response.data)
            alert("Заказ успешно оформлен!")
        } catch (error) {
            console.error("Ошибка оформления заказа:", error)
            alert("Произошла ошибка при оформлении заказа")
        }
    }, [])

    useEffect(() => {
        fetchCart()
        fetchTotalPrice()
    }, [])

    if (cartList.length === 0 && localCart.length === 0) return <EmptyCart />

    return (
        <div className="flex flex-col gap-5 min-h-screen mb-30">
            {/* Шапка */}
            <div className="w-screen bg-linear-to-b pt-30 from-[#D2D2D2] to-white h-[200px] -mt-20 flex items-center">
                <div className="flex justify-between w-[1370px] mx-auto px-12">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-gray-400">
                            <span>Главная</span>
                            <MoveRight
                                color="#ee1b1b"
                                strokeWidth={1}
                            />
                            <span>Карзина</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-screen md:max-w-screen lg:w-[1370px] mx-auto px-12 mb-5">
                <h2 className="text-2xl">Карзина заказа</h2>
            </div>

            <div className="flex flex-col gap-20 px-5">
                {cartList.length > 0
                    ? cartList.map((cart) => (
                          <CartItem
                              key={cart.product.name}
                              id={cart.id}
                              object_id={cart.object_id}
                              product={cart.product}
                              quantity={cart.quantity}
                              content_type_display={cart.content_type_display}
                          />
                      ))
                    : localCart.map((cart) => (
                          <CartItem
                              key={cart.product.name}
                              id={cart.id}
                              object_id={cart.object_id}
                              product={cart.product}
                              quantity={cart.quantity}
                              content_type_display={cart.content_type_display}
                          />
                      ))}
            </div>

            <div className="flex flex-col gap-10 md:gap-0 w-screen md:max-w-screen lg:w-[1370px] mx-auto px-12">
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
                <div className="flex gap-3 items-center mt-2">
                    <input
                        onChange={() => setPrivacyPolicy(!privacyPolicy)}
                        id="privacyPolicy"
                        name="privacyPolicy"
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
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-end justify-between">
                    <TotalCost totalPrice={totalPrice} />
                    <button
                        onClick={() => submitOrder()}
                        className={`${
                            !privacyPolicy ||
                            !surname ||
                            !firstName ||
                            !patronymic ||
                            !phone ||
                            !email
                                ? "pointer-events-none bg-red-300"
                                : "cursor-pointer bg-red-500"
                        } px-20 py-3  text-white uppercase font-bold`}
                    >
                        оформить заказ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
