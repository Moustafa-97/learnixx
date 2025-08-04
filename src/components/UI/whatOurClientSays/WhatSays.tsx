"use client"
import React, { useState, useEffect, useCallback } from "react"
import styles from "./WhatSays.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
// import { useTranslations } from "next-intl"

function WhatSays() {
  //   const t = useTranslations("whatSays")
  const [currentSlide, setCurrentSlide] = useState(0)

  const whatSays = [
    {
      id: 1,
      name: "John Doe",
      job: "UI/UX Designer",
      text: "Lorem1111 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae",
    },
    {
      id: 2,
      name: "John Doe2",
      job: "UI/UX Designer",
      text: "Lorem2222 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae",
    },
    {
      id: 3,
      name: "John Doe3",
      job: "UI/UX Designer",
      text: "Lorem3333 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae",
    },
  ]

  // Navigate to next slide (infinite)
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % whatSays.length)
  }, [whatSays.length])

  // Navigate to previous slide (infinite)
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + whatSays.length) % whatSays.length)
  }, [whatSays.length])

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [nextSlide])

  const currentItem = whatSays[currentSlide]

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>What Our Client Says</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.slider}>
            <div className={styles.slideContent}>
              <div className={styles.details}>
                <p>{currentItem.name}</p>
                <p>.</p>
                <span>{currentItem.job}</span>
              </div>
              <div className={styles.testimonialContent}>
                <p>{currentItem.text}</p>
              </div>
            </div>

            <div className={styles.arrows}>
              <button
                className={styles.leftArrow}
                onClick={prevSlide}
                aria-label="Previous testimonial">
                <FaArrowLeft />
              </button>
              <button
                className={styles.rightArrow}
                onClick={nextSlide}
                aria-label="Next testimonial">
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className={styles.videoContainer}>
            <video autoPlay loop muted playsInline className={styles.video}>
              <source src="/says/says.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatSays
