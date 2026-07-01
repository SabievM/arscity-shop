import React, { useMemo } from "react"
import { useCartStore } from "../../../../../store/CartStore"
import { useFavorites } from "../../../../../store/AddToFavorites"
import Image from "next/image"
import { Heart } from "lucide-react"
import Link from "next/link"
import config from "@/utils/config"
// import { SearchDataType } from '../page'

type Props = {
    content_type: string
    id: number
    name: string
    price: number
    image1: string
    tile_type?: string
    country: string

    product: any
}

const SearchCard: React.FC<Props> = ({
    content_type,
    id,
    name,
    price,
    product,
}) => {
    const { favorites, localFavorites, removeFavorite, addFavorite } =
        useFavorites()
    const { addToCart, cartList, localCart } = useCartStore()

    const isFavorites =
        favorites.some(
            (fav) =>
                fav.name === name &&
                fav.content_type_display.toLowerCase() ===
                    content_type.toLowerCase(),
        ) ||
        localFavorites.some(
            (item) =>
                item.id === id &&
                item.type.toLowerCase() === content_type.toLowerCase(),
        )

    const ISSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])
    const image = product?.image1?.split("|")[0]

    const img = image?.startsWith("http") ? image : `${config.BASE_URL}${image}`

    const isInCart =
        cartList.some(
            (item) =>
                item.product.id === product.id &&
                item.content_type_display === content_type,
        ) && isAuthenticated

    const isInLocalCart = localCart.some(
        (item) =>
            item.product.name === name &&
            item.content_type_display.toLowerCase() ===
                content_type.toLowerCase(),
    )

    const handleFAvorites = () => {
        if (isFavorites) {
            removeFavorite(product)
        } else if (!isFavorites) {
            addFavorite(product)
        }
    }

    const handleAddToCart = async () => {
        if (!isInCart && isAuthenticated) {
            await addToCart(content_type, product.id, 1, product)
        } else if (!isInLocalCart && !isAuthenticated) {
            await addToCart(content_type, product.id, 1, product)
        }
    }

    const category_type =
        content_type.toLowerCase() === "showerassembly"
            ? "plumbingfixture"
            : content_type

    return (
        <div className="max-w-[300px] min-w-[300px] max-h-[550px] min-h-[550px] flex flex-col justify-between pb-4 gap-[20px] px-3 cursor-pointer custom-shadow">
            <div className="flex items-center justify-end pt-2">
                <Heart
                    onClick={handleFAvorites}
                    className="cursor-pointer"
                    color={isFavorites ? "red" : "black"}
                    fill={isFavorites ? "red" : "transparent"}
                />
            </div>
            <div className="overflow-hidden min-h-[200px] flex items-center">
                <Image
                    src={img}
                    alt="image"
                    width={300}
                    height={300}
                />
            </div>

            <Link
                href={`/product/${category_type}/${id}`}
                className="text-[1.3rem]"
            >
                {name.length > 40 ? name.slice(0, 40) + "..." : name}
            </Link>
            <Link
                target="blank"
                href={`https://wa.me/79990019494?text=Здравствуйте, я бы хотел купить у вас подложку ${name}, мы сможем обсудить детали?`}
            >
                <div className="flex items-center justify-between  rounded-[2px] text-black hover:bg-white hover:text-black transition-all delay-150">
                    <div>
                        <span className="text-[1.3rem] text-[#474A51]">
                            {price} за рулон
                        </span>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleAddToCart}
                className={`w-full text-[1.2rem] p-4 border transition-all duration-200 ${
                    isInCart
                        ? "bg-red-500 text-white border-red-500 cursor-default"
                        : "border-[#BED1E3] hover:bg-blue-400 hover:text-white"
                }`}
                disabled={isInCart}
            >
                {isInCart ? "в корзине" : "в корзину"}
            </button>
        </div>
    )
}

export default SearchCard
