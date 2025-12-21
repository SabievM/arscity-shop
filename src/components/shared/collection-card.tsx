"use client"
import { Heart, Layers, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"
import React from "react"
import notImage from "../../../public/notimage.png"
import { CatalogType } from "./catalog-updates"
import { useFavorites } from "../../../store/AddToFavorites"
import Link from "next/link"

type PropsCardCollection = {
    id?: number
    country: string
    name: string
    image1: string
    number_of_elements: number | null
    collection: CatalogType
    content_type?: string
}

const CollectionCard: React.FC<PropsCardCollection> = ({
    id,
    country,
    name,
    image1,
    number_of_elements,
    content_type,
}) => {
    const { addFavorite, removeFavorite, favorites } = useFavorites()
    const isInFavorites = favorites.some(
        (fav) =>
            fav.object_id === id && fav.content_type_display === content_type
    )

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const ct = favorites.filter(
            (item) =>
                item.object_id === id &&
                item.content_type_display === content_type
        )
        if (isInFavorites) {
            removeFavorite({ id: ct[0].id })
        } else {
            if (content_type && id) {
                addFavorite({ type: content_type, id: id })
            }
        }
    }

    return (
        <div className="group w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
            {/* Image container */}
            <div className="relative h-[280px] overflow-hidden bg-gray-100">
                <Image
                    src={image1 || notImage}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-semibold">
                        <Sparkles size={12} />
                        Хит 2025
                    </span>
                </div>

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
                        {country}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <Link href={`/product/collection/${id}`}>
                    <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer uppercase">
                        {name}
                    </h3>
                </Link>

                {/* Elements count */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Layers size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {number_of_elements || 0} элементов
                            </p>
                            <p className="text-xs text-gray-500">в коллекции</p>
                        </div>
                    </div>
                    <div className="text-red-500 text-sm font-semibold">
                        Подробнее →
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard
