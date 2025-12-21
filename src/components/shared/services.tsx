"use client"
import Image from "next/image"
import React from "react"
import trucksvg from "../../../public/truck.svg"
import cuttingTiles from "../../../public/codepen.svg"
import layers from "../../../public/layers.svg"
import cube from "../../../public/Group.svg"

const services = [
    {
        icon: trucksvg,
        title: "Удобная доставка",
        subtitle: "по Чеченской Республике",
        description: "в день покупки",
        color: "from-red-500 to-red-600",
    },
    {
        icon: cuttingTiles,
        title: "Резка плитки",
        subtitle: "и керамогранита",
        description: "под ваш проект",
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: layers,
        title: "Монтаж плитки",
        subtitle: "и укладка ламината",
        description: "под ключ",
        color: "from-red-500 to-red-600",
    },
    {
        icon: cube,
        title: "3D дизайн-проект",
        subtitle: "в подарок",
        description: "при покупке плитки",
        color: "from-blue-500 to-blue-600",
    },
]

const Services = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container-main">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Background gradient on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                            />

                            {/* Icon container */}
                            <div
                                className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                            >
                                <Image
                                    src={service.icon}
                                    alt="icon"
                                    width={32}
                                    height={32}
                                    className="brightness-0 invert"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-red-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {service.subtitle}
                                </p>
                                <span className="inline-block text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                    {service.description}
                                </span>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
