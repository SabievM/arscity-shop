"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { TileTypes } from "@/types/typeTiles"
import Product from "@/components/shared/product-card"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"
import Pagination from "@/components/shared/pagination/pagination"

const LargeFormatTiles = () => {
    const fetchCart = useCartStore((state) => state.fetchCart)
    const [page, setPage] = useState(1)
    const [dataCount, setDataCount] = useState(1)

    useEffect(() => {
        fetchCart()
    }, [])

    const [largeFormat, setLargeFormat] = useState<TileTypes[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/tile/tiles/?is_large_format=true`,
                )
                setLargeFormat(data.results)
                setDataCount(data.count)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [page])

    return (
        <div className="flex flex-col gap-10 md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5 mb-20">
            <h2 className="mx-auto text-3xl text-center lg:text-5xl">
                Плиты крупного формата
            </h2>
            <div>
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
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(dataCount > 50 ? dataCount / 50 : 1)}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default LargeFormatTiles
