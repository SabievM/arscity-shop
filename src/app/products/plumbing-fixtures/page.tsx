"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import config from "@/utils/config"
import { TypePlumbingFixtures } from "@/types/typePlumbingFixtures"
import ProductPlumbingFixtures from "@/components/shared/product-card-plumbingFixtures"
import FiltersPlumbingFixtures from "./_components/FiltersPlumbingFixtures"

import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { X } from "lucide-react"
import Pagination from "@/components/shared/pagination/pagination"

const Products = () => {
    const [plumbingFixtures, setPlumbingFixtures] = useState<
        TypePlumbingFixtures[]
    >([])

    const [selectedPlumbingFixtures, setSelectedPlumbingFixtures] = useState<
        string[]
    >([])
    const [filterShow, setFilterShow] = useState(false)
    const [page, setPage] = useState(1)
    const [dataCount, setDataCount] = useState(1)

    useEffect(() => {
        const fethProduct = async () => {
            const { data } = await axios.get(
                `${config.BASE_URL}/api/sanitaryequipment/products/?page=${page}`,
                {
                    params: {
                        category: selectedPlumbingFixtures.join(","),
                    },
                },
            )
            setPlumbingFixtures(data.results)
            setDataCount(data.count)
        }
        fethProduct()
    }, [selectedPlumbingFixtures, page])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedPlumbingFixtures.includes(e.target.value)) {
            setSelectedPlumbingFixtures((prev) =>
                prev.filter((i) => i !== e.target.value),
            )
        } else {
            setSelectedPlumbingFixtures((prev) => [...prev, e.target.value])
        }
    }
    const resetFilters = () => {
        setSelectedPlumbingFixtures([])
    }

    return (
        <div className="flex gap-5 w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5">
            <button className="absolute md:hidden top-98 left-12 border px-5 py-2 bg-red-600 text-white rounded-xl">
                показать фильтры
            </button>

            <div className="pr-2 min-w-[20%] hidden md:block md:max-h-[80vh] md:overflow-y-auto">
                <FiltersPlumbingFixtures
                    handleChange={handleChange}
                    resetFilters={resetFilters}
                    selectedPlumbingFixtures={selectedPlumbingFixtures}
                />
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
                    <FiltersPlumbingFixtures
                        handleChange={handleChange}
                        resetFilters={resetFilters}
                        selectedPlumbingFixtures={selectedPlumbingFixtures}
                    />
                    <X
                        onClick={() => setFilterShow(false)}
                        className="absolute right-2 top-2"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 overflow-hidden">
                <h2 className="text-3xl uppercase font-bold w-[100%] mb-30 md:mb-5">
                    Сантехника
                </h2>
                <div className="flex flex-wrap gap-5">
                    {plumbingFixtures?.length > 0
                        ? plumbingFixtures.map((item) => (
                              <div key={item.id}>
                                  <ProductPlumbingFixtures
                                      content_type="showerassembly"
                                      id={item.id}
                                      city={item.manufacturer}
                                      imageURL={
                                          item.photos.includes("|")
                                              ? item.photos.split("|")[1]
                                              : item.photos
                                      }
                                      title={item.name}
                                      price={item.price}
                                      product={item}
                                  />
                              </div>
                          ))
                        : new Array(6)
                              .fill(0)
                              .map((_, index) => <SceletonCard key={index} />)}
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(dataCount / 50)}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default Products
