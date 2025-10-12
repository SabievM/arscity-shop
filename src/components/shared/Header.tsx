"use client"
import {
    ArrowRight,
    Heart,
    Instagram,
    Menu,
    MenuIcon,
    PhoneCall,
    ShoppingCart,
    User,
    X,
} from "lucide-react"
import Link from "next/link"
import React, { useEffect, useMemo, useRef, useState } from "react"
import Button from "@/components/ui/Button"
import CatalogModal from "./catalog-modal"
import useClickOutside from "@/hooks/use-click-outside"
import logo from "../../../public/log.svg"
import Image from "next/image"
import { useCartStore } from "../../../store/CartStore"
import { useFavorites } from "../../../store/AddToFavorites"
import { useSearchStore } from "../../../store/SearchStore"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"

const Header = () => {
    const [open, setOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const { cartList, localCart } = useCartStore()
    const { favorites, localFavorites } = useFavorites()
    const { handleSearch } = useSearchStore()
    const fetchCart = useCartStore((state) => state.fetchCart)
    useClickOutside(ref, () => setOpen(false))
    const debounce = useDebounce(searchInput, 1000)
    const router = useRouter()
    const ISINSERVER = typeof window === "undefined"
    const isAuth = useMemo(() => {
        if (ISINSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if (ISINSERVER) return
        const token = localStorage.getItem("access_token")
        if (token) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [])

    useEffect(() => {
        handleSearch(debounce)
    }, [searchInput, debounce])

    useEffect(() => {
        fetchCart()
    }, [fetchCart])
    console.log(searchInput)

    return (
        <header className="flex flex-col-reverse lg:flex lg:flex-row lg:relative lg:justify-between lg:max-w-screen lg:w-[1370px] lg:h-[240px] lg:mx-auto bg-white lg:px-10 lg:mt-8 z-30">
            <div className="lg:flex lg:flex-col lg:max-w-[803px] lg:gap-10 lg:relative">
                <ul className="hidden lg:flex lg:gap-5 lg:justify-between">
                    <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                        <Link href="/logistics">Оплата и доставка</Link>
                    </li>
                    <li className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                        <Link href="/#new-collection">Новинки в коллекции</Link>
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
                <div className="flex flex-col text-center pb-5 px-4 items-center  h-[250px] lg:px-0 lg:flex-row lg:gap-5 lg:items-center lg:justify-between">
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
                    <span className="relative md:hidden inline-block lg:w-[300px] after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1">
                        керамическая плитка и керамогранит в Чеченсокй
                        Республике
                    </span>
                    <div className="flex mt-12 lg:mt-0 gap-10 w-[100%] pr-10 lg:pr-0 justify-end lg:justify-center lg:w-0">
                        <Link href={`${isLogged ? "/profile" : "/auth/login"}`}>
                            <User className="hover:scale-125 duration-150 cursor-pointer" />
                        </Link>
                        <Link
                            href="/favorites"
                            className="relative"
                        >
                            <Heart className="hover:scale-125 duration-150 cursor-pointer" />
                            <span className="absolute text-red-500 -top-4 -right-2">
                                {isAuth
                                    ? favorites.length
                                    : localFavorites.length}
                            </span>
                        </Link>
                        <Link
                            href="/cart"
                            className="relative"
                        >
                            <ShoppingCart className="hover:scale-125 duration-150 cursor-pointer" />
                            <span className="absolute text-red-500 -top-4 -right-2">
                                {isAuth ? cartList.length : localCart.length}
                            </span>
                        </Link>
                    </div>
                </div>
                <div
                    ref={ref}
                    className="relative"
                >
                    <Button
                        onClick={() => setOpen(!open)}
                        backgroundColor="bg-red-600"
                        colorText="text-white"
                        className={`hover:scale-110 px-5 left-5 hidden lg:flex bottom-2 lg:left-5 duration-150 absolute lg:bottom-2 lg:top-[-30px] z-[1000] cursor-pointer`}
                        text="КАТАЛОГ ПРОДУКЦИИ"
                        icon={<Menu />}
                    />
                    <Button
                        onClick={() => setOpen(!open)}
                        backgroundColor="bg-red-600"
                        colorText="text-white"
                        className={`hover:scale-110 px-5 left-5 block lg:hidden bottom-2 lg:left-5 duration-150 absolute lg:bottom-2 lg:top-[-30px] z-[1000] cursor-pointer`}
                        text="КАТАЛОГ"
                        icon={<Menu />}
                    />
                    <CatalogModal
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
            </div>
            <div className="flex flex-col bg-[#EEEEEE] pb-5 lg:pb-0 lg:bg-white gap-5 lg:gap-[47px]">
                <div className="flex justify-between px-4 pt-5 lg:flex lg:flex-row lg:gap-[83px] lg:items-center">
                    <div
                        onClick={() => setShowMenu(true)}
                        className="lg:hidden cursor-pointer"
                    >
                        <MenuIcon />
                    </div>
                    <div className="flex flex-col gap-5">
                        <Link
                            target="blank"
                            href="https://wa.me/79990019494"
                            className="flex flex-row gap-3 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                        >
                            <PhoneCall />
                            +7 999 001-94-94
                        </Link>
                        <span className="hidden lg:flex lg:flex-row lg:gap-3 lg:relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer">
                            <Link
                                target="blank"
                                href="https://yandex.ru/maps/20699/urus-martan/?ll=45.557530%2C43.142918&mode=routes&rtext=~43.142918%2C45.557530&rtt=auto&ruri=~&z=17"
                            >
                                г. Урус-Мартан, ул. Нурдина Усамова 34
                            </Link>
                        </span>
                    </div>

                    <Link
                        href="https://www.instagram.com/baza_ars_siti?igsh=cWZ5d2lvOXYzanN1"
                        target="blank"
                    >
                        <Instagram />
                    </Link>
                </div>
                <div className="relative px-4 lg:px-0">
                    <input
                        className="w-[100%] lg:h-[50px]  text-white placeholder-text-black px-3 py-2 border rounded-[2px] border-gray-300 outline-none bg-red-500 focus:bg-white focus:text-black focus:border-2 focus:scale-105 transition-all delay-150"
                        type="text"
                        placeholder="искать в каталоге"
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            if (e.target.value.length) {
                                router.push("/products/search")
                            }
                        }}
                    />
                    <ArrowRight
                        onClick={() => setSearchInput(searchInput)}
                        className="absolute top-[30%] w-[20px] h-[20px] right-6 lg:right-[20px] cursor-pointer"
                        color="black"
                    />
                </div>
            </div>

            <div
                onClick={() => setShowMenu(false)}
                className={`lg:hidden ${
                    showMenu ? "left-0" : "left-[-100vw]"
                } fixed top-0 w-screen h-screen bg-gray-400/50 flex items-start transition-all duration-200 z-[1000]`}
            >
                <ul
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col items-center w-[50%] pt-10 bg-white h-[100%] gap-5"
                >
                    <li
                        onClick={() => setShowMenu(false)}
                        className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                    >
                        <Link href="/logistics">Оплата и доставка</Link>
                    </li>
                    <li
                        onClick={() => setShowMenu(false)}
                        className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                    >
                        <Link href="/#new-collection">Новинки в коллекции</Link>
                    </li>
                    <li
                        onClick={() => setShowMenu(false)}
                        className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                    >
                        <Link href="/completed-work">Примеры работ</Link>
                    </li>
                    <li
                        onClick={() => setShowMenu(false)}
                        className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                    >
                        <Link href="/advice">Полезные советы</Link>
                    </li>
                    <li
                        onClick={() => setShowMenu(false)}
                        className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1"
                    >
                        <Link href="/#aboutref">О нас</Link>
                    </li>
                </ul>
                <X
                    onClick={() => setShowMenu(false)}
                    className="absolute top-2 left-[42%]"
                />
            </div>
        </header>
    )
}

export default Header
