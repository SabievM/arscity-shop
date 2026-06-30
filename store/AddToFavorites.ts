import { LaminateTypes } from "@/types/typeLaminate"
import { TileTypes } from "@/types/typeTiles"
import config from "@/utils/config"
import axios from "axios"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type FavoritesType = {
    id: number
    object_id: number
    name: string
    image1: string
    price?: number
    country?: {
        name: string
    }
    description?: string
    number_of_elements?: number
    content_type_display: string
    type: string
    local_id?: string
    collection?: {
        name: string
    }
}

type StoreFavorites = {
    favorites: FavoritesType[]
    localFavorites: FavoritesType[]
    fetchFavorites: () => void
    addFavorite: (item: any) => void
    removeFavorite: (params: { id?: number; local_id?: string }) => void
    mergeFavorites: () => Promise<void>
}

const isClient = typeof window === "undefined"

export const useFavorites = create<StoreFavorites>()(
    persist(
        (set, get) => ({
            favorites: [],
            localFavorites: [],

            fetchFavorites: async () => {
                if (isClient) return

                const token = localStorage.getItem("access_token")
                if (!token) return

                try {
                    const response = await axios.get(
                        `${config.BASE_URL}/api/order/favorites/`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    )
                    set({ favorites: response.data })
                } catch (error) {
                    console.log(error)
                }
            },

            addFavorite: async (item) => {
                if (isClient) return
                const token = localStorage.getItem("access_token")

                // Функция для получения первого изображения
                const getFirstImage = (item: any) => {
                    const raw = item.photos || item.image1 || ""
                    if (raw.includes("|")) {
                        return raw.split("|")[0]
                    }
                    return raw
                }

                if (token) {
                    try {
                        const response = await axios.post(
                            `${config.BASE_URL}/api/order/favorites/`,
                            {
                                content_type: item.type,
                                object_id: item.id,
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        )
                        set({ favorites: [...get().favorites, response.data] })
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    const localItem = {
                        ...item,
                        local_id: Date.now().toString(),
                        image1: getFirstImage(item),
                    }
                    set({
                        localFavorites: [...get().localFavorites, localItem],
                    })
                }
            },
            removeFavorite: async (product) => {
                if (isClient) return
                const token = localStorage.getItem("access_token")

                if (token && product.id) {
                    try {
                        await axios.delete(
                            `${config.BASE_URL}/api/order/favorites/${product.id}/`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        )
                        set({
                            favorites: get().favorites.filter(
                                (fav) => fav.id !== product.id,
                            ),
                        })
                    } catch (error) {
                        console.log(error)
                    }
                } else if (product.local_id) {
                    set({
                        localFavorites: get().localFavorites.filter(
                            (fav) => fav.local_id !== product.local_id,
                        ),
                    })
                }
            },

            mergeFavorites: async () => {
                if (isClient) return
                const { localFavorites } = get()
                const token = localStorage.getItem("access_token")
                if (!token || localFavorites.length === 0) return

                const successfulItems: FavoritesType[] = []

                for (const item of localFavorites) {
                    try {
                        await axios.post(
                            `${config.BASE_URL}/api/order/favorites/`,
                            {
                                content_type: item.type,
                                object_id: item.id,
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        )
                        successfulItems.push(item)
                    } catch (error) {
                        console.error("Ошибка синхронизации:", item, error)
                    }
                }

                set((state) => ({
                    localFavorites: state.localFavorites.filter(
                        (item) => !successfulItems.includes(item),
                    ),
                }))

                get().fetchFavorites()
            },
        }),
        {
            name: "favorite-storage",
        },
    ),
)
