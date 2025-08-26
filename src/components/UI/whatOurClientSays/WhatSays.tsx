"use client"
import React, { useState, useEffect, useCallback, lazy, Suspense } from "react"
import styles from "./WhatSays.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useLocale, useTranslations } from "next-intl"
const Video = lazy(() => import("./Video"))
// import { useTranslations } from "next-intl"

function WhatSays() {
  //   const t = useTranslations("whatSays")
  const locale = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)

  const whatSays = [
    {
      id: 1,
      name: locale === "ar" ? "سارة م." : "Sarah M.",
      job: locale === "ar" ? "مديرة العمليات" : "Operations Director",
      text:
        locale === "ar"
          ? "لم يكن هذا مثل أي تدريب تقليدي. مناقشة التحديات الحقيقية برنامج الذكاء الاصطناعي في العمل ملهماً حقاً. واستكشاف برشلونة أضاف لي الإلهام واستراتيجيات عملية يمكنني تطبيقها فوراً."
          : "This was nothing like traditional training. Discussing real challenges in the AI in Action program was truly eye-opening. Exploring Barcelona added both inspiration and practical strategies I could apply immediately.",
    },
    {
      id: 2,
      name: locale === "ar" ? "أحمد ك." : "Ahmed K.",
      job: locale === "ar" ? "مستشار تقني" : "IT Consultant",
      text:
        locale === "ar"
          ? "أساسيات الأمن السيبراني في أمستردام منحتني أكثر بكثير من مجرد نظريات. النقاشات المفتوحة مع الخبراء الأوروبيين غيّرت الطريقة التي أفكر بها في حماية البيانات والأنظمة."
          : "Cybersecurity Essentials in Amsterdam gave me far more than theory. The open discussions with the expert changed the way I think about protecting data and systems.",
    },
    {
      id: 3,
      name: locale === "ar" ? "لورا ج." : "Laura G.",
      job: locale === "ar" ? "مديرة منتجات" : "Product Manager",
      text:
        locale === "ar"
          ? "التعلم في باريس خلال برنامج تميز تجربة المستخدم كان لا يُنسى. لم يكن الأمر مجرد اكتساب معرفة — بل كان يتعلق بالنمو، وبناء علاقات ذات قيمة، والحصول على إلهام حقيقي."
          : "Learning in Paris during the UX Brilliance program was unforgettable. It wasn't just about knowledge — it was about growth, meaningful connections, and true inspiration.",
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
  const t = useTranslations("whatClientSays")
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t("title")}</h2>
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
            {/* <video autoPlay loop muted playsInline  className={styles.video}>
              <source src="/says/says.mp4" type="video/mp4"  />
            </video> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Video />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatSays
