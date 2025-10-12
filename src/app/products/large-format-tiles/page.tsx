"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { TileTypes } from "@/types/typeTiles"
import Product from "@/components/shared/product-card"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"

const LargeFormatTiles = () => {
    const fetchCart = useCartStore((state) => state.fetchCart)

    useEffect(() => {
        fetchCart()
    }, [])

    const [largeFormat, setLargeFormat] = useState<TileTypes[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/tile/tiles/?is_large_format=true`
                )
                setLargeFormat(data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col gap-10 md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5 mb-20">
            <h2 className="mx-auto text-3xl text-center lg:text-5xl">
                Плиты крупного формата
            </h2>
            <div className="flex flex-wrap gap-5">
                {largeFormat?.length > 0
                    ? largeFormat.map((tile) => (
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
    )
}

export default LargeFormatTiles
