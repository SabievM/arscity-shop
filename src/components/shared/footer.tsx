"use client"
import React, { useRef, useState } from "react"
import Button from "../ui/Button"
import { ArrowUp, Instagram, Menu, PhoneCall } from "lucide-react"
import Image from "next/image"
import useClickOutside from "@/hooks/use-click-outside"
import CatalogModal from "./catalog-modal"
import Link from "next/link"
import logo from "../../../public/log.svg"

const Footer = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useClickOutside(ref, () => setOpen(false))
    return (
        <div className="md:max-w-screen lg:w-[1370px] h-[320px] mx-auto mt-10 px-12 pt-10 md:mt-30 flex flex-col gap-10 md:flex-col lg:flex-row justify-between md:border-t-2 pb-4">
            <div
                ref={ref}
                className="flex flex-col justify-between relative"
            >
                <Button
                    onClick={() => setOpen(!open)}
                    backgroundColor="bg-red-600"
                    colorText="text-white"
                    className="hover:scale-110 hidden md:flex md:px-4 duration-150 z-[1000] -mt-20 cursor-pointer"
                    text="КАТАЛОГ ПРОДУКЦИИ"
                    icon={<Menu />}
                />
                <CatalogModal
                    open={open}
                    setOpen={setOpen}
                />
                <Link
                    href="/"
                    className="group text-4xl font-bold flex items-center rounded-2xl p-2"
                >
                    Ars
                    <Image
                        className="group-hover:translate-y-[-12px] group-hover:scale-110 transition-all duration-300"
                        src={logo}
                        width={80}
                        height={80}
                        alt="logo"
                    />
                    City
                </Link>
                <span className="text-gray-500 cursor-default hover:text-red-500 transition-all delay-100">
                    керамическая плитка и керамогранит <br /> в Чеченской
                    республике
                </span>
                <div className="flex gap-4 items-center cursor-pointer hover:text-red-500 transition-all delay-100">
                    <Link
                        href="https://www.instagram.com/baza_ars_siti?igsh=cWZ5d2lvOXYzanN1"
                        className="text-[1.5rem] font-bold flex items-center rounded-2xl p-2"
                    >
                        Ars
                        <Image
                            src={logo}
                            width={40}
                            height={40}
                            alt="logo"
                        />
                        City
                    </Link>
                    <Instagram />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl cursor-default hover:text-red-500 transition-all delay-100">
                    интернет-магазин
                </h2>
                <div className="flex flex-col gap-3 text-gray-700">
                    <ul className="flex flex-col md:flex-row lg:flex-col flex-wrap gap-5 lg:justify-between">
                        <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                            <Link href="/logistics">Оплата и доставка</Link>
                        </li>
                        <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                            <Link href="/#new-collection">
                                Новинки в коллекции
                            </Link>
                        </li>
                        <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                            <Link href="/completed-work">Примеры работ</Link>
                        </li>
                        <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                            <Link href="/advice">Полезные советы</Link>
                        </li>
                        <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                            <Link href="/#aboutref">О нас</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl cursor-default hover:text-red-500 transition-all delay-100">
                    услуги компании
                </h2>
                <div className="flex flex-col gap-3 md:flex-row lg:flex-col flex-wrap text-gray-700">
                    <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                        Выезд на замер
                    </span>
                    <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                        Расчет материалов
                    </span>
                    <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                        Резка
                    </span>
                    <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                        Изготовление спец.изделий
                    </span>
                    <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                        3D-проект (дизайн)
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3 md:justify-between h-[100%]">
                <div className="flex gap-4 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                    <PhoneCall />
                    <Link href="https://wa.me/79990019494">
                        <span>+7 999 001-94-94</span>
                    </Link>
                </div>
                <div className="flex justify-between md:gap-10">
                    <Image
                        src="/iconCard3.png"
                        width={60}
                        height={19}
                        alt="iconcard"
                        objectFit="cover"
                    />
                    <Image
                        src="/iconCard2.png"
                        width={52}
                        height={31}
                        alt="iconcard"
                    />
                    <Image
                        src="/iconCard1.png"
                        width={66}
                        height={19}
                        alt="iconcard"
                    />
                </div>
                <Button
                    backgroundColor="bg-gray-400"
                    colorText="text-white"
                    className="hover:scale-110 hover:bg-red-500 duration-150 z-[1000] uppercase md:w-[250px] h-[65px] cursor-pointer"
                    text="Наверх страницы"
                    icon={<ArrowUp />}
                    onClick={() => {
                        scrollTo(0, 0)
                    }}
                />
            </div>
        </div>
    )
}

export default Footer
