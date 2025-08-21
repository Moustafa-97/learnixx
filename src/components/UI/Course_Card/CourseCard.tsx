"use client"
import React from "react"
import { Course } from "@/types/courses"
import styles from "./CourseCard.module.scss"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import web from "@/../public/course/card/web.png"

interface CourseCardProps {
  course: Course
  onEnrollNow: () => void
}

// ✅ Correct function signature
function CourseCard({ course, onEnrollNow }: CourseCardProps) {
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
              alt={course.title} // ✅ Fixed: removed extra "course."
              className={styles.courseImage}
              width={300}
              height={200}
            />
          </div>
          <h2 className={styles.title}>{course.title}</h2> {/* ✅ Fixed */}
          <p className={styles.description}>{course.description}</p>{" "}
          {/* ✅ Fixed */}
          <p className={styles.time}>
            {t("startsAt")}: {course.startDate} {/* ✅ Fixed */}
          </p>
          <div className={styles.location}>
            {course.country && course.country.iso && (
              <div className={styles.svgContainer}>
                <ReactCountryFlag
                  countryCode={course.country.iso} // ✅ Fixed
                  svg
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}
            <span className={styles.locationText}>
              {course.country && course.country.name && course.country.name}{" "}
              {/* ✅ Fixed */}
            </span>
          </div>
          <p className={styles.price}>
            <span>{t("fees")}: </span> ${course.price}{" "}
            {/* ✅ Fixed and added $ */}
          </p>
          <button
            className={styles.enrollButton}
            onClick={onEnrollNow} // ✅ Added onClick handler
          >
            {isArabic ? "سجل الآن" : "Enroll Now"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CourseCard
