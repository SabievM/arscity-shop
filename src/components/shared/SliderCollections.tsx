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
            scrollRef.current.scrollBy({ left: -320, behavior: "smooth" }) // 320px = ширина карточки + отступ
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
        }
    }

    return (
        <div className="flex flex-col w-screen md:max-w-[100vw] lg:w-[1370px] mx-auto px-4 lg:px-10 py-12 mt-5 overflow-hidden">
            <h2 className="mx-auto lg:mx-0">КАТАЛОГ БРЕНДОВ</h2>

            <div className="flex items-center gap-4">
                <button
                    onTouchEnd={scrollLeft}
                    onClick={scrollLeft}
                    className="cursor-pointer hover:scale-[1.1] transition-all delay-100 p-3 bg-red-600 rounded-[50%]"
                >
                    <ArrowLeft
                        size={20}
                        color="#fff"
                    />
                </button>
                <div
                    className="flex items-center gap-4 overflow-x-hidden scroll-smooth w-full "
                    ref={scrollRef}
                >
                    {brandsMock.map((brand, index) => (
                        <div
                            key={index}
                            className="bg-[#EEEEEE] min-w-[300px] lg:min-w-[300px] h-[200px] flex items-center justify-center rounded-[5px]"
                        >
                            {brand.imageURL ? (
                                <Image
                                    src={brand.imageURL}
                                    width={100}
                                    height={100}
                                    alt="Image"
                                    className="object-contain"
                                />
                            ) : (
                                <span>{brand.title}</span>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onTouchEnd={scrollLeft}
                    onClick={scrollRight}
                    className="cursor-pointer hover:scale-[1.1] transition-all delay-100 p-3 bg-red-600 rounded-[50%]"
                >
                    <ArrowRight
                        size={20}
                        color="#fff"
                    />
                </button>
            </div>
        </div>
    )
}

export default SliderCollections
