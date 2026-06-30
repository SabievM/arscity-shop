"use client"
import React from "react"
import { X } from "lucide-react"

type Props = {
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => void
    resetFilters: () => void
    selectedPlumbingFixtures: string[]
}

const FiltersPlumbingFixtures: React.FC<Props> = ({
    handleChange,
    resetFilters,
    selectedPlumbingFixtures,
}) => {
    const plumbingFixturesVariety = [
        {
            id: 0,
            title: "Душевая группа",
            value: "shower",
        },
        {
            id: 1,
            title: "Мойки кухонные",
            value: "kitchen_sinkminum",
        },
        {
            id: 2,
            title: "Сопутствующие товары",
            value: "Related products",
        },
        {
            id: 3,
            title: "Мебель",
            value: "Furniture",
        },
        {
            id: 4,
            title: "Санфаянс",
            value: "Sanitary_ceramics",
        },
        {
            id: 5,
            title: "Смесители. Душевые стойки",
            value: "Faucets",
        },
    ]
    return (
        <div className="flex flex-col gap-5 pb-5 mb-10 mt-10">
            <>
                <div className="flex items-center gap-3">
                    <span>Фильтры</span>
                    <div
                        onClick={() => resetFilters()}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <span>Сбросить</span>
                        <X
                            size={16}
                            color="red"
                        />
                    </div>
                </div>
                {plumbingFixturesVariety.map((variaty, index) => (
                    <label
                        key={variaty.value}
                        htmlFor={variaty.value}
                        className="flex gap-3 items-center transition-all delay-100"
                    >
                        <input
                            className="hidden"
                            id={variaty.value}
                            value={variaty.title}
                            onChange={(e) => handleChange(e, index)}
                            type="checkbox"
                        />
                        <div
                            className={`w-[20px] h-[20px] border rounded-[2px] ${
                                selectedPlumbingFixtures.includes(variaty.title)
                                    ? "bg-red-700"
                                    : ""
                            }`}
                        ></div>
                        <span
                            className={`hover:text-red-700 transition-all delay-100 ${
                                selectedPlumbingFixtures.includes(variaty.title)
                                    ? "text-red-700 font-bold"
                                    : "text-gray-700"
                            }`}
                        >
                            {variaty.title}
                        </span>
                    </label>
                ))}
            </>
        </div>
    )
}

export default FiltersPlumbingFixtures
