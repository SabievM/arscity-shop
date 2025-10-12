"use client"
import React, { useEffect, useState } from "react"

import { useFilterStore } from "../../../../store/FiltersLaminate"
import axios from "axios"
import Product from "@/components/shared/product-card"
import { TileTypes } from "@/types/typeTiles"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import FiltersLaminatBlock from "@/components/shared/filters-laminate-block"
import { X } from "lucide-react"
import { useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"

const ProductsLaminate = () => {
    const { filters } = useFilterStore()
    const [laminates, setLaminates] = useState<TileTypes[]>([])
    const [filterShow, setFilterShow] = useState(false)
    const fetchCart = useCartStore((state) => state.fetchCart)

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
                `${config.BASE_URL}/api/laminate/laminates/?${queryString}`
            )
            setLaminates(data.results)
        }
        fethProduct()
    }, [filters])

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="flex gap-5 md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
            <button
                onClick={() => setFilterShow(!filterShow)}
                className="absolute md:hidden top-98 left-12 border px-5 py-2 bg-red-500 text-white"
            >
                показать фильтры
            </button>

            <div className="pr-2 w-[25%] hidden md:block md:max-h-[80vh] md:overflow-y-auto">
                <FiltersLaminatBlock />
            </div>

            <div
                onClick={() => setFilterShow(false)}
                className={`w-screen min-h-screen fixed top-0 ${
                    !filterShow ? "left-[-100vw]" : "left-0"
                } transition-all duration-200 bg-gray-300/50 z-[1000]`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative overflow-y-auto max-h-[80vh] px-3 top-0 left-0 bg-white w-[50%] min-h-screen z-[1000]"
                >
                    <FiltersLaminatBlock />
                    <X
                        onClick={() => setFilterShow(false)}
                        className="absolute right-2 top-2"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl uppercase font-bold w-[100%]">
                    Ламинат
                </h2>
                <div className="flex flex-wrap gap-4">
                    {laminates?.length > 0
                        ? laminates.map((laminate) => (
                              <div key={laminate.id}>
                                  <Product
                                      content_type="laminate"
                                      id={laminate.id}
                                      city={laminate.country}
                                      imageURL={laminate.image1 || ""}
                                      title={laminate.name}
                                      price={laminate.price}
                                      product={laminate}
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

export default ProductsLaminate
