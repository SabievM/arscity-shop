"use client"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { ProductType, useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"

type CartItemType = {
    id?: number
    object_id: number
    product: ProductType
    quantity: number
    content_type_display: string
}

const CartItem: React.FC<CartItemType> = ({
    id,
    quantity: initialQuantity,
    object_id,
    product,
    content_type_display,
}) => {
    const ISSERVER = typeof window === "undefined"
    const image = product?.image1?.split("|")[0]

    const img = image?.startsWith("http") ? image : `${config.BASE_URL}${image}`
    const {
        addToCart,
        removeFromCart,
        removeFromLocalCart,
        updateLocalCartItem,
    } = useCartStore()

    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])

    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        if (isAuthenticated) {
            addToCart(content_type_display, object_id, quantity, product)
        } else {
            updateLocalCartItem(object_id, content_type_display, quantity)
        }
    }, [quantity])

    const increment = () => setQuantity((prev) => prev + 1)
    const decrement = () => setQuantity((prev) => Math.max(1, prev - 1))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value)
        if (!isNaN(val)) {
            setQuantity(Math.max(1, val))
        }
    }

    const handleRemove = () => {
        if (isAuthenticated && id !== undefined) {
            removeFromCart(id)
        } else {
            removeFromLocalCart(
                product.name,
                content_type_display.toLowerCase(),
            )
            console.log(product.name, content_type_display.toLowerCase())
        }
    }

    if (!product) return null

    return (
        <div className="relative w-full max-w-[1370px] mx-auto px-4 sm:px-12 py-4 border-b border-red-300">
            <div className="flex flex-col md:flex-row gap-4 md:gap-13">
                <div className="w-full md:w-[212px] md:h-[160px] overflow-hidden md:bg-[#F6F6F6] flex items-center justify-center">
                    <Image
                        src={img || "/placeholder-product.png"}
                        alt="cart-image"
                        width={212}
                        height={160}
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-col justify-between w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        {product.name}
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 text-sm sm:text-base mt-2">
                        {product.country ? (
                            <span>
                                <span className="text-gray-400">
                                    Производитель:
                                </span>{" "}
                                {product?.country?.name}
                            </span>
                        ) : (
                            ""
                        )}

                        {product.collection && (
                            <span>
                                <span className="text-gray-400">
                                    Коллекция:
                                </span>{" "}
                                {product?.collection?.name}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                        <div className="flex items-center gap-3 h-12">
                            <div className="flex justify-between items-center px-3 py-1 text-sm bg-[#E9E9E9] w-36 sm:w-40">
                                <button
                                    className="w-8 sm:w-10 cursor-pointer bg-white"
                                    onClick={decrement}
                                    aria-label="Уменьшить количество"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleInputChange}
                                    className="focus:outline-none w-16 text-center"
                                    min={1}
                                    aria-label="Количество"
                                />
                                <button
                                    className="w-8 sm:w-10 cursor-pointer bg-white"
                                    onClick={increment}
                                    aria-label="Увеличить количество"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-sm flex justify-center items-center px-3 py-1 bg-[#E9E9E9] w-10 sm:w-12">
                                <button className="w-full bg-white">м²</button>
                            </div>
                        </div>

                        <div className="flex flex-col text-xs sm:text-sm">
                            <span>
                                {product.image1?.includes(
                                    "https://grandfayans.ru",
                                )
                                    ? "Цена"
                                    : "Цена за м²:"}
                            </span>
                            <span>{product.price} рублей</span>
                        </div>

                        <div className="mt-2 sm:mt-0">
                            <span>Итоговая цена: </span>
                            <span>
                                {Math.round(quantity * product.price)} рублей
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleRemove}
                className="absolute top-2 right-2 cursor-pointer"
                aria-label="Удалить товар"
            >
                <X size={20} />
            </button>
        </div>
    )
}

export default CartItem
