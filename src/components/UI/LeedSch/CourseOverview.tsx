"use client"
import React from "react"
import { useLocale, useTranslations } from "next-intl"
import styles from "./CourseOverview.module.scss"
import { useRouter } from "next/navigation"

interface CourseOverviewProps {
  title?: string
  description?: string
  price?: string
  schedule?: Array<{
    day: string
    time: string
  }>
  hasExclusiveMaterials?: boolean
  onApplyClick?: () => void
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  title,
  description,
  price,
  schedule,
  hasExclusiveMaterials = true,
  // onApplyClick,
}) => {
  const t = useTranslations("courseOverview")

  const defaultSchedule = [
    { day: t("schedule.days.friday"), time: t("schedule.times.evening") },
    {
      day: t("schedule.days.saturday"),
      time: t("schedule.times.morning_afternoon"),
    },
    { day: t("schedule.days.sunday"), time: t("schedule.times.morning") },
  ]
  const router = useRouter()
  const locale = useLocale()
  const onApplyClick = () => {
    router.push(`/${locale}/register?courseID=Leed&cityId=Leed&cityName=Barcelona`)
  }

  return (
    <div className={styles.courseCard}>
      <div className={styles.sidebar}>
        <div className={styles.scheduleSection}>
          <h3 className={styles.scheduleTitle}>{t("schedule.title")}</h3>
          <div className={styles.scheduleList}>
            {(schedule || defaultSchedule).map((item, index) => (
              <div key={index} className={styles.scheduleItem}>
                <span className={styles.dayIcon}>📅</span>
                <span className={styles.scheduleText}>
                  {item.day} {item.time}
                </span>
              </div>
            ))}
          </div>
          {hasExclusiveMaterials && (
            <div className={styles.exclusiveMaterials}>
              <span className={styles.checkboxIcon}>🔑</span>
              <p className={styles.checkboxLabel}>{t("exclusiveMaterials")}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mainContent}>
        <h2 className={styles.title}>{title || t("title")}</h2>
        <p className={styles.description}>{description || t("description")}</p>

        <div className={styles.pricingSection}>
          <div className={styles.priceText}>
            {t("pricing.startingAt", { price: price || t("price") })}
          </div>
          <div className={styles.paymentNote}>{t("pricing.paymentNote")}</div>
        </div>

        <button className={styles.applyButton} onClick={onApplyClick}>
          {t("applyButton")}
        </button>
      </div>
    </div>
  )
}

export default CourseOverview
