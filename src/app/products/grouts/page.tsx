"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import { useCartStore } from "../../../../store/CartStore"
import FiltersGrouts from "./_components/filterGrouts"
import GroutsCard from "@/components/shared/grouts-card"
import { X } from "lucide-react"
import config from "@/utils/config"

export type GroutsType = {
    id: number
    name: string
    color: string
    typematerial: string
    price: number
    image1: string
    image2: string
    image3: string
    image4: string
    image5: string
    type: string
}

const Grouts = () => {
    const [grouts, setGrouts] = useState<GroutsType[]>([])
    const fetchCart = useCartStore((state) => state.fetchCart)
    const [selectedGrouts, setSelectedGrouts] = useState<string[]>([])
    const [filterShow, setFilterShow] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/tile/grouts/`,
                    {
                        params: {
                            typematerial: selectedGrouts.join(","),
                        },
                    }
                )
                setGrouts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [selectedGrouts])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(
            e.target.value,
            selectedGrouts.includes(e.target.value),
            selectedGrouts
        )

        if (selectedGrouts.includes(e.target.value)) {
            setSelectedGrouts((prev) =>
                prev.filter((i) => i !== e.target.value)
            )
        } else {
            setSelectedGrouts((prev) => [...prev, e.target.value])
        }
    }
    const resetFilters = () => {
        setSelectedGrouts([])
    }

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

            <div className="pr-2 w-[20%] hidden md:block md:max-h-[80vh] md:overflow-y-auto">
                <FiltersGrouts
                    handleChange={handleChange}
                    resetFilters={resetFilters}
                    selectedGrouts={selectedGrouts}
                />
            </div>

            <div
                onClick={() => setFilterShow(false)}
                className={`w-screen min-h-screen fixed top-0 ${
                    !filterShow ? "left-[-100vw]" : "left-0"
                } transition-all duration-200 bg-gray-300/50 z-[100]`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative overflow-y-auto max-h-[80vh] px-3 top-0 left-0 bg-white w-[50%] min-h-screen z-[1000]"
                >
                    <FiltersGrouts
                        handleChange={handleChange}
                        resetFilters={resetFilters}
                        selectedGrouts={selectedGrouts}
                    />
                    <X
                        onClick={() => setFilterShow(false)}
                        className="absolute right-2 top-2"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-5">
                {grouts?.length > 0
                    ? grouts.map((grout) => (
                          <div key={grout.id}>
                              <GroutsCard
                                  id={grout.id}
                                  name={grout.name}
                                  color={grout.color}
                                  typematerial={grout.typematerial}
                                  price={grout.price}
                                  image1={grout.image1}
                                  content_type="grout"
                                  product={grout}
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

export default Grouts
