"use client"
import config from "@/utils/config"
import axios from "axios"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"

export type CatalogType = {
    id: number
    name: string
    scope_of_application: string
    main_size: string
    price: number
    colors: string
    pattern: string
    formats: string
    description: string
    popularity_score: number
    image1: string
    image2: string
    image3: string
    image4: string
    image5: string
    country: string
    number_of_elements: number
    logo?: string
    compound?: string
    style?: string
    content_type: string
    type?: string
    is_new: boolean
}

const CatalogUpdates = () => {
    const popularProductRef = useRef<HTMLDivElement | null>(null)
    const [collectionNew, setCollectionNew] = useState<CatalogType[]>([])

    useEffect(() => {
        try {
            const fetchCollectionData = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/collections/`
                )
                setCollectionNew(response.data.slice(-3))
            }
            fetchCollectionData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        const scrollToref = () => {
            const hashLocation = window.location.hash
            if (
                hashLocation === "#new-collection" &&
                popularProductRef.current
            ) {
                popularProductRef.current?.scrollIntoView({
                    behavior: "smooth",
                })
            }
        }
        if (document.readyState === "complete") {
            setTimeout(scrollToref, 200)
        } else {
            window.addEventListener("load", scrollToref)
        }
        return () => window.removeEventListener("load", scrollToref)
    }, [])

    if (collectionNew.length === 0) return null

    return (
        <section
            ref={popularProductRef}
            id="new-collection"
            className="py-20 bg-gradient-to-b from-white to-gray-50"
        >
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles
                                className="text-red-500"
                                size={20}
                            />
                            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                                Новые поступления
                            </span>
                        </div>
                        <h2 className="section-title text-3xl md:text-4xl">
                            Новинки в коллекции
                        </h2>
                    </div>
                    <Link
                        href="/products/collections"
                        className="group flex items-center gap-3 mt-6 md:mt-0"
                    >
                        <span className="link-underline text-gray-600 font-medium pb-1">
                            Все коллекции
                        </span>
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                            <ArrowRight
                                size={18}
                                className="text-white"
                            />
                        </div>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
                    {/* Left column - 2 smaller cards */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {collectionNew.slice(0, 2).map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/product/collection/${collection.id}`}
                                className="group relative flex-1 min-h-[280px] rounded-2xl overflow-hidden card-hover"
                            >
                                <Image
                                    fill
                                    src={collection.image1}
                                    alt={collection.name}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="badge badge-primary">
                                        <Sparkles
                                            size={12}
                                            className="mr-1"
                                        />
                                        Новинка
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-gray-300 text-sm mb-1">
                                        Эксклюзивная коллекция
                                    </p>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                        {collection.name}
                                    </h3>
                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                        📍 {collection.country}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right column - 1 large card */}
                    <Link
                        href={`/product/collection/${collectionNew[1]?.id}`}
                        className="group lg:col-span-2 relative min-h-[400px] lg:h-full rounded-2xl overflow-hidden card-hover"
                    >
                        <Image
                            fill
                            src={collectionNew[1]?.image1}
                            alt={collectionNew[1]?.name || "Collection"}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Badge */}
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                                <Sparkles size={14} />
                                Топ коллекция
                            </span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <p className="text-gray-300 text-lg mb-2">
                                Эксклюзивная коллекция
                            </p>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                                {collectionNew[1]?.name}
                            </h3>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 flex items-center gap-2">
                                    📍 {collectionNew[1]?.country}
                                </span>
                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium group-hover:bg-red-500 transition-colors">
                                    Смотреть коллекцию →
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CatalogUpdates
