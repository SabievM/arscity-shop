"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import config from "@/utils/config"
import { CatalogType } from "@/components/shared/catalog-updates"

import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Scrollbar } from "swiper/modules"

import Image from "next/image"

const Demonstration = () => {
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

    console.log(collectionNew)

    return (
        <div className="w-screen h-screen md:max-w-screen lg:w-[1370px] mx-auto mt-20">
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="mySwiper"
            >
                {collectionNew.map((slideContent, index) => (
                    <SwiperSlide
                        key={slideContent.id}
                        virtualIndex={index}
                    >
                        {
                            <>
                                <div className="h-[50vh] overflow-hidden relative">
                                    <Image
                                        src={slideContent.image1}
                                        fill
                                        alt="image"
                                        className="absolute object-contain"
                                    />
                                </div>
                                <div className="flex text-5xl mt-[100px] h-[80px] items-center justify-center bg-gray-300">
                                    Коллекция{" "}
                                    <span className="font-extrabold ml-6">
                                        {slideContent.name}
                                    </span>
                                </div>
                            </>
                        }
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Demonstration
