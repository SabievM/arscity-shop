"use client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import CollectionCard from "./collection-card"
import Product from "./product-card"
import Link from "next/link"
import axios from "axios"
import { CatalogType } from "./catalog-updates"
import { TileTypes } from "@/types/typeTiles"
import config from "@/utils/config"

const PopularProducts = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const refProducts = useRef<HTMLDivElement>(null)
    const [viewMode, setViewMode] = useState<"collections" | "products">(
        "collections"
    )
    const [collections, setCollections] = useState<CatalogType[]>([])
    const [tiles, setTiles] = useState<TileTypes[]>([])
    const [totalQuantityProduct, setTotalQuantityProduct] = useState(0)
    const [countData, setCountData] = useState(4)

    useEffect(() => {
        try {
            const fetchCollectionData = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/collections/?popularity_score=8`
                )
                setCollections(response.data)
            }
            fetchCollectionData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        try {
            const fetchTileData = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/tiles/?popularity_score=8`
                )
                setTiles(response.data.results.slice(0, countData))
                setTotalQuantityProduct(response.data.results.length)
            }
            fetchTileData()
        } catch (error) {
            console.log(error)
        }
    }, [countData])

    const showMore = () => {
        if (countData < totalQuantityProduct) {
            setCountData((prev) => prev + 4)
        } else {
            setCountData(4)
            refProducts.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -420, behavior: "smooth" })
        }
    }
    const scrollRight = () => {
        if (scrollRef.current) {
            const el = scrollRef.current
            const maxScrollLeft = el.scrollWidth - el.clientWidth
            if (el.scrollLeft + 120 >= maxScrollLeft) {
                el.scrollTo({ left: 0, behavior: "smooth" })
            } else {
                el.scrollBy({ left: 420, behavior: "smooth" })
            }
        }
    }

    if (tiles.length === 0 && collections.length === 0) return null

    return (
        <div
            ref={refProducts}
            className="relative flex flex-col gap-5 w-screen md:max-w-[100vw] lg:w-[1370px] mx-auto px-10 hover:-translate-y-1 transition-all duration-200"
        >
            <div className="flex items-center justify-between text-2xl uppercase">
                <div className="flex text-[0.85rem] lg:text-2xl gap-10 lg:justify-between items-center lg:gap-10">
                    <h2
                        style={{
                            color: viewMode === "collections" ? "red" : "black",
                        }}
                        className=' cursor-pointer font-bold relative inline-block after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1'
                        onClick={() => setViewMode("collections")}
                    >
                        Популярные коллеции
                    </h2>
                    <h2
                        style={{
                            color: viewMode === "products" ? "red" : "black",
                        }}
                        className=' cursor-pointer font-bold relative inline-block after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1'
                        onClick={() => setViewMode("products")}
                    >
                        Популярные ТОВАРЫ
                    </h2>
                    <Link
                        href={
                            viewMode === "collections"
                                ? "/products/collections"
                                : "/products/tile"
                        }
                        className="-bottom-12 left-8 group flex items-center gap-3"
                    >
                        <span className='inline-block after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1'>
                            {viewMode === "collections"
                                ? "Все коллекции"
                                : "Все товары"}
                        </span>
                        <div className="hidden lg:flex items-center justify-center w-[30px] h-[30px] rounded-[50%] bg-red-600 text-white group-hover:scale-125 transition-all duration-200">
                            <ArrowRight size={20} />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex relative items-center gap-5 border-x-2 px-2">
                {viewMode === "collections" ? (
                    <>
                        <button
                            onClick={scrollLeft}
                            className="absolute bottom-0 left-[30%] lg:left-0 lg:bottom-0 lg:relative lg:block cursor-pointer hover:scale-[1.1] transition-all delay-100 p-3 bg-red-600 rounded-[50%]"
                        >
                            <ArrowLeft
                                size={20}
                                color="#fff"
                            />
                        </button>
                        <div
                            ref={scrollRef}
                            className="flex gap-8 overflow-x-hidden overflow-y-hidden mb-5"
                        >
                            {collections.map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/product/collection/${collection.id}`}
                                >
                                    <CollectionCard
                                        key={collection.id}
                                        country={collection.country}
                                        name={collection.name}
                                        image1={collection.image1}
                                        number_of_elements={
                                            collection.number_of_elements
                                        }
                                        collection={collection}
                                    />
                                </Link>
                            ))}
                        </div>
                        <button
                            onClick={scrollRight}
                            className="absolute bottom-0 lg:bottom-0 right-[30%] lg:relative lg:right-0 lg:block cursor-pointer hover:scale-[1.1] transition-all delay-100 p-3 bg-red-600 rounded-[50%]"
                        >
                            <ArrowRight
                                size={20}
                                color="#fff"
                            />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                            {tiles.map((tile, index) => (
                                <Product
                                    key={tile.name}
                                    id={tile.id}
                                    index={index}
                                    city={tile.country}
                                    title={tile.name}
                                    imageURL={tile.image1}
                                    price={tile.price}
                                    content_type={tile.type}
                                    product={tile}
                                />
                            ))}
                        </div>
                        {totalQuantityProduct > 6 ? (
                            <button
                                onClick={() => showMore()}
                                className="px-4 py-2 bg-red-500 text-white w-1/2 mx-auto hover:scale-105 transition-all duration-150 cursor-pointer"
                            >
                                {countData >= totalQuantityProduct
                                    ? "скрыть"
                                    : "Показать еще"}
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PopularProducts
