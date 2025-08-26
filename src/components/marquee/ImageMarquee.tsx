"use client"
import React, { useRef, useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useLocale } from "next-intl"

import styles from "./ImageMarquee.module.scss"

interface ImageItem {
  id: string | number
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  title?: string
  link?: string
  onClick?: () => void
}

interface ImageMarqueeProps {
  images: ImageItem[]
  speed?: number
  pauseOnHover?: boolean
  pauseOnClick?: boolean
  direction?: "left" | "right" | "up" | "down"
  gradient?: boolean
  gradientColor?: string
  gradientWidth?: number | string
  gap?: number
  className?: string
  imageClassName?: string
  autoFill?: boolean
}

export default function ImageMarquee({
  images,
  speed = 60,
  pauseOnHover = false,
  pauseOnClick = false,
  direction = "left",
  gradient = true, // Added default value
  gradientColor = "white", // Added default value
  gradientWidth = 100,
  gap = 20,
  className = "",
  imageClassName = "",
  autoFill = true,
}: ImageMarqueeProps) {
  const locale = useLocale()
  const marqueeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [duplicates, setDuplicates] = useState(1)

  // Determine direction based on locale
  const actualDirection = locale === "ar" ? "right" : direction

  // Calculate animation duration based on speed
  const duration = contentWidth / speed

  useEffect(() => {
    if (contentRef.current && marqueeRef.current) {
      const content = contentRef.current
      const container = marqueeRef.current
      
      // Calculate content width
      const width = content.scrollWidth
      setContentWidth(width)
      
      // Calculate how many duplicates needed for seamless loop
      if (autoFill) {
        const containerWidth = container.offsetWidth
        const duplicatesNeeded = Math.ceil(containerWidth / width) + 1
        setDuplicates(Math.max(2, duplicatesNeeded))
      }
    }
  }, [images, autoFill])

  const renderImages = () => (
    <>
      {images.map(image => (
        <div
          key={image.id}
          className={styles.imageWrapper}
          style={{ marginRight: `${gap}px` }}
        >
          <div className={`${styles.imageContent} ${imageClassName}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 200}
              height={image.height || 150}
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div 
      ref={marqueeRef}
      className={`${styles.marqueeContainer} ${className} ${styles[actualDirection]}`}
      data-pause-on-hover={pauseOnHover}
      data-pause-on-click={pauseOnClick}
    >
      {/* Gradient overlays */}
      {gradient && (
        <>
          <div 
            className={`${styles.gradient} ${styles.gradientLeft}`}
            style={{ 
              width: gradientWidth,
              background: `linear-gradient(to right, ${gradientColor}, transparent)`
            }}
          />
          <div 
            className={`${styles.gradient} ${styles.gradientRight}`}
            style={{ 
              width: gradientWidth,
              background: `linear-gradient(to left, ${gradientColor}, transparent)`
            }}
          />
        </>
      )}
      
      <div 
        className={styles.marqueeContent}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: actualDirection === "right" ? "reverse" : "normal"
        }}
      >
        <div ref={contentRef} className={styles.marqueeTrack}>
          {renderImages()}
        </div>
        
        {/* Duplicate content for seamless loop */}
        {[...Array(duplicates - 1)].map((_, index) => (
          <div key={`duplicate-${index}`} className={styles.marqueeTrack}>
            {renderImages()}
          </div>
        ))}
      </div>
    </div>
  )
}