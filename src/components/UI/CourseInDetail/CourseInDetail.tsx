"use client"
import React, { useState, useEffect } from "react"
import { useLocale } from "next-intl"
import axios from "axios"
import styles from "./CourseInDetail.module.scss"
import { CourseDetail } from "@/types/career"
import HeroCourses from "./Hero_Courses/HeroCourses"
import WhyUs from "./WhyUs/WhyUs"
import LeadFQA from "./Lead_fqa/LeadFQA"
import CourseOverview from "./LeedSch/CourseOverview"
import Trainers from "./trainers/Trainers"
import { useRouter, useSearchParams } from "next/navigation"

interface CourseInDetailProps {
  courseID: number | string |null
}

function CourseInDetail({ courseID }: CourseInDetailProps) {
  const locale = useLocale() as "en" | "ar"
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const param = useSearchParams()
  const cityID = param.get("cityId")
  const cityName = param.get("cityName")

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get<CourseDetail>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseID}`,
          {
            headers: {
              "Accept-Language": locale,
            },
          }
        )

        setCourse(response.data)
      } catch (err) {
        console.error("Error fetching course detail:", err)
        setError("Failed to load course details")
      } finally {
        setLoading(false)
      }
    }

    if (courseID) {
      fetchCourseDetail()
    }
  }, [courseID, locale])

  const handleApplyClick = () => {
    // Handle enrollment logic
    if (cityID && cityName) {
      router.push(
        `/${locale}/register?courseID=${courseID}&cityId=${cityID}&cityName=${cityName}`
      )
    } else {
      router.push(`/${locale}/register?courseID=${courseID}`)
    }
    console.log(`Apply for course ${courseID}`)
  }

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading course details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h3>Error loading course</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Course not found
  if (!course) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <h3>Course not found</h3>
          <p>{`The course you're looking for doesn't exist or has been removed.`}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <HeroCourses details={course} />
        </div>
        <div id="coursesPage">
          {course && (
            <WhyUs outcomes={course.outcomes} loading={loading} error={error} />
          )}
        </div>
        <div>
          {course && (
            <Trainers
              trainers={course.trainers}
              loading={loading}
              error={error}
            />
          )}
        </div>
        <div>
          {course && (
            <LeadFQA
              curriculums={course.curriculums}
              loading={loading}
              error={error}
            />
          )}
        </div>

        <div>
          {course && (
            <CourseOverview
              description={course.description}
              startDate={course.startDate}
              price={course.price}
              city={course.city && course.city}
              onApplyClick={handleApplyClick}
            />
          )}
        </div>

        {/* You can add more sections here */}
        <div className={styles.courseContent}>
          {/* Course sections like trainers, curriculum, outcomes, etc. */}
        </div>
      </div>
    </>
  )
}

export default CourseInDetail
