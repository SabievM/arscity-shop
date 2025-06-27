'use client';
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

export type CatalogType  = {
    id: number,
    name: string,
    scope_of_application: string,
    main_size: string,
    price: number,
    colors: string,
    pattern: string,
    formats: string,
    description: string,
    popularity_score: number,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    image5: string,
    country: string,
    number_of_elements: number,
    logo?: string
}

const CatalogUpdates = () => {

    const popularProductRef = useRef<HTMLDivElement | null>(null)

    const [collectionNew, setCollectionNew] = useState<CatalogType[]>([])

    useEffect(() => {
        try{
            const fetchCollectionData = async () => {
                const response = await axios.get("http://127.0.0.1:8000/api/tile/collections/")
                setCollectionNew(response.data.slice(-3))
            }
            fetchCollectionData()
        } catch(error){
            console.log(error);
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const scrollToref = () => {
            const hashLocation = window.location.hash
            if (hashLocation === "#new-collection" && popularProductRef.current) {
                popularProductRef.current?.scrollIntoView({behavior: "smooth"}) 
            }
        }
        if (document.readyState === 'complete') {
            setTimeout(scrollToref, 200)
        } else {
            window.addEventListener("load", scrollToref)
        }
        return () => window.removeEventListener("load", scrollToref)
        
    }, [])
    
   if (collectionNew.length === 0) return null
  return (
    <div ref={popularProductRef} id='new-collection' className='md:w-[1370px] mx-auto px-10 mb-28 flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h2 className='text-[16px] md:text-2xl font-bold relative inline-block after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 cursor-pointer uppercase'>Новинки в коллекции</h2>
            <div className='group flex items-center gap-5 text-black md:text-2xl cursor-pointer'>
                <Link href="/products/collections" className='relative inline-block after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-red-500 after:scale-x-0 after:left-0 after:bottom-0 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 pb-1 uppercase'>Все коллекции</Link>
                <button className='group-hover:scale-125 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red-600 flex items-center justify-center cursor-pointer hover:scale-[1.1] transition-all delay-100'>
                    <ArrowRight color='white' size={20}/>
                </button>
            </div>
        </div>
        <div className='flex flex-col md:flex-row items-center md:justify-between md:h-[520px] gap-4'>
            <div className='flex items-center justify-between gap-4 flex-col md:flex-[40%] h-[100%]'>
                {collectionNew.slice(0,2).map((collection) => (
                    <div className='h-[50%] w-[100%] relative cursor-pointer hover:scale-[1.02] transition-all duration-200'>
                        <Image 
                        style={{minWidth: "100%", height: "100%"}} 
                        width={300} 
                        height={400} 
                        src={collection.image1} 
                        alt='image'
                        className='object-cover'
                        />
                        <Link href={`/product/collection/${collection.id}`}>
                            <div className='absolute top-[10%] md:top-[30%] md:left-4 md:bg-gray-400/80 text-white p-5'>
                                <p>Новая эксклюзивная коллекция</p>
                                <h2 className='text-2xl text-white font-bold opacity-[1]'>{collection.name}</h2>
                                <span>{collection.country}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        
            
            <div className='w-[300px] h-[150px] md:flex-[60%] md:h-[100%] relative cursor-pointer'>
                <Link href={`/product/collection/${collectionNew[1].id}`}>
                    <div className='w-[100%] h-[100%] hover:scale-[1.02] transition-all duration-200'>
                        <Image 
                        fill
                        src={collectionNew[1].image1} 
                        alt='image'
                        className='object-cover'/>
                        <div className='absolute top-[10%] md:top-[30%] md:left-4 md:bg-gray-400/80 text-white p-5'>
                            <p>Новая эксклюзивная коллекция</p>
                            <h2 className='text-2xl font-bold opacity-[1]'>{collectionNew[1].name}</h2>
                            <span>{collectionNew[1].country}</span>
                        </div>
                    </div>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default CatalogUpdates