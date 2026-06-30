import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import axios from "axios"
import config from "@/utils/config"

export interface ProductType {
    id: number
    name: string
    image1?: string
    price: any
    country?: {
        name: string
        id?: number
    }
    collection?: {
        name: string
        id?: number
    }
}

export interface CartResponseItem {
    id: number
    object_id: number
    name?: string
    quantity: number
    content_type_display: string
    content_type: string
    product: ProductType
}

interface CartListStore {
    cartList: CartResponseItem[]
    totalPrice: number
    localCart: CartResponseItem[]
    fetchCart: () => Promise<void>
    fetchTotalPrice: () => Promise<void>
    addToCart: (
        content_type: string,
        object_id: number,
        quantity?: number,
        product?: ProductType,
    ) => Promise<void>
    removeFromCart: (cartItemId: number) => Promise<void>
    resetCart: () => void
    addToLocalCart: (item: Omit<CartResponseItem, "id">) => void
    removeFromLocalCart: (name: string, content_type: string) => void
    mergeCarts: () => Promise<void>
    updateLocalCartItem: (
        object_id: number,
        content_type: string,
        quantity: number,
    ) => void
}

const isClient = typeof window === "undefined"

export const useCartStore = create<CartListStore>()(
    persist(
        (set, get) => ({
            cartList: [],
            localCart: [],
            totalPrice: 0,

            fetchCart: async () => {
                if (isClient) return

                if (!localStorage.getItem("access_token")) return

                try {
                    const response = await axios.get(
                        `${config.BASE_URL}/api/order/cart/`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                            },
                        },
                    )
                    set({ cartList: response.data })
                } catch (error) {
                    console.log(error)
                }
            },

            fetchTotalPrice: async () => {
                if (isClient) return
                if (!localStorage.getItem("access_token")) {
                    const total = get().localCart.reduce(
                        (sum, item) => sum + item.product.price * item.quantity,
                        0,
                    )
                    set({ totalPrice: total })
                    return
                }

                try {
                    const response = await axios.get(
                        `${config.BASE_URL}/api/order/cart/total/`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                            },
                        },
                    )
                    set({ totalPrice: response.data.total_price })
                } catch (error) {
                    console.log(error)
                }
            },

            addToCart: async (
                content_type,
                object_id,
                quantity = 1,
                product,
            ) => {
                if (isClient) return
                const token = localStorage.getItem("access_token")

                if (!token) {
                    if (!product) {
                        console.error(
                            "Product object is required for local cart",
                        )
                        return
                    }

                    const newItem = {
                        id: Date.now(),
                        object_id,
                        quantity,
                        content_type_display: content_type,
                        content_type,
                        product,
                    }
                    set((state) => ({
                        localCart: [...state.localCart, newItem],
                    }))
                    get().fetchTotalPrice()
                    return
                }

                try {
                    await axios.post(
                        `${config.BASE_URL}/api/order/cart/`,
                        {
                            content_type,
                            object_id,
                            quantity,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )

                    const [cartRes, totalRes] = await Promise.all([
                        axios.get(`${config.BASE_URL}/api/order/cart/`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        axios.get(`${config.BASE_URL}/api/order/cart/total/`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                    ])

                    set({
                        cartList: cartRes.data,
                        totalPrice: totalRes.data.total_price,
                    })
                } catch (error) {
                    console.log(error)
                }
            },

            removeFromCart: async (cartItemId) => {
                if (isClient) return
                const token = localStorage.getItem("access_token")

                if (!token) {
                    set((state) => ({
                        localCart: state.localCart.filter(
                            (item) => item.id !== cartItemId,
                        ),
                    }))
                    get().fetchTotalPrice()
                    return
                }

                try {
                    await axios.delete(
                        `${config.BASE_URL}/api/order/cart/${cartItemId}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )

                    set((state) => ({
                        cartList: state.cartList.filter(
                            (item) => item.id !== cartItemId,
                        ),
                    }))

                    const totalRes = await axios.get(
                        `${config.BASE_URL}/api/order/cart/total/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    set({ totalPrice: totalRes.data.total_price })
                } catch (error) {
                    console.log(error)
                }
            },

            addToLocalCart: (item) => {
                set((state) => ({
                    localCart: [
                        ...state.localCart,
                        { ...item, id: Date.now() },
                    ],
                }))
                get().fetchTotalPrice()
            },

            removeFromLocalCart: (name, content_type) => {
                set((state) => ({
                    localCart: state.localCart.filter(
                        (item) =>
                            !(
                                item.product.name === name &&
                                item.content_type.toLowerCase() === content_type
                            ),
                    ),
                }))

                get().fetchTotalPrice()
            },

            updateLocalCartItem: (object_id, content_type, quantity) => {
                set((state) => ({
                    localCart: state.localCart.map((item) =>
                        item.object_id === object_id &&
                        item.content_type === content_type
                            ? { ...item, quantity }
                            : item,
                    ),
                }))
                get().fetchTotalPrice()
            },

            mergeCarts: async () => {
                if (isClient) return
                const { localCart } = get()
                if (localCart.length === 0) return

                try {
                    await Promise.all(
                        localCart.map((item) =>
                            axios.post(
                                `${config.BASE_URL}/api/order/cart/`,
                                {
                                    content_type: item.content_type,
                                    object_id: item.object_id,
                                    quantity: item.quantity,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                                    },
                                },
                            ),
                        ),
                    )

                    set({ localCart: [] })
                    await get().fetchCart()
                    await get().fetchTotalPrice()
                } catch (error) {
                    console.error("Error merging carts:", error)
                }
            },

            resetCart: () => {
                set({ cartList: [], localCart: [], totalPrice: 0 })
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ localCart: state.localCart }),
        },
    ),
)
