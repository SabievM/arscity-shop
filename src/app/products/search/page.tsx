"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import SearchCard from "./_components/search-card"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { useSearchStore } from "../../../../store/SearchStore"
import EmptySerach from "./_components/empty-search"
import config from "@/utils/config"

export type SearchDataType = {
    type: string
    id: number
    name: string
    price: number
    image1: string
    tile_type: string
    country: string
}

const SearchPage = () => {
    const [searchData, setSearchData] = useState<SearchDataType[]>([])
    const { search } = useSearchStore()
    useEffect(() => {
        const fetchchData = async () => {
            try {
                const response = await axios.get(
                    `${config.BASE_URL}/api/search/?q=${search}`
                )
                setSearchData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchchData()
    }, [search])

    if (searchData.length == 0) return <EmptySerach />

    return (
        <div className="flex flex-col gap-10 md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5 mb-20">
            <h2 className="mx-auto text-5xl">Результаты поиска</h2>
            <div className="flex flex-wrap gap-5">
                {searchData?.length > 0
                    ? searchData.map((item) => (
                          <div key={item.id}>
                              <SearchCard
                                  content_type={item.type}
                                  id={item.id}
                                  name={item.name}
                                  price={item.price}
                                  image1={item.image1}
                                  country={item.country}
                                  product={item}
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

export default SearchPage
