"use client"
import React, { useMemo } from "react"
import { useFavorites } from "../../../store/AddToFavorites"
import FavoriteCard from "@/components/shared/favorite-card"
import EmptyFavorites from "./_components/empty-favorites"

const Favorites = () => {
    const { favorites, localFavorites } = useFavorites()
    const ISSERVER = typeof window === "undefined"
    const isAuthenticated = useMemo(() => {
        if (ISSERVER) return
        return !!localStorage.getItem("access_token")
    }, [])

    if (favorites.length === 0 && localFavorites.length === 0)
        return <EmptyFavorites />
    console.log(favorites)
    return (
        <div className="flex flex-col w-screen md:max-w-screen lg:w-[1370px] mx-auto mt-8 px-12 pt-3 mb-20">
            <h2 className="mx-auto text-2xl md:text-4xl mb-4 md:mb-0">
                Избранные товары
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-3">
                {isAuthenticated
                    ? favorites.map((favorite) => (
                          <div key={favorite.id}>
                              <FavoriteCard
                                  object_id={favorite.object_id}
                                  content_type_display={
                                      favorite.content_type_display
                                  }
                                  id={favorite.id}
                                  name={favorite.name}
                                  image1={favorite.image1}
                                  price={favorite?.price}
                                  country={favorite.country}
                                  description={favorite.description}
                                  number_of_elements={
                                      favorite?.number_of_elements
                                  }
                                  product={favorite}
                              />
                          </div>
                      ))
                    : localFavorites.map((favorite) => (
                          <div key={favorite.id}>
                              <FavoriteCard
                                  object_id={favorite.object_id}
                                  content_type_display={favorite.type}
                                  id={favorite.id}
                                  name={favorite.name}
                                  image1={favorite.image1}
                                  price={favorite?.price}
                                  country={favorite.country}
                                  description={favorite.description}
                                  number_of_elements={
                                      favorite?.number_of_elements
                                  }
                                  product={favorite}
                              />
                          </div>
                      ))}
            </div>
        </div>
    )
}

export default Favorites
