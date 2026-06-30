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
import config from "@/utils/config"
import Link from "next/link"
import { TypePlumbingFixtures } from "@/types/typePlumbingFixtures"

const PlumbingFixture = () => {
    const [plumbingFixture, setPlumbingFixture] =
        useState<TypePlumbingFixtures>()
    const [quantity, setQuantity] = useState(1)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [indexPlumbingFixture, setIndexPlumbingFixture] = useState(0)

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
                    `${config.BASE_URL}/api/sanitaryequipment/product-detail/${id}`,
                )
                setPlumbingFixture(response.data)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const isInCart = isAuthenticated
        ? cartList.some(
              (item) =>
                  item.object_id === plumbingFixture?.id &&
                  item.content_type_display.toLowerCase() ===
                      plumbingFixture?.type.toLowerCase(),
          )
        : localCart.some(
              (item) =>
                  item.object_id === plumbingFixture?.id &&
                  item.content_type.toLowerCase() ===
                      plumbingFixture?.type.toLowerCase(),
          )

    const isInFavorites =
        favorites.some(
            (fav) =>
                fav.object_id === plumbingFixture?.id &&
                fav.content_type_display.toLowerCase() ===
                    plumbingFixture?.type.toLowerCase(),
        ) ||
        localFavorites.some(
            (item) =>
                item.id === plumbingFixture?.id &&
                item.type.toLowerCase() === plumbingFixture?.type.toLowerCase(),
        )

    const handleFavoriteToggle = () => {
        const selectedFavorites = favorites.filter(
            (item) =>
                item.object_id === plumbingFixture?.id &&
                item.content_type_display.toLowerCase() ===
                    plumbingFixture?.type.toLowerCase(),
        )

        const selectedFavoritesLocalStorage = localFavorites.filter(
            (item) =>
                item.id === plumbingFixture?.id &&
                item.type.toLowerCase() === plumbingFixture?.type.toLowerCase(),
        )

        if (isInFavorites) {
            if (isAuthenticated) {
                removeFavorite(selectedFavorites[0])
            } else {
                removeFavorite(selectedFavoritesLocalStorage[0])
            }
        } else {
            addFavorite(plumbingFixture)
        }
    }

    const handleAddToCart = async () => {
        if (!isInCart && plumbingFixture) {
            await addToCart(
                plumbingFixture.type,
                plumbingFixture.id,
                quantity,
                {
                    id: plumbingFixture.id,
                    name: plumbingFixture.name,
                    image1: plumbingFixture.photos.split("|")[0],
                    price: plumbingFixture.price,
                },
            )
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
        if (!plumbingFixture) {
            return Array(5).fill("")
        }
        return [plumbingFixture.photos]
    }, [plumbingFixture?.id, !!plumbingFixture])
    const images = imagesArr[0].split("|")

    const translations: Record<string, string> = {
        anti_splash: "Анти-брызги",
        armrest: "Подлокотник",
        article: "Артикул",
        body_coating: "Покрытие корпуса",
        body_material: "Материал корпуса",
        brand: "Бренд",
        built_in_bidet: "Встроенный биде",
        category: "Категория",
        collection: "Коллекция",
        created_at: "Дата создания",
        depth: "Глубина (мм)",
        dimensions_height: "Высота (мм)",
        dimensions_length: "Длина (мм)",
        dimensions_width: "Ширина (мм)",
        discharge_type: "Тип слива",
        door_closers: "Доводчики дверей",
        drawer_closers: "Доводчики ящиков",
        drawers_count: "Количество ящиков",
        facade_material: "Материал фасада",
        flush_mode: "Режим смыва",
        flush_type: "Тип смыва",
        has_drawers: "Наличие ящиков",
        has_shelf: "Наличие полки",
        link: "Ссылка",
        main_material: "Основной материал",
        manufacturer: "Производитель",
        material: "Материал",
        mounting_type: "Тип монтажа",
        name: "Название",
        photos: "Фото",
        price: "Цена",
        product_color: "Цвет изделия",
        product_type: "Тип изделия",
        profile_color: "Цвет профиля",
        rimless: "Безободковая конструкция",
        seat_included: "Сиденье в комплекте",
        seat_lift: "Подъем сиденья",
        seat_material: "Материал сиденья",
        sink_type: "Тип раковины",
        stock: "Наличие на складе",
        style: "Стиль",
        tank_volume: "Объём бачка",
        updated_at: "Дата обновления",
        volume: "Объём",
        warranty: "Гарантия",
        washbasin_type: "Тип умывальника",
    }

    const properties = useMemo(() => {
        if (!plumbingFixture) return []
        return Object.entries(plumbingFixture)
            .filter(
                ([key]) =>
                    key !== "id" &&
                    !key.startsWith("photos") &&
                    !key.startsWith("link") &&
                    !key.startsWith("image1") &&
                    !key.startsWith("name") &&
                    !key.startsWith("stock_info") &&
                    !key.startsWith("created_at") &&
                    !key.startsWith("updated_at") &&
                    !key.startsWith("type"),
            )
            .map(([key, value]) => ({
                key,
                label:
                    translations[key] ||
                    key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase()),
                value: value ?? "—",
            }))
    }, [plumbingFixture])

    if (!plumbingFixture) return null

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumbs
                name={plumbingFixture.category}
                title={plumbingFixture.name}
                handleFavoriteToggle={handleFavoriteToggle}
                isInFavorites={isInFavorites}
                category="Сантехника"
                url="/products/plumbing-fixtures"
            />
            <div className="flex flex-col justify-between w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
                <div className="flex flex-col gap-6 md:justify-between md:items-start product-detail">
                    <div className="relative mt-5 md:mt-0 flex flex-col w-[100%] items-center bg-[#F6F6F6]">
                        <div className="relative flex overflow-hidden justify-center h-[580px] w-[100%] product-detail_image">
                            <Image
                                src={images[indexPlumbingFixture].split("|")[0]}
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
                                            if (!images[index]) return
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
                                                        setIndexPlumbingFixture(
                                                            index,
                                                        )
                                                    }
                                                    className={`relative flex items-center justify-between w-[130px] h-[103px] cursor-pointer${
                                                        index + 1 !==
                                                        indexPlumbingFixture
                                                            ? "bg-gray-300"
                                                            : ""
                                                    }`}
                                                >
                                                    <Image
                                                        fill
                                                        src={images[index]}
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
                                <Link
                                    href="/"
                                    className="uppercase text-3xl text-blue-500 bold"
                                >
                                    ARS-CITY
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center mb-4 md:mb-0 gap-5 mt-10">
                            <div className="flex justify-between px-3 py-1 md:h-15 md:text-2xl bg-[#E9E9E9] w-[50%]">
                                <button
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev === 1 ? 1 : prev - 1,
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
                            <span>{plumbingFixture.price * quantity} руб.</span>
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
                <div className="flex flex-col w-[100%] px-10 py-10 my-14 bg-[#F6F6F6]">
                    {properties.map(({ key, label, value }) => (
                        <div
                            key={key}
                            className="flex flex-row gap-2 w-1/2 justify-between"
                        >
                            <span className="text-gray-400">{label}:</span>
                            <span className="flex-1 m-2 border-b-2 border-dotted border-gray-400" />
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Services />
        </div>
    )
}

export default PlumbingFixture
