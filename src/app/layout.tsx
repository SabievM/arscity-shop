import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/footer"
import Script from "next/script"

const interSans = Inter({
    variable: "--font-inter",
    subsets: ["latin", "cyrillic"],
    display: "swap",
})

const robotoSans = Roboto({
    variable: "--font-roboto",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "700"],
    display: "swap",
})

export const metadata: Metadata = {
    title: "ArsCity - Керамическая плитка и керамогранит",
    description:
        "Интернет-магазин керамической плитки и керамогранита в Чеченской Республике. Более 570 коллекций от лучших производителей.",
    keywords: [
        "плитка",
        "керамогранит",
        "керамическая плитка",
        "ламинат",
        "Чечня",
        "Урус-Мартан",
        "ArsCity",
    ],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="ru"
            className="scroll-smooth"
        >
            <body
                className={`${interSans.variable} ${robotoSans.variable} antialiased min-h-screen flex flex-col bg-white`}
            >
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Script
                    src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YMAPS_KEY}&lang=ru_RU`}
                    strategy="afterInteractive"
                />
            </body>
        </html>
    )
}
