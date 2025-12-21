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
    image1,
    product,
}) => {
    const img = `${config.BASE_URL}${image1}`
    const { addToCart, cartList, localCart } = useCartStore()
    const { addFavorite, removeFavorite, favorites, localFavorites } =
        useFavorites()
    const ISSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])

    const isInCart = isAuthenticated
        ? cartList.some(
              (item) =>
                  item.object_id === id &&
                  item.content_type_display === content_type
          )
        : localCart.some(
              (item) =>
                  item.object_id === id && item.content_type === content_type
          )

    const isInFavorites =
        favorites.some(
            (fav) =>
                fav.object_id === id &&
                fav.content_type_display === content_type
        ) ||
        localFavorites.some(
            (item) => item.id === id && item.type === content_type
        )

    const handleFavoriteToggle = () => {
        const selectedFavorites = favorites.filter(
            (item) =>
                item.object_id === id &&
                item.content_type_display === content_type
        )
        const selectedFavoritesLocalStorage = localFavorites.filter(
            (item) => item.id === id && item.type === content_type
        )

        if (isInFavorites) {
            if (isAuthenticated) {
                removeFavorite(selectedFavorites[0])
            } else {
                removeFavorite(selectedFavoritesLocalStorage[0])
            }
        } else {
            addFavorite(product)
        }
    }
    console.log(image1)

    const handleAddToCart = async () => {
        if (!isInCart) {
            await addToCart(content_type, id, 1, {
                id,
                name: name,
                image1: image1,
                price,
            })
        }
    }
    return (
        <div className="max-w-[300px] min-w-[300px] max-h-[550px] min-h-[550px] flex flex-col justify-between pb-4 gap-[20px] px-3 cursor-pointer custom-shadow">
            <div className="flex items-center justify-end pt-2">
                <Heart
                    onClick={handleFavoriteToggle}
                    className="cursor-pointer"
                    color={isInFavorites ? "red" : "black"}
                    fill={isInFavorites ? "red" : "transparent"}
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
                href={`/product/${content_type}/${id}`}
                className="text-[1.3rem]"
            >
                {name}
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
