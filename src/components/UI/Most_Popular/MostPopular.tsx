"use client"

import React, { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import styles from "./MostPopular.module.scss"
import MostPopularCard from "./Card/MostPopularCard"

import image1 from "@/../public/mostPopular/img111.png"
import image2 from "@/../public/mostPopular/img222.png"
import image3 from "@/../public/mostPopular/img333.png"
import image4 from "@/../public/mostPopular/img444.png"
import { useLocale, useTranslations } from "next-intl"

function MostPopular() {
  const t = useTranslations("MostPopular")
  const locale = useLocale()
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    if (locale === "ar") {
      setDir(document?.dir === "rtl" ? "rtl" : "ltr")
    }
  }, [locale])

  const cardContent = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
  ]

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: dir === "rtl", // 🔹 enable RTL if needed
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  })

  // ✅ Handle arrows so they “feel” natural in RTL/LTR
  const handlePrev = () => {
    if (dir === "rtl") {
      instanceRef.current?.next()
    } else {
      instanceRef.current?.prev()
    }
  }

  const handleNext = () => {
    if (dir === "rtl") {
      instanceRef.current?.prev()
    } else {
      instanceRef.current?.next()
    }
  }

  return (
    <div className={styles.container} dir={dir}>
      <div className={styles.header}>
        <h2>{t("title")}</h2>
        <div className={styles.arrows}>
          <button onClick={handlePrev} className={styles.arrowBtn}>
            ◀
          </button>
          <button onClick={handleNext} className={styles.arrowBtn}>
            ▶
          </button>
        </div>
      </div>

      <div ref={sliderRef} className={`keen-slider ${styles.cards}`}>
        {cardContent.map(card => (
          <div
            key={card.id}
            className={`keen-slider__slide ${styles.cardSlide}`}>
            <MostPopularCard cardContent={card} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MostPopular
