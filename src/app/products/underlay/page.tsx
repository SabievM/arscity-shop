"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import ProductUnderlay from "@/components/shared/product-card-underlays"
import { useCartStore } from "../../../../store/CartStore"
import config from "@/utils/config"

export type UnderlayType = {
    id: number
    name: string
    thickness: string
    has_vapor_barrier: string
    floor_type: string
    price: number
    image1: string
    image2: string
    image3: string
    image4: string
    image5: string
    type: string
}

const Underlay = () => {
    const [underlays, setUnderlays] = useState<UnderlayType[]>([])
    const fetchCart = useCartStore((state) => state.fetchCart)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/laminate/underlays/`
                )
                setUnderlays(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="flex flex-col gap-10 md:max-w-screen lg:w-[1370px] mx-auto mt-10 px-12 pt-5 mb-20">
            <h2 className="mx-auto text-5xl">Подложка</h2>
            <div className="flex flex-wrap gap-5">
                {underlays?.length > 0
                    ? underlays.map((underlay) => (
                          <div key={underlay.id}>
                              <ProductUnderlay
                                  content_type="underlay"
                                  id={underlay.id}
                                  name={underlay.name}
                                  thickness={underlay.thickness}
                                  has_vapor_barrier={underlay.has_vapor_barrier}
                                  floor_type={underlay.floor_type}
                                  price={underlay.price}
                                  image1={underlay.image1}
                                  product={underlay}
                              />
                          </div>
                      ))
                    : new Array(6)
                          .fill(0)
                          .map((_, index) => <SceletonCard key={index} />)}
            </div>
        </div>
    )
}

export default Underlay
