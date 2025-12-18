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
import { TileTypes } from "@/types/typeTiles"
import axios from "axios"
import Link from "next/link"
import Product from "@/components/shared/product-card"
import { useCartStore } from "../../../../../store/CartStore"
import { useFavorites } from "../../../../../store/AddToFavorites"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import config from "@/utils/config"

const TilePage = () => {
    const [tile, setTile] = useState<TileTypes>()
    const [tilesForCollection, setTilesForCollection] = useState<TileTypes[]>(
        []
    )
    const [quantity, setQuantity] = useState(1)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [indexTile, setIndexTile] = useState(0)

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
                    `${config.BASE_URL}/api/tile/tiles/${id}`
                )
                setTile(response.data)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (!tile) return
        try {
            const fetchTilesForCollection = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/tiles/?collection=${tile?.collection?.id}`
                )
                setTilesForCollection(response.data.results)
            }
            fetchTilesForCollection()
        } catch (error) {
            console.log(error)
        }
    }, [tile])

    const isInCart = isAuthenticated
        ? cartList.some(
              (item) =>
                  item.object_id === tile?.id &&
                  item.content_type_display === tile?.type
          )
        : localCart.some(
              (item) =>
                  item.object_id === tile?.id &&
                  item.content_type === tile?.type
          )

    const isInFavorites =
        favorites.some(
            (fav) =>
                fav.object_id === tile?.id &&
                fav.content_type_display === tile?.type
        ) ||
        localFavorites.some(
            (item) => item.id === tile?.id && item.type === tile?.type
        )
    console.log(tile)

    const handleFavoriteToggle = () => {
        const selectedFavorites = favorites.filter(
            (item) =>
                item.object_id === tile?.id &&
                item.content_type_display === tile?.type
        )
        const selectedFavoritesLocalStorage = localFavorites.filter(
            (item) => item.id === tile?.id && item.type === tile?.type
        )
        console.log(selectedFavoritesLocalStorage)

        if (isInFavorites) {
            if (isAuthenticated) {
                removeFavorite(selectedFavorites[0])
            } else {
                removeFavorite(selectedFavoritesLocalStorage[0])
            }
        } else {
            addFavorite(tile)
        }
    }

    const handleAddToCart = async () => {
        if (!isInCart && tile) {
            await addToCart(tile.type, tile.id, quantity, tile)
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
        if (!tile) {
            return Array(5).fill("")
        }
        return [tile.image1, tile.image2, tile.image3, tile.image4, tile.image5]
    }, [tile?.id, !!tile])

    if (!tile) return null

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumbs
                name={"Плитка"}
                title={tile.name}
                handleFavoriteToggle={handleFavoriteToggle}
                isInFavorites={isInFavorites}
                category="Все плитки"
                url="/products/tile"
            />
            <div className="flex flex-col justify-between w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
                <div className="flex flex-col gap-6 md:justify-between md:items-start product-detail">
                    <div className="relative mt-5 md:mt-0 flex flex-col w-[100%] items-center bg-[#F6F6F6]">
                        <div className="relative flex overflow-hidden justify-center h-[580px] w-[100%] product-detail_image">
                            <Image
                                src={imagesArr[indexTile]}
                                fill
                                alt="ImageTile"
                                className="object-contain absolute"
                            />
                        </div>
                        {tile.discount ? (
                            <div className="absolute top-3 -right-5 py-2 px-3.5 bg-red-500 text-white">
                                <span className='relative after:content-[""] after:absolute after:top-[30px] after:-right-[14px] after:border-t-[10px] after:border-r-[20px] after:border-t-[#6D6D6D] after:border-r-transparent'>
                                    скидка {tile.discount}%
                                </span>
                            </div>
                        ) : (
                            <div className="absolute hidden top-3 -right-5 py-2 px-3.5 bg-red-500 text-white">
                                <span className='relative after:content-[""] after:absolute after:top-[30px] after:-right-[14px] after:border-t-[10px] after:border-r-[20px] after:border-t-[#6D6D6D] after:border-r-transparent'>
                                    скидка
                                </span>
                            </div>
                        )}

                        <div className="py-5 flex gap-4 items-center w-full">
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
                                                        setIndexTile(index)
                                                    }
                                                    className={`relative flex items-center justify-between w-[130px] h-[103px] cursor-pointer${
                                                        index + 1 !== indexTile
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
                                {tile?.collection?.logo ? (
                                    <Image
                                        objectFit="cover"
                                        src={tile?.collection?.logo}
                                        width={203}
                                        height={30}
                                        alt="LogoCollection"
                                    />
                                ) : (
                                    <span className="uppercase text-blue-500 bold">
                                        Логотип отсутствует
                                    </span>
                                )}
                                <div className="absolute bg-white -bottom-3 px-7 underline underline-offset-4">
                                    {tile?.collection?.name}
                                </div>
                            </div>
                            <div className="uppercase flex flex-col md:flex-row md:items-end gap-2">
                                <Link
                                    href={`http://localhost:3000/product/collection/${tile.collection?.id}`}
                                    className="md:w-[50%]"
                                >
                                    назад в коллекцию
                                </Link>
                                <ArrowRight
                                    color="#ee1b1b"
                                    strokeWidth={1}
                                />
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
                            <span>{tile.price * quantity} руб.</span>
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
                <div className="flex flex-col md:flex-row justify-between w-[100%] px-10 py-10 my-14 bg-[#F6F6F6]">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Помещение:</span>
                            <span>{tile.room?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Назначение:</span>
                            <span>{tile.purpose?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Цвет:</span>
                            <span>{tile.color?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">
                                Рисунок плитки
                            </span>
                            <span>{tile.pattern?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Размер</span>
                            <span>{tile.size.name} см</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Материал</span>
                            <span>{tile.material?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">
                                Особенности плитки
                            </span>
                            <span>{tile.features?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Страна</span>
                            <span>{tile.country.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Коллекция</span>
                            <span>{tile.collection?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Поверхность</span>
                            <span>{tile.surface?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Форма</span>
                            <span>{tile.form?.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Стиль</span>
                            <span>{tile.style?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Services />
            <div className="flex flex-col gap-10 my-10 mx-auto w-screen lg:max-w-[1370px] px-10 md:px-12">
                <h2 className="text-2xl">
                    Другие плитки коллекции {tile.collection?.name}
                </h2>
                <div className="flex flex-col flex-wrap md:flex-row gap-3 items-center">
                    {tilesForCollection.map((tile) => (
                        <Product
                            key={tile.id}
                            city={tile.country}
                            imageURL={tile.image1}
                            title={tile.name}
                            price={tile.price}
                            content_type={"tile"}
                            id={tile.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TilePage
