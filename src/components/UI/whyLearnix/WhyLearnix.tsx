"use client"
import React from "react"
import styles from "./WhyLearnix.module.scss"
import arrowbig from "@/../public/whyLearnix/arrowbig.svg"
import arrowsmall from "@/../public/whyLearnix/arrowsmall.svg"
import idea from "@/../public/whyLearnix/idea.svg"
import chat from "@/../public/whyLearnix/chat.svg"
import computer from "@/../public/whyLearnix/computer.svg"
import world from "@/../public/whyLearnix/world.svg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl" // Add this import
import { useRouter } from "next/navigation"

function WhyLearnix() {
  const t = useTranslations("whyLearnix")
  const locale = useLocale() // Get current locale
  const isRTL = locale === 'ar' // Check if Arabic
  const router = useRouter()
  const handleNavigation = () => {
    router.push(`/${locale}/courses`)
  }
  
  return (
    <>
      <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.description}>
            {t("subtitle")}
          </p>
        </div>
        <div className={styles.section}>
          <div className={styles.cyrcle1}>
            <div className={styles.cyrcle2}>
              <div className={styles.cyrcle3}></div>
            </div>
          </div>
          <div className={styles.cards1}>
            <div className={styles.largeCard}>
              <Image
                src={computer}
                alt={t("cards.globalConnections.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h2>{t("cards.globalConnections.title")}</h2>
              <p>
                {t("cards.globalConnections.description")}
              </p>
              <button onClick={handleNavigation}>{t("cards.globalConnections.buttonText")}</button>
            </div>
            <div className={styles.smallCard}>
              <Image
                src={world}
                alt={t("cards.learnBest.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h3>{t("cards.learnBest.title")}</h3>
            </div>
            <div className={styles.arrow}>
              <Image
                src={arrowbig}
                alt="Arrow"
                width={100}
                height={100}
                className={styles.arrowBig}
              />
            </div>
          </div>
          <div className={styles.videoContainer}>
            <video autoPlay loop muted playsInline className={styles.video}>
              <source src="/whyLearnix/video2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.cards2}>
            <div className={styles.arrow}>
              <Image
                src={arrowsmall}
                alt="Arrow"
                width={100}
                height={100}
                className={styles.arrowSmall}
              />
            </div>
            <div className={styles.smallCard}>
              <Image
                src={chat}
                alt={t("cards.growingCommunity.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h3>{t("cards.growingCommunity.title")}</h3>
            </div>
            <div className={styles.largeCard}>
              <Image
                src={idea}
                alt={t("cards.practicalTrainers.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h2>{t("cards.practicalTrainers.title")}</h2>
              <p>
                {t("cards.practicalTrainers.description")}
              </p>
              <button onClick={handleNavigation}>{t("cards.practicalTrainers.buttonText")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyLearnix