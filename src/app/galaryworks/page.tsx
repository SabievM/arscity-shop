"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import config from "@/utils/config"
import { X } from "lucide-react"

interface GalaryType {
    id: number
    name: string
    image: string
}

const GallaeryWorks = () => {
    const [collectionNew, setCollectionNew] = useState<GalaryType[]>([])
    const [currentImage, setCurrentImage] = useState("")
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        try {
            const fetchCollectionData = async () => {
                const response = await axios.get(
                    `${config.BASE_URL}/api/tile/imagegalary/`
                )
                setCollectionNew(response.data)
            }
            fetchCollectionData()
        } catch (error) {
            console.log(error)
        }
    }, [])
    const getImage = (image: string) => {
        setOpenModal(true)
        setCurrentImage(image)
    }

    return (
        <div className="relative w-screen md:max-w-screen h-screen lg:w-[1370px] mx-auto mt-20 px1-2 pt-5 gallery z-[10000]">
            <h1></h1>
            {collectionNew.map((item) => (
                <div
                    key={item.id}
                    className="pictures"
                    onClick={() => getImage(item.image)}
                >
                    <img
                        src={item.image}
                        alt="img"
                        style={{ width: "100%" }}
                    />
                </div>
            ))}
            <div
                className={`${
                    openModal
                        ? "galleryModalImage openGalleryImage"
                        : "galleryModalImage"
                }`}
            >
                <img
                    src={currentImage}
                    alt="image"
                    className="w-auto max-w-[100%] h-auto max-h-[100%] block px-0 py-5 m-auto"
                />
                <X
                    className="absolute right-10 top-10 cursor-pointer"
                    width={52}
                    height={52}
                    onClick={() => setOpenModal(false)}
                />
            </div>
        </div>
    )
}

export default GallaeryWorks
