// components/UI/Course_Container/CourseContainer.tsx
"use client"
import React, { useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import styles from "./CourseContainer.module.scss"
import CourseCard from "../Course_Card/CourseCard"
import { useSearch } from "@/hooks/useSearch"
import useStore from "@/store/useStore"

function CourseContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const { searchCourses, allCourses } = useSearch()
  const { courseSearchParams, setCourseSearchParams } = useStore()

  // Filter courses based on search parameters
  const filteredCourses = useMemo(() => {
    const { subject, location } = courseSearchParams

    // If no search parameters, return all courses
    if (!subject && !location) {
      return allCourses
    }

    // Otherwise, return search results
    return searchCourses(subject, location)
  }, [courseSearchParams, searchCourses, allCourses])

  // Determine if search is active
  const isSearchActive =
    courseSearchParams.subject || courseSearchParams.location

  // Scroll to courses section
  const scrollToCourses = () => {
    setTimeout(() => {
      const coursesElement = document.getElementById("courses")
      if (coursesElement) {
        coursesElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100) // Small delay to ensure DOM is updated
  }

  // Update URL helper
  const updateURL = (newParams: { subject: string; location: string }) => {
    const params = new URLSearchParams()

    // Only add params if they have values
    if (newParams.subject) params.set("subject", newParams.subject)
    if (newParams.location) params.set("location", newParams.location)

    // If no params, navigate to clean URL with hash
    const queryString = params.toString()
    const newURL = queryString
      ? `${pathname}?${queryString}#courses`
      : `${pathname}#courses`

    router.push(newURL)

    // If clearing filters, scroll to courses
    if (!newParams.subject && !newParams.location) {
      scrollToCourses()
    }
  }

  // Clear all filters
  const handleClearAll = () => {
    setCourseSearchParams({ subject: "", location: "" })
    // Navigate to clean URL with hash
    router.push(`${pathname}#courses`)
    scrollToCourses()
  }

  // Clear individual filter
  const handleClearSubject = () => {
    const newParams = { ...courseSearchParams, subject: "" }
    setCourseSearchParams(newParams)
    updateURL(newParams)
  }

  const handleClearLocation = () => {
    const newParams = { ...courseSearchParams, location: "" }
    setCourseSearchParams(newParams)
    updateURL(newParams)
  }

  return (
    <div className={styles.wrapper}>
      {/* Active filters */}
      {isSearchActive && (
        <div className={styles.filterSection}>
          <div className={styles.activeFilters}>
            <span className={styles.filterLabel}>Active filters:</span>

            {courseSearchParams.subject && (
              <div className={styles.filterChip}>
                <span>Subject: {courseSearchParams.subject}</span>
                <button
                  onClick={handleClearSubject}
                  aria-label={`Remove ${courseSearchParams.subject} filter`}
                  className={styles.chipClose}>
                  ×
                </button>
              </div>
            )}

            {courseSearchParams.location && (
              <div className={styles.filterChip}>
                <span>Location: {courseSearchParams.location}</span>
                <button
                  onClick={handleClearLocation}
                  aria-label={`Remove ${courseSearchParams.location} filter`}
                  className={styles.chipClose}>
                  ×
                </button>
              </div>
            )}

            <button onClick={handleClearAll} className={styles.clearAllButton}>
              Clear all
            </button>
          </div>

          <p className={styles.resultCount}>
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {/* Course grid */}
      {filteredCourses.length > 0 ? (
        <div className={styles.courseGrid}>
          {filteredCourses.map(course => (
            <div key={course.id} className={styles.courseContainer}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>No courses found</h3>
          <p>No courses match your current filters.</p>
          <button onClick={handleClearAll} className={styles.viewAllButton}>
            View All Courses
          </button>
        </div>
      )}
    </div>
  )
}

export default CourseContainer
