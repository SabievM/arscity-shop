"use client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"

const SliderCollections = () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const brandsMock = [
        {
            title: "CEZARS",
            imageURL:
                "https://market-parket.ru/upload/resize_cache/iblock/83b/83b1093f8c684dd7fc9334de14ffdfd7_thumb_af47a44fe00c28b8_thumb_2e02b06d472c6421.jpg",
        },
        {
            title: "ITALON",
        },
        {
            title: "КЕРАМИН",
            imageURL:
                "https://pkm-group.ru/upload/iblock/18e/18e7fc35bd4676e4ec2c65c026087ec2.svg",
        },
        {
            title: "CEZARS",
            imageURL:
                "https://static.insales-cdn.com/files/1/6380/24508652/original/u-dace49c567a4bd8a437132ccc4308728_2x.png",
        },
        {
            title: "CRASARO",
            imageURL:
                "https://static.vecteezy.com/system/resources/thumbnails/020/071/988/small/clay-ceramics-logo-design-vector.jpg",
        },
        {
            title: "CEZARS",
            imageURL:
                "https://dynamic.brandcrowd.com/asset/logo/58045d37-cac6-4c18-b150-1cef982d2382/logo-search-grid-1x?logoTemplateVersion=1&v=638491912584430000",
        },
    ]

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
        }
    }

    return (
        <section className="py-16 bg-white">
            <div className="container-main">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="section-title">КАТАЛОГ БРЕНДОВ</h2>
                        <p className="text-gray-500 mt-3">
                            Лучшие производители плитки и керамогранита
                        </p>
                    </div>

                    {/* Navigation buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={scrollLeft}
                            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group"
                        >
                            <ArrowLeft
                                size={20}
                                className="text-gray-600 group-hover:text-white"
                            />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                        >
                            <ArrowRight size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Brands slider */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex items-center gap-6 overflow-x-auto scroll-hidden pb-4"
                    >
                        {brandsMock.map((brand, index) => (
                            <div
                                key={index}
                                className="group flex-shrink-0 w-[200px] h-[140px] bg-gray-50 rounded-2xl flex items-center justify-center p-6 border-2 border-transparent hover:border-red-100 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                {brand.imageURL ? (
                                    <Image
                                        src={brand.imageURL}
                                        width={120}
                                        height={80}
                                        alt={brand.title}
                                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                ) : (
                                    <span className="text-xl font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                                        {brand.title}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile navigation */}
                    <div className="flex md:hidden items-center justify-center gap-3 mt-6">
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
            </div>
        </section>
    )
}

export default SliderCollections
