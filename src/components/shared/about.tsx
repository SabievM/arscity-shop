"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import { ArrowRight, Award, CheckCircle, MapPin, Store } from "lucide-react"

const features = [
    "Более 570 коллекций от лучших производителей",
    "Эксклюзивные бренды России и Европы",
    "Оригинальная продукция по заводским ценам",
    "Бесплатный 3D дизайн-проект при покупке",
    "Доставка в день заказа",
]

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
        <section
            ref={aboutref}
            id="aboutref"
            className="py-20 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Store className="text-red-500" size={20} />
                            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                                О компании
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                            О нашем магазине
                        </h2>

                        <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                            <p>
                                В каталоге нашего интернет-магазина более 570 коллекций
                                керамической плитки и керамогранита от лучших
                                производителей России и Европы.
                            </p>
                            <p>
                                В наличии имеются эксклюзивные бренды, которые вы не
                                найдете в других магазинах Чеченской Республики. Вся
                                продукция оригинальная от производителей по установленной
                                заводом цене.
                            </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-3 mb-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle
                                        size={20}
                                        className="text-green-500 flex-shrink-0"
                                    />
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/full-details" className="btn-primary inline-flex items-center gap-2">
                                Подробнее о компании
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="https://yandex.ru/maps/20699/urus-martan/?ll=45.557530%2C43.142918&mode=routes"
                                target="_blank"
                                className="btn-secondary inline-flex items-center gap-2"
                            >
                                <MapPin size={18} />
                                Показать на карте
                            </Link>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Main large image */}
                            <div className="col-span-2 relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/imageAbout.webp"
                                    alt="О нашем магазине"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Two smaller images */}
                            <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/image113.png"
                                    alt="Интерьер"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/image114.png"
                                    alt="Интерьер"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-red-500 flex items-center justify-center">
                                <Award size={28} className="text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">10+</div>
                                <div className="text-gray-500 text-sm">лет на рынке</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
