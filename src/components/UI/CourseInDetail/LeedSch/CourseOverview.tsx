import React from "react"
import { useLocale, useTranslations } from "next-intl"
import { City } from "@/types/career"
import styles from "./CourseOverview.module.scss"
import { LuMonitorPlay } from "react-icons/lu"
import { LiaChalkboardSolid } from "react-icons/lia"
import { TbClockMinus } from "react-icons/tb"
import { FaLaptop } from "react-icons/fa"
interface CourseOverviewProps {
  description: string
  startDate: string
  price: number
  city: City | null
  schedule?: Array<{
    day: string
    time: string
  }>
  hasExclusiveMaterials?: boolean
  onApplyClick?: () => void
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  description,
  // startDate,
  price,
  // city,
  // schedule,
  // hasExclusiveMaterials = true,
  onApplyClick,
}) => {
  const t = useTranslations("courseOverview")
  const locale = useLocale()

  // Format the start date based on locale
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // }

  // Format price with currency
  const formatPrice = (priceValue: number) => {
    return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceValue)
  }

  // const defaultSchedule = [
  //   { day: t("schedule.days.friday"), time: t("schedule.times.evening") },
  //   {
  //     day: t("schedule.days.saturday"),
  //     time: t("schedule.times.morning_afternoon"),
  //   },
  //   { day: t("schedule.days.sunday"), time: t("schedule.times.morning") },
  // ]

  // Course information items for the sidebar
  const courseInfoItems = [
    {
      icon: <LuMonitorPlay />,
      label: t("expert", { default: "Expert-led sessions" }),
      // value: formatDate(startDate),
    },
    {
      icon: <LiaChalkboardSolid />,
      label: t("preminum", { default: "Premium venue access" }),
      // value: `${city && city.name}, ${city && city.country.name}`,
    },
    {
      icon: <TbClockMinus />,
      label: t("lunch", { default: "Lunch included" }),
      // value: formatPrice(price),
    },
    {
      icon: <FaLaptop />,
      label: t("exclusive", { default: "Exclusive materials" }),
      // value: formatPrice(price),
    },
  ]

  return (
    <div className={styles.courseCard}>
      <div className={styles.sidebar}>
        <div className={styles.scheduleSection}>
          <h3 className={styles.scheduleTitle}>
            {t("courseInfo", { default: "Course Information" })}
          </h3>

          {/* Dynamic Course Information */}
          <div className={styles.scheduleList}>
            {courseInfoItems.map((item, index) => (
              <div key={index} className={styles.scheduleItem}>
                <span className={styles.dayIcon}>{item.icon}</span>
                <div className={styles.infoContent}>
                  <span className={styles.scheduleText}>{item.label}</span>
                  {/* <span className={styles.scheduleText}>{item.value}</span> */}
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Section */}
        </div>
      </div>

      <div className={styles.mainContent}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.pricingSection}>
          <div className={styles.priceText}>
            {t("pricing.startingAt", { price: formatPrice(price) })}
          </div>
          {/* <div className={styles.paymentNote}>{t("pricing.paymentNote")}</div> */}
        </div>

        <button className={styles.applyButton} onClick={onApplyClick}>
          {t("applyButton")}
        </button>
      </div>
    </div>
  )
}

export default CourseOverview
