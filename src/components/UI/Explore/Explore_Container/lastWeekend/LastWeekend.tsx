"use client"
import React from "react"
import styles from "./LastWeekend.module.scss"
import Image from "next/image"
import bigI from "@/../public/leed/big.png"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

function LastWeekend() {
  const t = useTranslations("LastWeekend")
  const locale = useLocale()
  const router = useRouter()
  const handleButtonClick = () => {
    router.push(`/${locale}/lead-week`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.small}>
          <div className={styles.small1}>
            <p>{t("poweredBy")}</p>
          </div>
          <div className={styles.small2}>
            <div className={styles.small2Cont}>
              <p>{t("joinMembers")}</p>
              <button onClick={handleButtonClick}>{t("getStarted")}</button>
            </div>
          </div>
        </div>
        <div className={styles.big}>
          <div className={styles.bigCont}>
            <h3>{t("title")}</h3>
            <p>{t("description")}</p>
          </div>
          <div className={styles.bigImg}>
            <Image src={bigI} alt="Big Image" loading="lazy" width={500} height={500} />
          </div>
        </div>
      </div>
      <div className={styles.button}></div>
    </div>
  )
}

export default LastWeekend
