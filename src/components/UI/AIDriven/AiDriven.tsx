"use client"

import React, { useState, useEffect } from "react"
import styles from "./AiDriven.module.scss"
import Image from "next/image"
import oldLogo from "@/../public/logo/oldLogo.png"
import {
  FaInstagramSquare,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface AiDrivenProps {
  targetDate?: string // Target date in ISO format
}

function AiDriven({ targetDate = "2025-10-31T23:59:59" }: AiDrivenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Calculate immediately
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("AiDriven")
  return (
    <>
      <div className={styles.container}>
        <Image
          onClick={() => router.push(`/${locale}`)}
          src={oldLogo}
          alt="AI"
          width={100}
          height={100}
          className={styles.image}
        />
        <div className={styles.datecontainer}>
          <div className={styles.timeBlock}>
            <p className={styles.number}>{formatNumber(timeLeft.days)}</p>
            <p className={styles.label}>{t("timeLabels.days")}</p>
          </div>
          <div className={styles.timeBlock}>
            <p className={styles.number}>{formatNumber(timeLeft.hours)}</p>
            <p className={styles.label}>{t("timeLabels.hours")}</p>
          </div>
          <div className={styles.timeBlock}>
            <p className={styles.number}>{formatNumber(timeLeft.minutes)}</p>
            <p className={styles.label}>{t("timeLabels.minutes")}</p>
          </div>
          {/* <div className={styles.timeBlock}>
          <p className={styles.number}>{formatNumber(timeLeft.seconds)}</p>
          <p className={styles.label}>Seconds</p>
        </div> */}
        </div>
        <div className={styles.text}>
          <h3>{t("weAre")}</h3>
          <h3>{t("comingSoon")}</h3>
        </div>
        <div className={styles.social}>
          <div className={styles.icons}>
            <FaInstagramSquare className={styles.icon} />
            <FaTiktok className={styles.icon} />
            <FaYoutube className={styles.icon} />
            <FaTelegram className={styles.icon} />
          </div>
          <div className={styles.copyright}>
            <p>© Copyrights Learnix | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AiDriven
