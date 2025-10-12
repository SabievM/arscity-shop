"use client"
import React, { useEffect, useState } from "react"
import FiltersTile from "@/components/shared/filters-tile"
import { useFilterStore } from "../../../../store/FiltersTile"
import axios from "axios"
import Product from "@/components/shared/product-card"
import { TileTypes } from "@/types/typeTiles"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { X } from "lucide-react"
import { useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"

const Products = () => {
    const { filters } = useFilterStore()
    const [tiles, setTiles] = useState<TileTypes[]>([])
    const [filterShow, setFilterShow] = useState(false)
    const fetchCart = useCartStore((state) => state.fetchCart)

    useEffect(() => {
        fetchCart()
    }, [])

    useEffect(() => {
        const query = new URLSearchParams()
        Object.entries(filters).forEach(([key, values]) => {
            if (key === "price") {
                if (filters.price.min)
                    query.append("price_min", filters.price.min)
                if (filters.price.max)
                    query.append("price_max", filters.price.max)
            } else if (Array.isArray(values) && values.length > 0) {
                const ids = values.map((v) => v.id).join(",")
                query.append(key, ids)
            }
        })
        const queryString = query.toString()
        const fethProduct = async () => {
            const { data } = await axios.get(
                `${config.BASE_URL}/api/tile/tiles/?${queryString}`
            )
            setTiles(data.results)
        }
        fethProduct()
    }, [filters])

    const arr = [100, 200, 300, 400]
    console.log(arr)
    for (const num of arr) {
        console.log(num)
    }

    return (
        <div className="flex gap-5 w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
            <button
                onClick={() => setFilterShow(!filterShow)}
                className="absolute md:hidden top-98 left-12 border px-5 py-2 bg-red-500 text-white"
            >
                показать фильтры
            </button>

            <div className="pr-2 min-w-[20%] hidden md:block md:max-h-[80vh] md:overflow-y-auto">
                <FiltersTile />
            </div>

            <div
                onClick={() => setFilterShow(false)}
                className={`w-screen md:hidden lg:hidden min-h-screen fixed top-0 ${
                    !filterShow ? "left-[-100vw]" : "left-0"
                } transition-all duration-200 bg-gray-300/50 z-[1000]`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative overflow-y-auto max-h-[80vh] px-3 top-0 left-0 bg-white w-[50%] min-h-screen z-[1000]"
                >
                    <FiltersTile />
                    <X
                        onClick={() => setFilterShow(false)}
                        className="absolute right-2 top-2"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-3xl uppercase font-bold w-[100%]">
                    Керамическая плитка и керамогранит
                </h2>
                <div className="flex flex-wrap gap-4">
                    {tiles?.length > 0
                        ? tiles.map((tile) => (
                              <div key={tile.id}>
                                  <Product
                                      content_type="tile"
                                      id={tile.id}
                                      city={tile.country}
                                      imageURL={tile.image1 || ""}
                                      title={tile.name}
                                      price={tile.price}
                                      product={tile}
                                  />
                              </div>
                          ))
                        : new Array(6)
                              .fill(0)
                              .map((_, index) => <SceletonCard key={index} />)}
                </div>
            </div>
        </div>
    )
}

export default Products
