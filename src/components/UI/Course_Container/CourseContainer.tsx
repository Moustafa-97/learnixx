// components/UI/Course_Container/CourseContainer.tsx
"use client"
import React, { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import styles from "./CourseContainer.module.scss"
import CourseCard from "../Course_Card/CourseCard"
import useStore from "@/store/useStore"
import axios from "axios"

// Types based on API response
interface Category {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
  iso: string
}

interface City {
  id: number
  name: string
}

interface Course {
  id: number
  title: string
  description: string
  startDate: string
  price: number
  categories: Category[]
  country: Country
  city: City
}

interface Meta {
  page: number
  perPage: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface ApiResponse {
  data: Course[]
  meta: Meta
  lang: string
}

function CourseContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as "en" | "ar"
  const { courseSearchParams, setCourseSearchParams } = useStore()

  // State management
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
          {
            headers: {
              "Accept-Language": locale,
            },
          }
        )
        setAllCourses(response.data.data)
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchAllCourses()
  }, [locale])

  // Search courses when search params change
  useEffect(() => {
    const searchCourses = async () => {
      const { subject, location } = courseSearchParams

      // If no search params, clear search results
      if (!subject && !location) {
        setSearchResults([])
        return
      }

      try {
        setSearchLoading(true)
        setError(null)

        // Build search query
        const searchQuery = [subject, location].filter(Boolean).join(" ")

        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
          {
            params: {
              search: searchQuery,
            },
            headers: {
              "Accept-Language": locale,
            },
          }
        )

        setSearchResults(response.data.data)
      } catch (err) {
        console.error("Error searching courses:", err)
        setError("Failed to search courses")
      } finally {
        setSearchLoading(false)
      }
    }

    searchCourses()
  }, [courseSearchParams, locale])

  // Determine which courses to display
  const filteredCourses = useMemo(() => {
    const { subject, location } = courseSearchParams

    // If no search parameters, return all courses
    if (!subject && !location) {
      return allCourses
    }

    // Otherwise, return search results
    return searchResults
  }, [courseSearchParams, allCourses, searchResults])

  // Determine if search is active
  const isSearchActive =
    courseSearchParams.subject || courseSearchParams.location

  // Handle course enrollment navigation
  const handleEnrollNow = (courseId: number) => {
    router.push(`/${locale}/courses/${courseId}`)
  }

  // Scroll to courses section
  const scrollToCourses = () => {
    setTimeout(() => {
      const coursesElement = document.getElementById("courses")
      if (coursesElement) {
        coursesElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  // Update URL helper
  const updateURL = (newParams: { subject: string; location: string }) => {
    const params = new URLSearchParams()

    if (newParams.subject) params.set("subject", newParams.subject)
    if (newParams.location) params.set("location", newParams.location)

    const queryString = params.toString()
    const newURL = queryString
      ? `${pathname}?${queryString}#courses`
      : `${pathname}#courses`

    router.push(newURL)

    if (!newParams.subject && !newParams.location) {
      scrollToCourses()
    }
  }

  // Clear all filters
  const handleClearAll = () => {
    setCourseSearchParams({ subject: "", location: "" })
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

  // Retry function for errors
  const handleRetry = () => {
    if (isSearchActive) {
      // Trigger search again
      setCourseSearchParams({ ...courseSearchParams })
    } else {
      // Reload all courses
      window.location.reload()
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading courses...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !isSearchActive) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.errorContainer}>
          <h3>Error loading courses</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    )
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

          <div className={styles.resultInfo}>
            {searchLoading ? (
              <div className={styles.searchLoading}>
                <div className={styles.smallSpinner}></div>
                <span>Searching...</span>
              </div>
            ) : error ? (
              <div className={styles.searchError}>
                <span>{error}</span>
                <button onClick={handleRetry} className={styles.retryButton}>
                  Retry
                </button>
              </div>
            ) : (
              <p className={styles.resultCount}>
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Course grid */}
      {filteredCourses.length > 0 ? (
        <div className={styles.courseGrid}>
          {filteredCourses.map(course => (
            <div key={course.id} className={styles.courseContainer}>
              <CourseCard
                course={course}
                onEnrollNow={() => handleEnrollNow(course.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>No courses found</h3>
          <p>
            {isSearchActive
              ? "No courses match your current filters."
              : "No courses are currently available."}
          </p>
          {isSearchActive && (
            <button onClick={handleClearAll} className={styles.viewAllButton}>
              View All Courses
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseContainer
