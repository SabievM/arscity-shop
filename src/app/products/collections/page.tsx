"use client"
import { CatalogType } from "@/components/shared/catalog-updates"
import CollectionCard from "@/components/shared/collection-card"
import { SceletonCard } from "@/components/shared/skeletons/sceleton"
import config from "@/utils/config"
import axios from "axios"
import React, { useEffect, useState } from "react"

const CollectionsPage = () => {
    const [collections, setCollections] = useState<CatalogType[]>([])
    useEffect(() => {
        const fetchCollectionData = async () => {
            try {
                const { data } = await axios.get(
                    `${config.BASE_URL}/api/tile/collections/`
                )
                setCollections(data.reverse())
            } catch (error) {
                console.log(error)
            }
        }
        fetchCollectionData()
    }, [])

    return (
        <div className="flex flex-col md:max-w-screen lg:w-[1370px] mx-auto mt-8 px-12 pt-3 mb-20">
            <h2 className="mx-auto text-4xl">Коллекции плиток</h2>
            <div className="flex flex-wrap gap-3 justify-between">
                {collections?.length > 0
                    ? collections.map((collection) => (
                          <div key={collection.id}>
                              <CollectionCard
                                  id={collection.id}
                                  collection={collection}
                                  name={collection.name}
                                  image1={collection.image1}
                                  number_of_elements={
                                      collection.number_of_elements
                                  }
                                  country={collection.country}
                                  content_type="collection"
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

export default CollectionsPage
