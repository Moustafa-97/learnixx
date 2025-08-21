import React from "react"
import Image, { StaticImageData } from "next/image"
import Marquee from "react-fast-marquee"

import styles from "./ImageMarquee.module.scss"
import { useLocale } from "next-intl"

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
  // gradient = true,
  // gradientColor = "#ffffff",
  gradientWidth = 100,
  gap = 20,
  className = "",
  imageClassName = "",
  autoFill = true,
}: ImageMarqueeProps) {
  // const handleImageClick = (image: ImageItem) => {
  //   if (image.onClick) {
  //     image.onClick()
  //   } else if (image.link) {
  //     window.open(image.link, "_blank")
  //   }
  // }
  const locale = useLocale()
  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      <Marquee
        speed={speed}
        pauseOnHover={pauseOnHover}
        pauseOnClick={pauseOnClick}
        direction={locale !== "ar" ? direction : "right"}
        // gradient={gradient}
        // gradientColor={gradientColor}
        gradientWidth={gradientWidth}
        autoFill={autoFill}>
        {images.map(image => (
          <div
            key={image.id}
            className={styles.imageWrapper}
            style={{ marginRight: `${gap}px` }}
            // onClick={() => handleImageClick(image)}
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
      </Marquee>
    </div>
  )
}
