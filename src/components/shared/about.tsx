"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef } from "react"

const About = () => {
    const aboutref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (typeof window === "undefined") return
        const scrollToref = () => {
            const hashLocation = window.location.hash
            if (hashLocation === "#aboutref" && aboutref.current) {
                aboutref.current?.scrollIntoView({ behavior: "smooth" })
            }
        }
        if (document.readyState === "complete") {
            setTimeout(scrollToref, 2000)
        } else {
            window.addEventListener("load", scrollToref)
        }
        return () => window.removeEventListener("load", scrollToref)
    }, [])

    return (
        <div
            ref={aboutref}
            id="aboutref"
            className="w-screen md:max-w-[100vw] lg:w-[1370px] px-10 mx-auto flex flex-col lg:flex-row gap-[63px] mt-10"
        >
            <div className="flex flex-col gap-[80px] lg:w-[480px]">
                <h2 className="text-3xl uppercase font-bold">
                    О нашем магазине
                </h2>
                <p className="text-gray-500 text-justify flex flex-col gap-4">
                    <span>
                        В каталоге нашего интернет-магазина более 570 коллекций
                        керамической плитки и керамогранита от лучших
                        производителей России и Европы. В наличии имеются
                        эксклюзивные бренды, которые вы не найдете в других
                        магазинах Чеченской Республики.
                    </span>
                    <span>
                        Вся продукция оригинальная от производителей по
                        установленной заводом цене.
                        <br />
                        Услуги для вашего удобства: резка плитки, выезд на замер
                        и расчет материалов. При покупке плитки дарим
                        дизайн-проект вашего помещения в подарок. Возможна
                        доставка плитки в день заказа.
                    </span>
                </p>
                <Link
                    href="/full-details"
                    className="text-blue-500 text-[1rem] "
                >
                    Помотреть полные сведения
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                <Image
                    src="/imageAbout.webp"
                    alt="image"
                    width={360}
                    height={400}
                    objectFit="cover"
                />
                <div className="flex flex-col md:hidden lg:flex gap-10">
                    <Image
                        src="/image113.png"
                        alt="image"
                        width={360}
                        height={190}
                    />
                    <Image
                        src="/image114.png"
                        alt="image"
                        width={360}
                        height={190}
                    />
                </div>
            </div>
        </div>
    )
}

export default About
