"use client"
import React from "react"
import { X } from "lucide-react"

type Props = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    resetFilters: () => void
    selectedGrouts: string[]
}

const FiltersGrouts: React.FC<Props> = ({
    handleChange,
    resetFilters,
    selectedGrouts,
}) => {
    const groutsVariety = [
        {
            id: 0,
            title: "цементный",
            value: "cement",
        },
        {
            id: 1,
            title: "эпоксидный",
            value: "epoxy",
        },
        {
            id: 2,
            title: "полимерный",
            value: "polymeric",
        },
        {
            id: 3,
            title: "полиуритановый",
            value: "polyurethane",
        },
        {
            id: 4,
            title: "силиконовый",
            value: "silicone",
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
                {groutsVariety.map((variaty) => (
                    <label
                        key={variaty.value}
                        htmlFor={variaty.value}
                        className="flex gap-3 items-center transition-all delay-100"
                    >
                        <input
                            className="hidden"
                            id={variaty.value}
                            value={variaty.value}
                            onChange={(e) => handleChange(e)}
                            type="checkbox"
                        />
                        <div
                            className={`w-[20px] h-[20px] border rounded-[2px] ${
                                selectedGrouts.includes(variaty.value)
                                    ? "bg-red-700"
                                    : ""
                            }`}
                        ></div>
                        <span
                            className={`hover:text-red-700 transition-all delay-100 ${
                                selectedGrouts.includes(variaty.value)
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

export default FiltersGrouts
