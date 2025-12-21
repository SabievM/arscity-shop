"use client"
import React from "react"

const BigSliderSceleton = () => {
    return (
        <div className="relative w-screen h-[500px] md:h-[85vh] bg-slate-900 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />

            {/* Content skeleton */}
            <div className="absolute inset-0 flex items-center">
                <div className="container-main">
                    <div className="max-w-xl space-y-6">
                        {/* Title skeleton */}
                        <div className="h-12 md:h-16 bg-white/10 rounded-xl w-3/4 animate-pulse" />
                        <div className="h-12 md:h-16 bg-white/10 rounded-xl w-1/2 animate-pulse" />

                        {/* Description skeleton */}
                        <div className="space-y-3">
                            <div className="h-5 bg-white/10 rounded-lg w-full animate-pulse" />
                            <div className="h-5 bg-white/10 rounded-lg w-5/6 animate-pulse" />
                            <div className="h-5 bg-white/10 rounded-lg w-4/6 animate-pulse" />
                        </div>

                        {/* Button skeleton */}
                        <div className="h-14 bg-white/10 rounded-xl w-48 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Navigation arrows skeleton */}
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 animate-pulse" />
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 animate-pulse" />

            {/* Dots skeleton */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-10 h-3 bg-white/20 rounded-full" />
                <div className="w-3 h-3 bg-white/10 rounded-full" />
                <div className="w-3 h-3 bg-white/10 rounded-full" />
            </div>
        </div>
    )
}

export default BigSliderSceleton
