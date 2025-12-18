"use client"
import config from "@/utils/config"
import { MoveRight } from "lucide-react"
import Link from "next/link"

const FullDetails = () => {
    const handleOpen = () => {
        window.open(`${config.BASE_URL}/api/pdf/1/preview/`, "_blank")
    }

    const handleDownload = () => {
        window.open(`${config.BASE_URL}/api/pdf/${1}/download`)
    }

    return (
        <div className="h-[100%] md:min-h-screen">
            <div className="w-screen bg-linear-to-b pt-30 from-[#D2D2D2] to-white md:h-[200px] -mt-20 items-center  -z-1"></div>
            <div className="flex flex-col w-screen md:max-w-screen lg:w-[1370px] mx-auto px-12">
                <div className="flex items-center gap-3 text-gray-400">
                    <span>Главная</span>
                    <MoveRight
                        color="#ee1b1b"
                        strokeWidth={1}
                    />
                    <span>Полные сведения</span>
                </div>
                <h2 className="text-3xl my-10">
                    ARS CITY — Ваш надёжный партнёр в мире отделочных материалов
                </h2>
                <div className="flex flex-col leading-8 gap-10 text-justify">
                    <div className="flex flex-col gap-4 ">
                        <h2 className="text-3xl">О компании</h2>
                        <p className="text-2xl">
                            ARS CITY — современная компания, специализирующаяся
                            на продаже высококачественных отделочных материалов
                            для вашего дома. Мы предлагаем широкий ассортимент
                            керамической плитки, ламината и сопутствующих
                            товаров для создания идеального интерьера.
                        </p>
                    </div>
                    <div className="w-[100%] h-2 bg-red-500"></div>
                    <div className="flex flex-col gap-4 ">
                        <h2 className="text-3xl">Ассортимент</h2>
                        <ul className="flex flex-col gap-4">
                            <li className="text-2xl">
                                1. Керамическая плитка и керамогранит различных
                                размеров и фактур, включая популярные коллекции
                                с имитацией натуральных материалов
                            </li>
                            <li className="text-2xl">
                                2. Ламинат премиального качества для любых
                                помещений
                            </li>
                            <li className="text-2xl">
                                3. Затирочные смеси профессионального уровня для
                                идеального финишного покрытия
                            </li>
                            <li className="text-2xl">
                                4. Сопутствующие материалы для монтажа и отделки
                            </li>
                        </ul>
                    </div>
                    <div className="w-[100%] h-2 bg-red-500"></div>
                    <div className="flex flex-col gap-4 ">
                        <h2 className="text-3xl">Преимущества работы с нами</h2>
                        <ul className="flex flex-col gap-4">
                            <li className="text-2xl">
                                1. Широкий выбор материалов от ведущих
                                производителей
                            </li>
                            <li className="text-2xl">
                                2. Профессиональные консультации по подбору
                                материалов
                            </li>
                            <li className="text-2xl">
                                3. Гарантия качества на весь ассортимент
                            </li>
                            <li className="text-2xl">
                                4. Доступные цены и гибкая система скидок
                            </li>
                            <li className="text-2xl">
                                4. Удобная доставка и возможность самовывоза
                            </li>
                            <li className="text-2xl">
                                4. Различные способы оплаты для вашего удобства
                            </li>
                        </ul>
                    </div>
                    <div className="w-[100%] h-2 bg-red-500"></div>
                    <div className="flex flex-col gap-4 ">
                        <h2 className="text-3xl">Почему выбирают нас</h2>
                        <p className="text-2xl">
                            Мы тщательно отбираем продукцию, чтобы предложить
                            клиентам только лучшие решения для их проектов. Наши
                            специалисты помогут:
                        </p>
                        <ul className="flex flex-col gap-4">
                            <li className="text-2xl">
                                1. Подобрать материалы, соответствующие вашим
                                пожеланиям и бюджету
                            </li>
                            <li className="text-2xl">
                                2. Рассчитать необходимое количество материалов
                            </li>
                            <li className="text-2xl">
                                3. Организовать доставку в удобное время
                            </li>
                            <li className="text-2xl">
                                4. Предоставить всю необходимую документацию
                            </li>
                        </ul>
                    </div>
                    <div className="w-[100%] h-2 bg-red-500"></div>
                    <div className="flex flex-col gap-4 ">
                        <h2 className="text-3xl">Контактная информация</h2>
                        <div className="flex flex-col md:flex-row gap-4 text-xl">
                            <span>Полное наименование компании: </span>
                            <span className="text-red-500">
                                СУПАЕВ АНЗОР ЛЕЧАЕВИЧ (ИП)
                            </span>
                        </div>
                        <div className="flex flex-row gap-4 text-xl">
                            <span>ИНН: </span>
                            <span className="text-red-500">201008809792</span>
                        </div>
                        <div className="flex flex-row gap-4 text-xl">
                            <span>e-mail: </span>
                            <span className="text-red-500">
                                anzor.beno@bk.ru
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 text-xl">
                            <span>Адрес:</span>
                            <span className="text-red-500">
                                переулок А.Шерипова, д. 6, Чеченская Республика,
                                р-н Урус-Мартановский, город Урус-Мартан
                            </span>
                        </div>
                        <div className="flex flex-row gap-4 text-xl">
                            <span>Телефон:</span>
                            <Link href="https://wa.me/79990019494">
                                +7 999 001-94-94
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 text-xl">
                            <span>Режим работы:</span>
                            <span className="text-red-500">
                                ежедневно с 9:00 до 20:00
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 text-xl">
                            <span>Публичная оферта:</span>
                            <button
                                onClick={() => handleDownload()}
                                className="text-red-500 cursor-pointer"
                            >
                                скачать
                            </button>
                            <button
                                onClick={() => handleOpen()}
                                className="text-red-500 cursor-pointer"
                            >
                                посмотреть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullDetails
