"use client"
import { Heart } from "lucide-react"
import Image from "next/image"
import React, { useMemo } from "react"
import { useFavorites } from "../../../store/AddToFavorites"
import Link from "next/link"
import { useCartStore } from "../../../store/CartStore"
import config from "@/utils/config"

const FavoriteCard: React.FC<any> = ({
    id,
    name,
    price,
    country,
    content_type_display,
    object_id,
    product,
}) => {
    const { favorites, localFavorites, removeFavorite } = useFavorites()
    const { addToCart, cartList, localCart } = useCartStore()

    const isFavorites =
        favorites.some((fav) => fav && fav.name === name) ||
        localFavorites.some(
            (item) => item.id === id && item.type === content_type_display,
        )

    const ISSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])
    const image = product?.image1?.split("|")[0]

    const img = image?.startsWith("http") ? image : `${config.BASE_URL}${image}`

    const category_type =
        content_type_display.toLowerCase() === "showerassembly"
            ? "plumbingfixture"
            : content_type_display

    const isInCart =
        cartList.some(
            (item) =>
                item.product.id === object_id &&
                item.content_type_display === content_type_display,
        ) && isAuthenticated

    const isInLocalCart = localCart.some(
        (item) =>
            item.product.name === name &&
            item.content_type_display.toLowerCase() ===
                content_type_display.toLowerCase(),
    )

    const handleFAvorites = () => {
        if (isFavorites) {
            removeFavorite(product)
        }
    }

    const handleAddToCart = async () => {
        if (!isInCart && isAuthenticated) {
            await addToCart(content_type_display, object_id, 1, product)
        } else if (!isInLocalCart && !isAuthenticated) {
            await addToCart(content_type_display, object_id, 1, product)
        }
    }

    return (
        <div className="max-w-[300px] min-w-[300px] max-h-[514px] min-h-[514px] flex flex-col justify-between pb-4 pt-2 gap-[10px] px-3 shadow-md">
            <div className="flex items-center justify-between">
                <span className="flex-auto uppercase">
                    {country?.name ? country?.name : ""}
                </span>
                <Heart
                    onClick={() => handleFAvorites()}
                    size={35}
                    className="hover:scale-110 transition-all duration-200"
                    fill={isFavorites ? "red" : "white"}
                    strokeWidth={1}
                />
            </div>

            <div className="overflow-hidden min-h-[180px] flex items-center">
                <Image
                    style={{ minWidth: "100%", height: "270px" }}
                    objectFit="contain"
                    src={img}
                    alt="image"
                    width={300}
                    height={270}
                />
            </div>
            <Link
                target="blank"
                href={`/product/${category_type}/${id}`}
            >
                <span
                    title={name}
                    className="text-[1.3rem] cursor-pointer"
                >
                    {`${name.slice(0, 40)}...`}
                </span>
            </Link>
            <div className="mt-4">
                {content_type_display == "ShowerAssembly" ? (
                    <span className="text-[1.3rem] text-[#474A51]">
                        {price}
                    </span>
                ) : (
                    <span className="text-[1.3rem] text-[#474A51]">
                        {price} P за м²
                    </span>
                )}
            </div>
            <button
                onClick={handleAddToCart}
                className={`w-full text-[1.2rem] p-4 border transition-all duration-200 ${
                    isInCart || isInLocalCart
                        ? "bg-red-500 text-white border-red-500 cursor-default"
                        : "border-[#BED1E3] hover:bg-blue-400 hover:text-white"
                }`}
                disabled={isInCart || isInLocalCart}
            >
                {isInCart || isInLocalCart ? "в корзине" : "в корзину"}
            </button>
        </div>
    )
}

export default FavoriteCard
