import axios from "axios"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type FavoritesType = {
    id: number,
    object_id: number,
    name: string,
    image1: string,
    price?: number,
    country?: string,
    description?: string,
    number_of_elements?: number,
    content_type_display: string,
}

type StoreFavorites = {
    favorites: FavoritesType[],
    fetchFavorites: () => void,
    addFavorite: (content_type: string, object_id: number) => void,
    removeFavorite: (favoriteId: number) => void,
}

export const useFavorites = create<StoreFavorites>()(
    persist(
        (set, get) => ({
            favorites: [],

            fetchFavorites: async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/order/favorites/", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    set({ favorites: response.data });
                } catch (error) {
                    console.log(error);
                }
            },

            addFavorite: async (content_type, object_id) => {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/order/favorites/", {
                        content_type,
                        object_id
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    set({ favorites: [...get().favorites, response.data] });
                } catch (error) {
                    console.log(error);
                }
            },

            removeFavorite: async (favoriteId) => {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/order/favorites/${favoriteId}/`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    set({ favorites: get().favorites.filter(fav => fav.id !== favoriteId) });
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        {
            name: 'favorite-storage'
        }
    )
)