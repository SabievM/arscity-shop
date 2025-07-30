"use client";

import { MoveRight } from "lucide-react"
import React from "react"

const Logistics = () => {
    return (
        <div className="h-[100%] md:min-h-screen md:h-[170vh]">
            <div className="w-screen bg-linear-to-b pt-30 from-[#D2D2D2] to-white md:h-[200px] -mt-20 items-center  -z-1">
            </div>
                <div className="flex flex-col mt-20 md:w-[1370px] px-12 mx-auto">
                    <div className="flex items-center gap-3 text-gray-400">
                        <span>Главная</span>
                        <MoveRight
                            color="#ee1b1b"
                            strokeWidth={1}
                        />
                        <span>Оплата и доставка</span>
                    </div>
                    <h2 className="text-3xl my-10">
                        Информация об оплате и доставке
                    </h2>
                    <div className="flex flex-col leading-8 gap-10 text-justify">
                        <p>
                            Мы осуществляем *доставку по всей России. Наш логистический партнер обеспечит быструю и надежную транспортировку груза до вашего объекта или склада. 
                        </p>
                        <h2 className="text-3xl my-10">*Условия доставки:</h2>
                        <ul className="flex flex-col gap-4">
                            <li>✔ Доставка в любой регион РФ  </li>
                            <li>✔ Возможен самовывоз со склада  </li>
                            <li>✔ Индивидуальный расчет сроков и стоимости (зависит от объема, веса и расстояния)</li>
                            <li>✔ Отслеживание груза в пути  </li>
                        </ul>
                        <h2 className="text-3xl my-10">*Способы оплаты:</h2>
                        <ul className="flex flex-col gap-4">
                            <li>💳 *Онлайн-оплата* – банковской картой (Visa, Mastercard, МИР) или через платежные системы (СБП, ЮMoney)</li>
                            <li>💰 *Наличными* – при получении груза (в зависимости от региона)</li>
                        </ul>

                        <h2 className="text-3xl my-10">Контакты</h2>
                        <p>Остались вопросы? Наши менеджеры помогут подобрать оптимальный вариант доставки и оплаты!  </p>
                        <ul className="flex flex-col gap-4">
                            <li>📞 *Звоните:* +7 999 001-94-94 </li>
                            <li>✉ *Пишите:* anzor.beno@bk.ru </li>
                            <li>🌐 Или напишите нам в онлайн чат</li>
                            Быстро, надежно, удобно – стройте с уверенностью! 🚛🔨
                        </ul>
                    </div>
                </div>
            
        </div>
    )
}

export default Logistics
