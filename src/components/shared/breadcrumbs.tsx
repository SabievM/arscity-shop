import { Heart, MoveRight } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
    name: string
    title: string
    handleFavoriteToggle: () => void
    isInFavorites: boolean
    category: string
    url: string
}

const Breadcrumbs: React.FC<Props> = ({
    name,
    title,
    handleFavoriteToggle,
    isInFavorites,
    category,
    url,
}) => {
    console.log(category, url)

    return (
        <div className="w-screen bg-linear-to-b from-[#D2D2D2] to-white md:h-[317px] -mt-20 flex items-center pt-20 z-1">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:w-[1370px] mx-auto px-10 md:px-12">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-gray-400">
                        <Link href="/">Главная</Link>
                        <MoveRight
                            color="#ee1b1b"
                            strokeWidth={1}
                        />
                        <Link href={url}>{category}</Link>
                        <MoveRight
                            color="#ee1b1b"
                            strokeWidth={1}
                        />
                        <span>{name}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl">{title}</h1>
                </div>

                <button
                    onClick={handleFavoriteToggle}
                    className={`${
                        isInFavorites ? "text-white bg-red-500" : ""
                    } flex md:gap-3 items-center justify-center py-4 gap-4 border border-gray-400 md:py-4 px-15 uppercase hover:bg-red-500 hover:text-white hover:border-none transition-all duration-200 z-50`}
                >
                    <Heart />
                    <span>
                        {isInFavorites
                            ? "Удалить из избранных"
                            : "ДОБАВИТЬ в избранное"}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Breadcrumbs
