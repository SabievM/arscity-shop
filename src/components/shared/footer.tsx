"use client"
import React, { useRef, useState } from "react"
import { ArrowUp, Instagram, MapPin, PhoneCall, Clock } from "lucide-react"
import Image from "next/image"
import useClickOutside from "@/hooks/use-click-outside"
import CatalogModal from "./catalog-modal"
import Link from "next/link"
import logo from "../../../public/log.svg"

const Footer = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useClickOutside(ref, () => setOpen(false))

    const quickLinks = [
        { href: "/logistics", label: "Оплата и доставка" },
        { href: "/#new-collection", label: "Новинки в коллекции" },
        { href: "/completed-work", label: "Примеры работ" },
        { href: "/advice", label: "Полезные советы" },
        { href: "/#aboutref", label: "О нас" },
    ]

    const services = [
        "Выезд на замер",
        "Расчет материалов",
        "Резка плитки",
        "Изготовление спец.изделий",
        "3D-проект (дизайн)",
    ]

    return (
        <footer className="bg-slate-900 text-white mt-10">
            {/* Main footer */}
            <div className="container-main py-16 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-10">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1 mb-6"
                        >
                            <span className="text-3xl font-bold">Ars</span>
                            <Image
                                src={logo}
                                width={50}
                                height={50}
                                alt="logo"
                                className="brightness-0 invert"
                            />
                            <span className="text-3xl font-bold">City</span>
                        </Link>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Керамическая плитка и керамогранит в Чеченской
                            республике. Более 570 коллекций от лучших
                            производителей.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="https://www.instagram.com/baza_ars_siti?igsh=cWZ5d2lvOXYzanN1"
                                target="_blank"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link
                                href="https://wa.me/79990019494"
                                target="_blank"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"
                            >
                                <PhoneCall size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">
                            Интернет-магазин
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">
                            Услуги компании
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer inline-block">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Контакты</h3>
                        <div className="space-y-4">
                            <Link
                                href="https://wa.me/79990019494"
                                target="_blank"
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                    <PhoneCall size={18} />
                                </div>
                                <span>+7 999 001-94-94</span>
                            </Link>

                            <Link
                                href="https://yandex.ru/maps/20699/urus-martan/?ll=45.557530%2C43.142918"
                                target="_blank"
                                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm leading-relaxed">
                                    г. Урус-Мартан,
                                    <br />
                                    ул. Нурдина Усамова 34
                                </span>
                            </Link>

                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Clock size={18} />
                                </div>
                                <span>Пн-Сб: 9:00 - 18:00</span>
                            </div>
                        </div>

                        {/* Payment icons */}
                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                            <Image
                                src="/iconCard3.png"
                                width={50}
                                height={20}
                                alt="Visa"
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/iconCard2.png"
                                width={45}
                                height={28}
                                alt="Mastercard"
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/iconCard1.png"
                                width={55}
                                height={20}
                                alt="Mir"
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ArsCity. Все права
                        защищены.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/legal-information"
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            Политика конфиденциальности
                        </Link>
                        <Link
                            href="/personal-data"
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            Персональные данные
                        </Link>
                    </div>

                    {/* Scroll to top */}
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="w-12 h-12 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>

            {/* Catalog modal */}
            <div ref={ref}>
                <CatalogModal
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </footer>
    )
}

export default Footer
