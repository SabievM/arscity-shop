import Image from "next/image"
import React from "react"
import trucksvg from "../../../public/truck.svg"
import cuttingTiles from "../../../public/codepen.svg"
import layers from "../../../public/layers.svg"
import cube from "../../../public/Group.svg"

const Services = () => {
    return (
        <div className="flex flex-col px-10 gap-10 lg:flex lg:flex-row lg:items-center lg:justify-between md:max-w-[100vw] lg:w-[1370px] lg:gap-[65px] lg:mx-auto mt-14 lg:px-12">
            <div className="flex md:flex-col lg:flex-row md:gap-[20px] gap-[35px] items-center">
                <Image
                    src={trucksvg}
                    alt="icon"
                    width={52}
                    height={43}
                />
                <div>
                    <h3>удобная доставка по Чеченской республике</h3>
                    <span className="text-gray-400">в день покупки</span>
                </div>
            </div>
            <div className="flex md:flex-col lg:flex-row md:gap-[20px] gap-[35px] items-center">
                <Image
                    src={cuttingTiles}
                    alt="icon"
                    width={52}
                    height={43}
                />
                <div>
                    <h3>резка плитки и керамогранита</h3>
                    <span className="text-gray-400">под ваш проект</span>
                </div>
            </div>
            <div className="flex md:flex-col lg:flex-row md:gap-[20px] gap-[35px] items-center">
                <Image
                    src={layers}
                    alt="icon"
                    width={52}
                    height={43}
                />
                <div>
                    <h3>монтаж плитки и укладка ламината на вашем объекте</h3>
                    <span className="text-gray-400">под ключ</span>
                </div>
            </div>
            <div className="flex md:flex-col lg:flex-row md:gap-[20px] gap-[35px] items-center">
                <Image
                    src={cube}
                    alt="icon"
                    width={52}
                    height={43}
                />
                <div>
                    <h3>3D дизайн-проект в подарок</h3>
                    <span className="text-gray-400">при покупке плитки</span>
                </div>
            </div>
        </div>
    )
}

export default Services
