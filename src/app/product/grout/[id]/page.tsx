"use client"
import {
    ArrowLeft,
    ArrowRight,
    CreditCard,
    ImageOff,
    Landmark,
    Wallet,
} from "lucide-react"
import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"
import Services from "@/components/shared/services"
import axios from "axios"
import { useCartStore } from "../../../../../store/CartStore"
import { useFavorites } from "../../../../../store/AddToFavorites"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import { GroutsType } from "@/app/products/grouts/page"
import config from "@/utils/config"
import Link from "next/link"

const Grout = () => {
    const [grout, setGrout] = useState<GroutsType>()

    const [quantity, setQuantity] = useState(1)

    const scrollRef = useRef<HTMLDivElement>(null)
    const [indexGrout, setIndexGrout] = useState(0)

    const { addToCart, cartList, localCart } = useCartStore()
    const { addFavorite, removeFavorite, favorites, localFavorites } =
        useFavorites()
    const ISSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])

    useEffect(() => {
        const id = window.location.pathname.split("/").pop()
        try {
            const fetchData = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/grouts/${id}`
                )
                setGrout(response.data)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const isInCart = isAuthenticated
        ? cartList.some(
              (item) =>
                  item.object_id === grout?.id &&
                  item.content_type_display === grout?.type
          )
        : localCart.some(
              (item) =>
                  item.object_id === grout?.id &&
                  item.content_type === grout?.type
          )

    const isInFavorites =
        favorites.some(
            (fav) =>
                fav.object_id === grout?.id &&
                fav.content_type_display === grout?.type
        ) ||
        localFavorites.some(
            (item) => item.id === grout?.id && item.type === grout?.type
        )
    console.log(grout)

    const handleFavoriteToggle = () => {
        const selectedFavorites = favorites.filter(
            (item) =>
                item.object_id === grout?.id &&
                item.content_type_display === grout?.type
        )
        const selectedFavoritesLocalStorage = localFavorites.filter(
            (item) => item.id === grout?.id && item.type === grout?.type
        )

        if (isInFavorites) {
            if (isAuthenticated) {
                removeFavorite(selectedFavorites[0])
            } else {
                removeFavorite(selectedFavoritesLocalStorage[0])
            }
        } else {
            addFavorite(grout)
        }
    }

    const handleAddToCart = async () => {
        if (!isInCart && grout) {
            await addToCart(grout.type, grout.id, quantity, grout)
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
        }
    }
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
        }
    }

    const imagesArr = useMemo(() => {
        if (!grout) {
            return Array(5).fill("")
        }
        return [
            grout.image1,
            grout.image2,
            grout.image3,
            grout.image4,
            grout.image5,
        ]
    }, [grout?.id, !!grout])

    if (!grout) return null

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumbs
                name={"Замазка"}
                title={grout.name}
                category="Все замазки"
                url="/products/grouts"
                handleFavoriteToggle={handleFavoriteToggle}
                isInFavorites={isInFavorites}
            />
            <div className="flex flex-col justify-between w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
                <div className="flex flex-col gap-6 md:justify-between md:items-start product-detail">
                    <div className="relative mt-5 md:mt-0 flex flex-col w-[100%] items-center bg-[#F6F6F6]">
                        <div className="relative flex overflow-hidden justify-center h-[580px] w-[100%] product-detail_image">
                            <Image
                                src={imagesArr[indexGrout]}
                                fill
                                alt="Imagelaminate"
                                className="object-contain"
                            />
                        </div>
                        <div className="py-5 flex gap-4 items-center">
                            <button
                                onClick={scrollLeft}
                                className="flex items-center justify-center w-[40px] bg-gray-400 h-[103px] text-red-500 hover:scale-110 transition-all duration-200"
                            >
                                <ArrowLeft />
                            </button>
                            <div
                                ref={scrollRef}
                                className="w-full flex overflow-x-auto scroll-hidden"
                            >
                                <div className="inline-flex gap-4">
                                    {Array(5)
                                        .fill("")
                                        .map((_, index) => {
                                            if (!imagesArr[index]) return
                                            ;<div
                                                key={index}
                                                className="pointer-events-none flex items-center justify-center w-[130px] h-[103px] border"
                                            >
                                                <ImageOff />
                                            </div>
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        setIndexGrout(index)
                                                    }
                                                    className={`relative flex items-center justify-between w-[130px] h-[103px] cursor-pointer${
                                                        index + 1 !== indexGrout
                                                            ? "bg-gray-300"
                                                            : ""
                                                    }`}
                                                >
                                                    <Image
                                                        fill
                                                        src={imagesArr[index]}
                                                        alt="imageSlide"
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                            <button
                                onClick={scrollRight}
                                className="flex items-center justify-center w-[40px] bg-gray-400 h-[103px] text-red-500 hover:scale-110 transition-all duration-200"
                            >
                                <ArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between md:w-[45%] h-[500px] pr-2">
                        <div className="flex gap-4 md:gap-10 items-end mt-8">
                            <div className="relative flex items-center justify-center w-[330px] h-[147px] border border-gray-400 ">
                                <span className="uppercase text-3xl text-blue-500 bold">
                                    ARS-CITY
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center mb-4 md:mb-0 gap-5 mt-10">
                            <div className="flex justify-between px-3 py-1 md:h-15 md:text-2xl bg-[#E9E9E9] w-[50%]">
                                <button
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev === 1 ? 1 : prev - 1
                                        )
                                    }
                                    className="w-15 cursor-pointer bg-white"
                                >
                                    -
                                </button>
                                <input
                                    onChange={(e) =>
                                        setQuantity(+e.target.value)
                                    }
                                    type="text"
                                    value={quantity}
                                    className="focus:outline-none w-20 text-center"
                                />
                                <button
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                    className="w-15 cursor-pointer bg-white"
                                >
                                    +
                                </button>
                            </div>
                            <div className="md:text-2xl flex justify-between px-3 py-1 md:h-15 bg-[#E9E9E9] w-[25%]">
                                <button className="w-[55px] bg-white">
                                    м²
                                </button>
                                <button className="w-[55px] bg-white hidden">
                                    шт.
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4 md:mb-0 md:text-2xl">
                            <span>Итоговая цена: </span>
                            <span>{grout.price * quantity} руб.</span>
                            <span>Цвет: {grout.color}</span>
                        </div>
                        <div className="flex flex-col md:flex-row mb-4 md:mb-0 gap-3 items-center justify-between w-[100%]">
                            <button
                                onClick={handleAddToCart}
                                className={`border-2 hover:bg-blue-500 hover:border-blue-500  hover:text-white transition-all duration-200 py-2 px-10 w-[100%] md:w-[50%] ${
                                    isInCart
                                        ? "bg-red-500 border-white text-white"
                                        : ""
                                }`}
                            >
                                {!isInCart
                                    ? "+  добавить в корзину"
                                    : "Добавлено в корзину"}
                            </button>
                            {isInCart ? (
                                <button
                                    className={`border-2 hover:bg-blue-500 hover:border-blue-500 bg-red-500 border-red-500 text-white hover:text-white transition-all duration-200 py-2 px-10 w-[100%] md:w-[50%]`}
                                >
                                    <Link href="/cart">
                                        <span>Перейти в корзину</span>
                                    </Link>
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="md:flex items-center gap-2 justify-between">
                            <div>Оплата: </div>
                            <div className="flex gap-1">
                                <Wallet
                                    color="#ee1b1b"
                                    strokeWidth={1}
                                />
                                <span>наличные</span>
                            </div>
                            <div className="flex gap-1">
                                <CreditCard
                                    color="#ee1b1b"
                                    strokeWidth={1}
                                />
                                <span>карта</span>
                            </div>
                            <div className="flex gap-1">
                                <Landmark
                                    color="#ee1b1b"
                                    strokeWidth={1}
                                />
                                <span>банковский перевод</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Services />
        </div>
    )
}

export default Grout
