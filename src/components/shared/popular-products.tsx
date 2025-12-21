"use client"
import { ArrowLeft, ArrowRight, Flame, TrendingUp } from "lucide-react"
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
    const [viewMode, setViewMode] = useState<"collections" | "products">("collections")
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
        <section ref={refProducts} className="py-20 bg-white">
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Flame className="text-red-500" size={24} />
                        <h2 className="section-title text-2xl md:text-3xl">
                            Популярное
                        </h2>
                    </div>

                    {/* Tabs and link */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        {/* Tabs */}
                        <div className="flex bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode("collections")}
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                                    viewMode === "collections"
                                        ? "bg-white text-red-600 shadow-sm"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                Коллекции
                            </button>
                            <button
                                onClick={() => setViewMode("products")}
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                                    viewMode === "products"
                                        ? "bg-white text-red-600 shadow-sm"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                Товары
                            </button>
                        </div>

                        {/* View all link */}
                        <Link
                            href={
                                viewMode === "collections"
                                    ? "/products/collections"
                                    : "/products/tile"
                            }
                            className="group flex items-center gap-2"
                        >
                            <span className="link-underline text-gray-600 font-medium text-sm pb-1">
                                {viewMode === "collections" ? "Все коллекции" : "Все товары"}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                                <ArrowRight size={14} className="text-white" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                {viewMode === "collections" ? (
                    <div className="relative">
                        {/* Navigation */}
                        <button
                            onClick={scrollLeft}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 hidden lg:flex"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        {/* Slider */}
                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto scroll-hidden pb-4"
                        >
                            {collections.map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/product/collection/${collection.id}`}
                                    className="flex-shrink-0"
                                >
                                    <CollectionCard
                                        country={collection.country}
                                        name={collection.name}
                                        image1={collection.image1}
                                        number_of_elements={collection.number_of_elements}
                                        collection={collection}
                                    />
                                </Link>
                            ))}
                        </div>

                        <button
                            onClick={scrollRight}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-500 shadow-lg flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 hidden lg:flex"
                        >
                            <ArrowRight size={20} />
                        </button>

                        {/* Mobile navigation */}
                        <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
                            <button
                                onClick={scrollLeft}
                                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center"
                            >
                                <ArrowLeft size={18} className="text-gray-600" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
                            >
                                <ArrowRight size={18} className="text-white" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {/* Products grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                        {/* Show more button */}
                        {totalQuantityProduct > 6 && (
                            <button
                                onClick={showMore}
                                className="mx-auto btn-secondary flex items-center gap-2"
                            >
                                <TrendingUp size={18} />
                                {countData >= totalQuantityProduct ? "Скрыть" : "Показать ещё"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PopularProducts
