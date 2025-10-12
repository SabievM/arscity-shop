import Image from "next/image"
import React from "react"
import emptySerach from "../../../../../public/emptySerach.svg"
import Link from "next/link"

const EmptySerach = () => {
    return (
        <div className="md:max-w-screen lg:w-[1380px] px-4 md:p-0 md:px-12 md:mt-20 flex flex-col mx-auto h-[80vh] ">
            <h2 className="text-5xl mb-5">
                По вашему запросу ничего не найдено
            </h2>
            <div className="flex w-[100%] justify-center">
                <Image
                    src={emptySerach}
                    alt="cart"
                    width={800}
                    height={600}
                />
            </div>
            <p>
                Если вы ранее оформляли заказ, вы сможете его увидеть в{" "}
                <Link
                    href="/profile"
                    className="text-blue-600"
                >
                    личном кабинете
                </Link>
            </p>
        </div>
    )
}

export default EmptySerach
