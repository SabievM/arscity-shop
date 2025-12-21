"use client"
import { TileFields } from "@/types/typeTiles"
import { Heart, ShoppingCart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "../../../store/CartStore"
import { useFavorites } from "../../../store/AddToFavorites"
import { useMemo } from "react"

export type TileCardFields = {
    id: number
    city: TileFields
    imageURL?: string
    title: string
    price: number
    content_type: string
    index?: number
    product?: any
}

const Product: React.FC<TileCardFields> = ({
    id,
    city,
    imageURL,
    title,
    price,
    content_type,
    product,
}) => {
    const { addToCart, cartList, localCart } = useCartStore()
    const { addFavorite, removeFavorite, favorites, localFavorites } =
        useFavorites()
    const ISINSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISINSERVER) return
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

    const handleAddToCart = async () => {
        if (!isInCart) {
            await addToCart(content_type, id, 1, {
                id,
                name: title,
                image1: imageURL,
                price,
                country: product?.country,
                collection: product.collection,
            })
        }
    }

    return (
        <div className="group bg-white rounded-2xl w-[320px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
            {/* Image container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={imageURL || "/placeholder-product.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Favorite button */}
                <button
                    onClick={handleFavoriteToggle}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isInFavorites
                            ? "bg-red-500 text-white"
                            : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                >
                    <Heart
                        size={18}
                        fill={isInFavorites ? "currentColor" : "none"}
                    />
                </button>

                {/* Country badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        <MapPin size={12} />
                        {city.name}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <Link href={`/product/${content_type}/${id}`}>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer">
                        {title}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-slate-800">
                        {price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">₽ / м²</span>
                </div>

                {/* Add to cart button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                        isInCart
                            ? "bg-green-500 text-white cursor-default"
                            : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
                    }`}
                >
                    <ShoppingCart size={18} />
                    {isInCart ? "В корзине" : "В корзину"}
                </button>
            </div>
        </div>
    )
}

export default Product
