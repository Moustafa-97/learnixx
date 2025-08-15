import React from "react"
import styles from "./AboutCards.module.scss"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import image from "@/../public/about/Image.png"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"

function AboutCards() {
  const t = useTranslations("aboutCards")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const ArrowIcon = isRTL ? FaArrowRight : FaArrowLeft

  return (
    <>
      <div className={`${styles.container} ${isRTL ? styles.rtl : ""}`}>
        <div className={styles.big}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>{t("worldClassTrainers")}</h3>
            </div>
            <div className={styles.body}>
              <div className={styles.arrow}>
                <ArrowIcon />
              </div>
              <div className={styles.text}>
                <p>{t("trainersDescription")}</p>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <div className={styles.imgs}>
              <Image
                src={image}
                alt={t("trainerImageAlt")}
                width={100}
                height={100}
              />
              <Image
                src={image}
                alt={t("trainerImageAlt")}
                width={100}
                height={100}
              />
              <Image
                src={image}
                alt={t("trainerImageAlt")}
                width={100}
                height={100}
              />
              <Image
                src={image}
                alt={t("trainerImageAlt")}
                width={100}
                height={100}
              />
            </div>
            <div className={styles.link}>
              <Link href={`/${locale}/courses`}>
                {t("andMore")}
              </Link>
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className={styles.smallContainer}>
          <div className={styles.smallB}>
            <h6>{t("professionalSkills")}</h6>
            <p>{t("professionalSkillsDescription")}</p>
          </div>
          <div className={styles.smallW}>
            <h6>{t("primeLearningLocations")}</h6>
            <p>{t("primeLearningLocationsDescription")}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutCards
