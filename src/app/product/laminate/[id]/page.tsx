'use client';
import { ArrowLeft, ArrowRight, CreditCard, ImageOff, Landmark, Wallet } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Services from '@/components/shared/services'
import { LaminateTypes } from '@/types/typeLaminate';
import axios from 'axios'
import { useCartStore } from '../../../../../store/CartStore';
import { useFavorites } from '../../../../../store/AddToFavorites';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import config from '@/utils/config';
import Link from 'next/link';

const LaminatePage = () => {
    const [laminate, setLaminate] = useState<LaminateTypes>()
    const [quantity, setQuantity] = useState(1)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [indexLaminate, setIndexLaminate] = useState(0)

    const { addToCart, removeFromCart, cartList, localCart } = useCartStore()
    const { addFavorite, removeFavorite, favorites, localFavorites } = useFavorites()
    const isAuthenticated = !!localStorage.getItem('access_token');
    
    useEffect(() => {
        const id = window.location.pathname.split("/").pop()
        try {
            const fetchData = async () => {
                const response = await axios.get(`${config.BASE_URL}/api/laminate/laminates/${id}`)
                setLaminate(response.data)
            }
            fetchData()
        } catch (error) {
            console.log(error);

        }
    }, [])
        
    const isInCart = isAuthenticated 
    ? cartList.some(item => item.object_id === laminate?.id && item.content_type_display === laminate?.type)
    : localCart.some(item => item.object_id === laminate?.id && item.content_type === laminate?.type);

    const isInFavorites = favorites.some(fav => fav.object_id === laminate?.id && fav.content_type_display === laminate?.type) || localFavorites.some(item => item.id === laminate?.id && item.type === laminate?.type);
    console.log(laminate);
    
    const handleFavoriteToggle = () => {
        const selectedFavorites = favorites.filter(item => item.object_id === laminate?.id && item.content_type_display === laminate?.type);
        const selectedFavoritesLocalStorage = localFavorites.filter(item => item.id === laminate?.id && item.type === laminate?.type);
        console.log(selectedFavoritesLocalStorage);
        
        if (isInFavorites) {
            if (isAuthenticated) {
                removeFavorite(selectedFavorites[0]);
            } else {
                removeFavorite(selectedFavoritesLocalStorage[0]);
            }
        } else {
            addFavorite(laminate);
        }
    };

    const handleAddToCart = async () => {
        if (!isInCart) {
            await addToCart(
                laminate.type, 
                laminate.id, 
                quantity, 
                laminate
            );
        }
    };

    const scrollLeft = () => {
            if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
        }
    }
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
        }
    }

    const imagesArr = useMemo(() => {
        if(!laminate) {
            return Array(5).fill('');
        }
        return [ laminate.image1, laminate.image2, laminate.image3, laminate.image4, laminate.image5 ];

    }, [laminate?.id, !!laminate])


    if (!laminate) return null


    return (
        <div className='flex flex-col gap-4'>
            <Breadcrumbs 
                name={"Ламинат"}
                title={laminate.name}
                handleFavoriteToggle={handleFavoriteToggle}
                isInFavorites={isInFavorites}
            />
            <div className='flex flex-col justify-between gap-10 w-screen md:w-[1370px] mx-auto px-10 md:px-12'>
                <div className='flex flex-col md:flex-row gap-6 md:justify-between md:items-start'>
                    <div className='relative flex flex-col items-center bg-[#F6F6F6]'>
                        <div className='flex overflow-hidden justify-center md:w-[666px] md:h-[580px]'>
                            <Image 
                                src={imagesArr[indexLaminate]} 
                                width={666}
                                height={400}
                                alt='Imagelaminate'
                                className='object-contain'
                            />
                        </div>
                        
                        
                        {laminate.discount ? (
                            <div className='absolute top-3 -right-5 py-2 px-3.5 bg-red-500 text-white'>
                                <span className='relative after:content-[""] after:absolute after:top-[30px] after:-right-[14px] after:border-t-[10px] after:border-r-[20px] after:border-t-[#6D6D6D] after:border-r-transparent'>скидка {laminate.discount}%</span>
                            </div>
                        ) : (
                            <div className='absolute hidden top-3 -right-5 py-2 px-3.5 bg-red-500 text-white'>
                                <span className='relative after:content-[""] after:absolute after:top-[30px] after:-right-[14px] after:border-t-[10px] after:border-r-[20px] after:border-t-[#6D6D6D] after:border-r-transparent'>скидка</span>
                            </div>    
                        )}

                        <div className="py-5 w-[85vw] bg-white md:w-[100%] flex gap-4 items-center">
                            <button
                                onClick={scrollLeft}
                                className="flex items-center justify-center w-[40px] bg-gray-400 h-[103px] text-red-500 hover:scale-110 transition-all duration-200"
                            >
                                <ArrowLeft />
                            </button>
                            <div
                                ref={scrollRef}
                                className="w-full flex overflow-x-auto scroll-hidden"
                            >
                                <div className="inline-flex gap-4">
                                    {Array(5)
                                        .fill("")
                                        .map((_, index) => {
                                            if(!imagesArr[index]) return 
                                            <div 
                                                key={index}
                                                className='pointer-events-none flex items-center justify-center w-[130px] h-[103px] border border-gray-300'><ImageOff/>
                                            </div>;
                                            return <div
                                                key={index}
                                                onClick={() =>
                                                    setIndexLaminate(
                                                        index
                                                    )
                                                }
                                                className={`relative flex items-center justify-between w-[130px] h-[103px] cursor-pointer${
                                                    index + 1 !==
                                                    indexLaminate
                                                        ? "bg-gray-300"
                                                        : ""
                                                }`}
                                            >
                                                <Image
                                                    fill
                                                    src={
                                                        imagesArr[index]
                                                    }
                                                    alt="imageSlide"
                                                    className='cursor-pointer'
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <button
                                onClick={scrollRight}
                                className="flex items-center justify-center w-[40px] bg-gray-400 h-[103px] text-red-500 hover:scale-110 transition-all duration-200"
                            >
                                <ArrowRight />
                            </button>
                        </div>

                    </div>

                    <div className='flex flex-col justify-between md:w-[45%] h-[500px] pr-2'>
                        <div className='flex gap-4 md:gap-10 items-end mt-8'>
                            <div className='relative flex items-center justify-center w-[330px] h-[147px] border border-gray-400 '>
                                <span className='uppercase text-3xl text-blue-500 bold'>ARS-CITY</span>
                            </div>
                        </div>
                        <div className='flex items-center mb-4 md:mb-0 gap-5 mt-10'>
                            <div className='flex justify-between px-3 py-1 md:h-15 md:text-2xl bg-[#E9E9E9] w-[50%]'>
                                <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)} className='w-15 cursor-pointer bg-white'>-</button>
                                <input onChange={(e) => setQuantity(+e.target.value)} type="text" value={quantity} className='focus:outline-none w-20 text-center' />
                                <button onClick={() => setQuantity(prev => prev + 1)} className='w-15 cursor-pointer bg-white'>+</button>
                            </div>
                            <div className='md:text-2xl flex justify-between px-3 py-1 md:h-15 bg-[#E9E9E9] w-[25%]'>
                                <button className='w-[55px] bg-white'>м²</button>
                                <button className='w-[55px] bg-white hidden'>шт.</button>
                            </div>
                        </div>
                        <div className='flex gap-4 mb-4 md:mb-0 md:text-2xl'>
                            <span>Итоговая цена: </span>
                            <span>{laminate.price * quantity} руб.</span>
                        </div>
                        <div className='flex flex-col md:flex-row mb-4 md:mb-0 gap-3 items-center justify-between w-[100%]'>
                            <button onClick={handleAddToCart} className={`border-2 hover:bg-blue-500 hover:border-blue-500  hover:text-white transition-all duration-200 py-2 px-10 w-[100%] md:w-[50%] ${isInCart ? "bg-red-500 border-white text-white" : ""}`}>{!isInCart ? "+  добавить в корзину" : "Добавлено в корзину"}</button>
                            {isInCart ? (
                                <button className={`border-2 hover:bg-blue-500 hover:border-blue-500 bg-red-500 border-red-500 text-white hover:text-white transition-all duration-200 py-2 px-10 w-[100%] md:w-[50%]`}>
                                    <Link href='/cart'><span>Перейти в корзину</span></Link>
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className='md:flex items-center gap-2 justify-between'>
                            <div>Оплата: </div>
                            <div className='flex gap-1'>
                                <Wallet color="#ee1b1b" strokeWidth={1} />
                                <span>наличные</span>
                            </div>
                            <div className='flex gap-1'>
                                <CreditCard color="#ee1b1b" strokeWidth={1} />
                                <span>карта</span>
                            </div>
                            <div className='flex gap-1'>
                                <Landmark color="#ee1b1b" strokeWidth={1} />
                                <span>банковский перевод</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between  w-[100%] px-10 py-10 my-14 bg-[#F6F6F6]'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Оттенок:</span>
                            <span>{laminate.tone?.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Блеск:</span>
                            <span>{laminate.gloss?.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Цвет:</span>
                            <span>{laminate.color?.name}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Рисунок ламината</span>
                            <span>{laminate.laminate_pattern?.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Размер</span>
                            <span>{laminate.board_dimensions.name} см</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Порода дерева</span>
                            <span>{laminate.wood_type?.name}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Особенности ламината</span>
                            <span>{laminate.water_resistance?.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Страна</span>
                            <span>{laminate.country.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Фаска</span>
                            <span>{laminate.chamfer?.name}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Поверхность</span>
                            <span>{laminate.texture?.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Форма</span>
                            {/* <span>{laminate.form?.name}</span> */}
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-400'>Стиль</span>
                            {/* <span>{laminate.style?.name}</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <Services />
        </div>
    )
}

export default LaminatePage