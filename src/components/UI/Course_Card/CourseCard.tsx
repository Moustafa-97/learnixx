import React from "react"
import { Course } from "@/types/courses"
import styles from "./CourseCard.module.scss"
import Image from "next/image"

import { useLocale, useTranslations } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import web from "@/../public/course/card/web.png"

function CourseCard(props: { course: Course }) {
  const { course } = props
  const t = useTranslations("courses.card")
  const locale = useLocale()
  const isArabic = locale === "ar"
  if (!course) {
    return <div className={styles.error}>{t("courseNotFound")}</div>
  }

  return (
    <>
      <div className={styles.courseContainer}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={web}
              alt={course.title}
              className={styles.courseImage}
              width={300}
              height={200}
            />
          </div>
          <h2 className={styles.title}>
            {isArabic ? course.titleAr : course.title}
          </h2>
          <p className={styles.description}>
            {isArabic ? course.descriptionAr : course.description}
          </p>
          <p className={styles.time}>
            {t("startsAt")}: {isArabic ? course.startDateAr : course.startDate}
          </p>
          <div className={styles.location}>
            <div className={styles.svgContainer}>
              <ReactCountryFlag
                countryCode={course.flag}
                svg
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <span className={styles.locationText}>
              {isArabic ? course.locationAr : course.location}
            </span>
          </div>

          <p className={styles.price}>
            <span>{t("fees")}: </span> {course.price}
          </p>
          <button className={styles.enrollButton}>
            {isArabic ? "سجل الآن" : "Enroll Now"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CourseCard
