"use client"
import React from "react"
import Image from "next/image"
import { ArrowRight, Palette, Layers, Wrench } from "lucide-react"
import Link from "next/link"

const services = [
    {
        title: "Профессиональная укладка",
        subtitle: "плитки и ламината",
        description: "Работаем с опытными мастерами, гарантируем качество",
        image: "/image-1201.png",
        icon: Layers,
        size: "large",
    },
    {
        title: "3D дизайн-проект",
        subtitle: "вашего помещения",
        description: "Визуализация интерьера до начала ремонта",
        image: "/Mask_Group.png",
        icon: Palette,
        size: "small",
    },
    {
        title: "Резка плитки",
        subtitle: "по вашим размерам",
        description: "Профессиональное оборудование для точной резки",
        image: "/Mask_Group.png",
        icon: Wrench,
        size: "small",
    },
]

const CompanyServices = () => {
    return (
        <section className="py-20 bg-slate-900">
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <span className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3 block">
                            Наши услуги
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            УСЛУГИ КОМПАНИИ
                        </h2>
                    </div>
                    <Link
                        href="/logistics"
                        className="group flex items-center gap-3 mt-6 md:mt-0"
                    >
                        <span className="text-gray-400 hover:text-white font-medium transition-colors">
                            Все услуги
                        </span>
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                            <ArrowRight size={18} className="text-white" />
                        </div>
                    </Link>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Large card */}
                    <div className="lg:col-span-1 lg:row-span-2 group relative h-[400px] lg:h-full rounded-2xl overflow-hidden">
                        <Image
                            fill
                            src={services[0].image}
                            alt={services[0].title}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Icon */}
                <div className="absolute top-6 left-6 w-14 h-14 rounded-xl bg-red-500 flex items-center justify-center">
                    {React.createElement(services[0].icon, { size: 28, className: "text-white" })}
                </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                {services[0].title}
                            </h3>
                            <p className="text-gray-300 text-lg mb-3">
                                {services[0].subtitle}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {services[0].description}
                            </p>
                        </div>
                    </div>

                    {/* Small cards */}
                    {services.slice(1).map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-[280px] rounded-2xl overflow-hidden"
                        >
                            <Image
                                fill
                                src={service.image}
                                alt={service.title}
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Icon */}
                        <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                            {React.createElement(service.icon, { size: 24, className: "text-white" })}
                        </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 mb-2">{service.subtitle}</p>
                                <p className="text-gray-400 text-sm">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    {[
                        { value: "570+", label: "Коллекций плитки" },
                        { value: "10+", label: "Лет на рынке" },
                        { value: "1000+", label: "Довольных клиентов" },
                        { value: "24ч", label: "Доставка" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CompanyServices
