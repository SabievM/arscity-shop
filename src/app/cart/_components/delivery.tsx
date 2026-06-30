import React from "react"

type Props = {
    setDelivery: (e: string) => void
    setAddressDelivery: (e: string) => void
    delivery: string
}

const Delivery: React.FC<Props> = ({
    setDelivery,
    setAddressDelivery,
    delivery,
}) => {
    return (
        <div className="md:mt-20">
            <h2 className="md:text-2xl mb-5">Информация о доставке</h2>

            <div className="flex flex-col md:flex-row md:gap-20 md:items-center">
                <div className="flex flex-col gap-1 flex-1/4">
                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="delivery"
                            id="delivery"
                            value="delivery"
                            checked={delivery === "delivery"}
                            onChange={(e) => setDelivery(e.target.value)}
                            className="accent-blue-500"
                        />
                        <label htmlFor="delivery">
                            Доставка со склада на ваш объект
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="delivery"
                            id="pickup"
                            value="pickup"
                            checked={delivery === "pickup"}
                            onChange={(e) => setDelivery(e.target.value)}
                            className="accent-blue-500"
                        />
                        <label htmlFor="pickup">Самовывоз со склада</label>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center p-2 gap-4 bg-[#F4F4F4]">
                    {delivery === "delivery" && (
                        <div className="md:w-[504px] h-[36px] bg-white text-[0.8rem] relative">
                            <input
                                type="text"
                                placeholder="Укажите адрес доставки"
                                onChange={(e) =>
                                    setAddressDelivery(e.target.value)
                                }
                                className="w-full h-full pl-2 focus:outline-none"
                            />
                        </div>
                    )}

                    <div className="flex flex-col text-[0.8rem]">
                        <span>Доставка по Урус-Мартану - бесплатно</span>
                        <span>
                            Доставка за пределы Урус-Мартана - 20 рублей/км
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delivery
