"use client"

import { useEffect } from "react"

declare global {
    interface Window {
        ymaps: any
    }
}

export default function YandexMap() {
    useEffect(() => {
        const initMap = () => {
            window.ymaps.ready(() => {
                const map = new window.ymaps.Map("map", {
                    center: [43.143288, 45.557557],
                    zoom: 18,
                })

                // 📍 МЕТКА
                const placemark = new window.ymaps.Placemark(
                    [43.143288, 45.557557], // координаты
                    {
                        balloonContent: "Ars-city",
                    },
                    {
                        preset: "islands#redIcon", // стиль
                    }
                )

                map.geoObjects.add(placemark)
                placemark.events.add("click", () => {
                    window.open(
                        "https://yandex.ru/maps/?pt=45.557557,43.143288&z=16",
                        "_blank"
                    )
                })
            })
        }

        if (window.ymaps) {
            initMap()
        } else {
            const interval = setInterval(() => {
                if (window.ymaps) {
                    initMap()
                    clearInterval(interval)
                }
            }, 100)
        }
    }, [])

    return (
        <div
            id="map"
            style={{ width: "100%", height: "400px" }}
        />
    )
}
