"use client"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

type Props = {
    open?: boolean
    setOpen: (value: boolean) => void
}

const CatalogModal: React.FC<Props> = ({ open, setOpen }) => {
    // const stopOPen = (e: React.MouseEvent<HTMLElement>) => {
    //     e.stopPropagation()
    // }
    const pathname = usePathname()
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <div
            id={"modal-catalog"}
            //onClick={(e) => stopOPen(e)}
            className={`left-5 md:left-[0px] flex flex-col md:flex-row w-[280px] md:w-[587px] p-[4] absolute ${
                open
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-4 w-0 overflow-hidden"
            } transition-all duration-300 ease-in-out top-30px md:top-[80px] z-[10000] bg-gray-500 text-white`}
        >
            <div
                className="absolute top-1 right-1 border-2 rounded-[50%] cursor-pointer hover:text-red-300 transition-all delay-100"
                id="modalCatalog"
                onClick={() => setOpen(false)}
            >
                <X />
            </div>

            <div className="flex flex-col w-[50%] p-3 gap-3 uppercase md:border-r-2">
                <Link
                    href="/products/large-format-tiles"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2"
                >
                    КРУПНЫЕ ФОРМАТЫ ПЛИТКИ
                </Link>
                <Link
                    href="/products/tile"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2 z-50"
                >
                    Керамогранит и керамическая плитка
                </Link>
                <Link
                    href="/products/grouts/"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2"
                >
                    ЗАМАЗКИ
                </Link>
            </div>
            <div className="flex flex-col w-[50%] p-3 gap-3 uppercase">
                <Link
                    href="/products/laminate"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2"
                >
                    ЛАМИНАТ
                </Link>
                <Link
                    href="/products/skirting-board"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2"
                >
                    ПЛИНТУС
                </Link>
                <Link
                    href="/products/underlay"
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer hover:text-red-400 font-bold transition-all delay-100 border-b-2"
                >
                    Подложка
                </Link>
            </div>
        </div>
    )
}

export default CatalogModal
