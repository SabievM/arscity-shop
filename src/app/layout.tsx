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
    metadataBase: new URL("https://ars-city.ru"),

    title: {
        default: "ArsCity — Керамическая плитка и керамогранит, сантехника",
        template: "%s | ArsCity",
    },

    description:
        "Интернет-магазин керамической плитки, керамогранита, ламината и сантехники в Чеченской Республике. Более 570 коллекций.",

    keywords: [
        "керамическая плитка",
        "керамогранит",
        "ламинат",
        "плитка",
        "сантехника",
        "Чечня",
        "Грозный",
        "Урус-Мартан",
    ],

    robots: {
        index: true,
        follow: true,
    },

    alternates: {
        canonical: "/",
    },

    openGraph: {
        title: "ArsCity",
        description: "Интернет-магазин плитки, керамогранита, сантехники",
        url: "https://ars-city.ru",
        siteName: "ArsCity",
        locale: "ru_RU",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "ArsCity",
        description: "Интернет-магазин плитки",
        images: ["/og-image.jpg"],
    },
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
                {/* <Script
                    src="https://elfsightcdn.com/platform.js"
                    strategy="lazyOnload"
                />

                <div
                    className="elfsight-app-4d106290-de79-446a-9475-0244b0b0f0a8"
                    data-elfsight-app-lazy
                /> */}
                {/* <script
                    src="//code.jivo.ru/widget/xT3ZShHePZ"
                    async
                ></script> */}
                {/* <script>
                window.replainSettings = { id:'031a33ea-7f94-4b38-9b5d-f084e792ab70' };
                (function(u){var s=document.createElement('script');s.async=true;s.src=u;
                var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
                })('https://widget.replain.cc/dist/client.js');
                </script> */}
            </body>
        </html>
    )
}
