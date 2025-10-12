"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import FiltersGrouts from "./_components/filterGrouts"
import config from "@/utils/config"

export type AdviceType = {
    id: number
    title: string
    description: string
}

const Advice = () => {
    const [advices, setAdvices] = useState<AdviceType[]>([])
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/advice/`
                )
                setAdvices(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    if (advices.length === 0) return null

    return (
        <div className="flex flex-col md:flex-row md:gap-5 min-h-[50vh] md:max-w-screen lg:w-[1370px] mx-auto md:mt-10 px-12 md:pt-5">
            <div className="pr-2 md:w-[25%] md:block md:max-h-[80vh] md:overflow-y-auto">
                <FiltersGrouts
                    advices={advices}
                    setSelected={setSelected}
                    selected={selected}
                />
            </div>
            <div className="md:hidden h-3 w-[100%] bg-red-500 mb-3"></div>
            <div className="flex flex-col gap-4 md:w-[75%] text-justify">
                <h2 className="text-2xl text-red-500">
                    {advices[selected]?.title}
                </h2>
                <p>{advices[selected]?.description}</p>
            </div>
        </div>
    )
}

export default Advice
