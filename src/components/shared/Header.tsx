"use client"
import {
    Heart,
    Instagram,
    Menu,
    PhoneCall,
    Search,
    ShoppingCart,
    User,
    X,
    MapPin,
} from "lucide-react"
import Link from "next/link"
import React, { useEffect, useMemo, useRef, useState } from "react"
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
    const [isScrolled, setIsScrolled] = useState(false)
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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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

    const navLinks = [
        { href: "/logistics", label: "Оплата и доставка" },
        { href: "/#new-collection", label: "Новинки" },
        { href: "/completed-work", label: "Примеры работ" },
        { href: "/advice", label: "Советы" },
        { href: "/galaryworks", label: "Галерея" },
        { href: "/#aboutref", label: "О нас" },
    ]

    const cartCount = isAuth ? cartList.length : localCart.length
    const favCount = isAuth ? favorites.length : localFavorites.length

    return (
        <>
            {/* Top bar */}
            <div className="hidden lg:block bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2">
                <div className="container-main flex justify-between items-center text-sm">
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://wa.me/79990019494"
                            target="_blank"
                            className="flex items-center gap-2 hover:text-red-400 transition-colors"
                        >
                            <PhoneCall size={14} />
                            <span>+7 999 001-94-94</span>
                        </Link>
                        <Link
                            href="https://yandex.ru/maps/20699/urus-martan/?ll=45.557530%2C43.142918&mode=routes&rtext=~43.142918%2C45.557530&rtt=auto&ruri=~&z=17"
                            target="_blank"
                            className="flex items-center gap-2 hover:text-red-400 transition-colors"
                        >
                            <MapPin size={14} />
                            <span>г. Урус-Мартан, ул. Нурдина Усамова 34</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://www.instagram.com/baza_ars_siti?igsh=cWZ5d2lvOXYzanN1"
                            target="_blank"
                            className="hover:text-red-400 transition-colors"
                        >
                            <Instagram size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <header
                className={`sticky top-0 z-100 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-md"
                        : "bg-white"
                }`}
            >
                <div className="container-main">
                    {/* Mobile header */}
                    <div className="flex lg:hidden items-center justify-between py-4 px-4">
                        <button
                            onClick={() => setShowMenu(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-1"
                        >
                            <span className="text-2xl font-bold text-slate-800">
                                Ars
                            </span>
                            <Image
                                src={logo}
                                width={45}
                                height={45}
                                alt="logo"
                                className="transition-transform hover:scale-110"
                            />
                            <span className="text-2xl font-bold text-slate-800">
                                City
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/favorites"
                                className="relative p-2"
                            >
                                <Heart size={22} />
                                {favCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {favCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/cart"
                                className="relative p-2"
                            >
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile search */}
                    <div className="lg:hidden pb-4 px-2">
                        <div className="relative">
                            <input
                                className="input-modern pl-12 pr-4 bg-gray-50 focus:bg-white"
                                type="text"
                                placeholder="Поиск в каталоге..."
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                    if (e.target.value.length) {
                                        router.push("/products/search")
                                    }
                                }}
                            />
                            <Search
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                        </div>
                    </div>

                    {/* Mobile catalog button */}
                    <div
                        ref={ref}
                        className="lg:hidden pb-4 px-2"
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full btn-primary flex items-center justify-center gap-3"
                        >
                            <Menu size={20} />
                            <span>КАТАЛОГ ПРОДУКЦИИ</span>
                        </button>
                        <CatalogModal
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>

                    {/* Desktop header */}
                    <div className="hidden lg:flex items-center justify-between py-5">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-1 shrink-0"
                        >
                            <span className="text-3xl font-bold text-slate-800 tracking-tight">
                                Ars
                            </span>
                            <Image
                                src={logo}
                                width={60}
                                height={60}
                                alt="logo"
                                className="group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                            />
                            <span className="text-3xl font-bold text-slate-800 tracking-tight">
                                City
                            </span>
                        </Link>

                        {/* Tagline */}
                        <div className="hidden xl:block max-w-[200px]">
                            <p className="text-sm text-gray-500 leading-snug">
                                Керамическая плитка и керамогранит в Чеченской
                                Республике
                            </p>
                        </div>

                        {/* Catalog button */}
                        <div
                            ref={ref}
                            className="relative"
                        >
                            <button
                                onClick={() => setOpen(!open)}
                                className="btn-primary flex items-center gap-3 cursor-pointer"
                            >
                                <Menu size={20} />
                                <span>КАТАЛОГ</span>
                            </button>
                            <CatalogModal
                                open={open}
                                setOpen={setOpen}
                            />
                        </div>

                        {/* Search */}
                        <div className="relative w-[320px]">
                            <input
                                className="input-modern pl-12 pr-4 bg-gray-50 focus:bg-white"
                                type="text"
                                placeholder="Поиск в каталоге..."
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                    if (e.target.value.length) {
                                        router.push("/products/search")
                                    }
                                }}
                            />
                            <Search
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Link
                                href={isLogged ? "/profile" : "/auth/login"}
                                className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                            >
                                <User
                                    size={22}
                                    className="text-gray-600 group-hover:text-red-500 transition-colors"
                                />
                                <span className="text-xs text-gray-500">
                                    Профиль
                                </span>
                            </Link>

                            <Link
                                href="/favorites"
                                className="relative flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                            >
                                <Heart
                                    size={22}
                                    className="text-gray-600 group-hover:text-red-500 transition-colors"
                                />
                                <span className="text-xs text-gray-500">
                                    Избранное
                                </span>
                                {favCount > 0 && (
                                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {favCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                href="/cart"
                                className="relative flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                            >
                                <ShoppingCart
                                    size={22}
                                    className="text-gray-600 group-hover:text-red-500 transition-colors"
                                />
                                <span className="text-xs text-gray-500">
                                    Корзина
                                </span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 pb-4 border-t border-gray-100 pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="link-underline text-gray-600 hover:text-slate-900 font-medium transition-colors pb-1"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <div
                onClick={() => setShowMenu(false)}
                className={`lg:hidden fixed max-w-screen inset-0 bg-black/50 backdrop-blur-sm z-[100000] transition-opacity duration-300 ${
                    showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl transition-transform duration-300 ${
                        showMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link
                            href="/"
                            className="flex items-center gap-1"
                        >
                            <span className="text-xl font-bold">Ars</span>
                            <Image
                                src={logo}
                                width={35}
                                height={35}
                                alt="logo"
                            />
                            <span className="text-xl font-bold">City</span>
                        </Link>
                        <button
                            onClick={() => setShowMenu(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-4">
                        <Link
                            href={isLogged ? "/profile" : "/auth/login"}
                            onClick={() => setShowMenu(false)}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4"
                        >
                            <User
                                size={20}
                                className="text-gray-600"
                            />
                            <span className="font-medium">
                                {isLogged ? "Мой профиль" : "Войти"}
                            </span>
                        </Link>

                        <nav className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setShowMenu(false)}
                                    className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-6 pt-6 border-t">
                            <Link
                                href="https://wa.me/79990019494"
                                target="_blank"
                                className="flex items-center gap-3 text-gray-600 mb-3"
                            >
                                <PhoneCall size={18} />
                                <span>+7 999 001-94-94</span>
                            </Link>
                            <Link
                                href="https://www.instagram.com/baza_ars_siti?igsh=cWZ5d2lvOXYzanN1"
                                target="_blank"
                                className="flex items-center gap-3 text-gray-600"
                            >
                                <Instagram size={18} />
                                <span>@baza_ars_siti</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
