"use client"
import BigSlider from "@/components/shared/BigSlider"
import YandexMap from "@/components/shared/Map"

import SliderCollections from "@/components/shared/SliderCollections"
import About from "@/components/shared/about"
import CatalogUpdates from "@/components/shared/catalog-updates"
import CompanyServices from "@/components/shared/company-services"
import PopularProducts from "@/components/shared/popular-products"
import Services from "@/components/shared/services"

export default function Home() {
    // const {search} = useSearchStore()
    // if (search.length > 0 ) return <SearchPage/>
    return (
        <div className="">
            <BigSlider />
            <Services />
            <SliderCollections />
            <CatalogUpdates />
            <PopularProducts />
            <CompanyServices />
            <About />
            <YandexMap />
        </div>
    )
}
