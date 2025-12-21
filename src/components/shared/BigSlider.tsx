'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BigSliderSceleton from './big-slider-sceleton';
import Image from 'next/image';
import config from '@/utils/config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  image: string;
  title: string;
  description: string;
}

const BigSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showText, setShowText] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await axios.get(`${config.BASE_URL}/api/tile/slider/`,)
      setSlides(data)
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [slides, currentIndex])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(prev => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 700)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 700)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 700)
  }

  if (slides.length === 0) return <BigSliderSceleton/>

  return (
    <div className="relative h-[500px] md:h-[85vh] overflow-hidden bg-slate-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Image with overlay */}
            <Image
              fill
              src={slide.image}
              className="w-full h-full object-cover"
              alt={`Slide ${index}`}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-main">
                <div
                  className={`max-w-xl transition-all duration-700 delay-200 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8">
                    {!showText ? slide.description.slice(0, 120) : slide.description}
                    {slide.description.length > 120 && (
                      <button
                        onClick={() => setShowText(!showText)}
                        className="ml-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        {!showText ? "еще..." : "скрыть"}
                      </button>
                    )}
                  </p>
                  <button className="btn-primary px-8 py-4 text-lg">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-10 h-3 bg-red-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-red-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

export default BigSlider