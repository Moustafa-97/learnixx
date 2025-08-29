"use client"
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"
import styles from "./CourseContainer.module.scss"
import CourseCard from "../Course_Card/CourseCard"
import useStore from "@/store/useStore"
import axios from "axios"

// Types remain the same...
interface Category {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
  iso?: string
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
  country: Country | null
  city: City | null
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

// useInfiniteScroll hook remains the same...
function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean
) {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          callback()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [callback, hasMore, isLoading])

  return observerTarget
}

function CourseContainer() {
  const locale = useLocale() as "en" | "ar"
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const cityId = searchParams.get("cityId")
  const cityName = searchParams.get("cityName")
  const categoryId = searchParams.get("category")

  const { courseSearchParams, setCourseSearchParams } = useStore()

  // State management
  const [courses, setCourses] = useState<Course[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  // New states for handling no results
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false)
  const [isLoadingUnfiltered, setIsLoadingUnfiltered] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<{
    subject: string
    location: string
    cityId: string | null
    cityName: string | null
  } | null>(null)

  // Use refs to prevent race conditions
  const loadingRef = useRef(false)
  const pageRef = useRef(1)

  // Determine if search is active
  const isSearchActive = !!(
    courseSearchParams.subject || courseSearchParams.location
  )

  // Build query parameters with option to ignore filters
  const buildQueryParams = useCallback(
    (pageNum: number, ignoreFilters = false) => {
      const params = new URLSearchParams()
      params.append("page", pageNum.toString())
      params.append("perPage", "10")

      if (!ignoreFilters) {
        if (cityId) params.append("cityId", cityId)
        if (categoryId) params.append("categoryId", categoryId)

        // Add search query
        if (isSearchActive) {
          const searchTerms = [
            courseSearchParams.subject,
            courseSearchParams.location,
          ]
            .filter(Boolean)
            .join(" ")
          if (searchTerms) params.append("search", searchTerms)
        }
      }

      return params
    },
    [
      cityId,
      categoryId,
      isSearchActive,
      courseSearchParams.subject,
      courseSearchParams.location,
    ]
  )

  // Fetch courses function with auto-retry without filters
  const fetchCourses = useCallback(
    async (pageNum: number, isNewSearch = false, ignoreFilters = false) => {
      console.log("Fetching courses for page:", pageNum, { ignoreFilters })

      // Prevent duplicate requests
      if (loadingRef.current && !isNewSearch && !ignoreFilters) return

      loadingRef.current = true
      setLoading(true)
      setError(null)

      try {
        const params = buildQueryParams(pageNum, ignoreFilters)
        const url = `${process.env.NEXT_PUBLIC_API}/api/v1/courses?${params.toString()}`

        const response = await axios.get<ApiResponse>(url, {
          headers: {
            "Accept-Language": locale,
          },
        })

        const { data, meta } = response.data

        const isEmpty = !data || data.length === 0

        // If no results found with filters and this is the first page
        if (
          isEmpty &&
          !ignoreFilters &&
          pageNum === 1 &&
          (isSearchActive || cityId)
        ) {
          // Store the filters that returned no results
          setAppliedFilters({
            subject: courseSearchParams.subject,
            location: courseSearchParams.location,
            cityId,
            cityName,
          })

          // Show no results message
          setShowNoResultsMessage(true)

          // After a delay, fetch without filters
          setTimeout(async () => {
            setIsLoadingUnfiltered(true)
            try {
              const unfilteredParams = buildQueryParams(1, true)
              const unfilteredUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/courses?${unfilteredParams.toString()}`

              const unfilteredResponse = await axios.get<ApiResponse>(
                unfilteredUrl,
                {
                  headers: {
                    "Accept-Language": locale,
                  },
                }
              )

              const { data: unfilteredData, meta: unfilteredMeta } =
                unfilteredResponse.data

              setCourses(unfilteredData || [])
              setHasMore(unfilteredData && unfilteredData.length > 0)
              setTotalCount(unfilteredMeta.total || 0)
              pageRef.current = 1
            } catch (err) {
              console.error("Error fetching unfiltered courses:", err)
              setError("Failed to load courses")
            } finally {
              setIsLoadingUnfiltered(false)
            }
          }, 2000) // Show the message for 2 seconds before loading unfiltered results

          setHasMore(false)
          setCourses([])
          return
        }

        // Normal flow for when results are found
        setShowNoResultsMessage(false)
        setAppliedFilters(null)

        const shouldContinue = !isEmpty

        setCourses(prev => {
          if (isNewSearch || pageNum === 1) {
            return data || []
          }
          if (!isEmpty) {
            return [...prev, ...data]
          }
          return prev
        })

        setHasMore(shouldContinue)
        setTotalCount(meta.total || 0)

        if (!isEmpty) {
          pageRef.current = pageNum
        }

        if (initialLoading) {
          setInitialLoading(false)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch courses"
        setError(errorMessage)
        console.error("Error fetching courses:", err)

        if (pageNum === 1) {
          setCourses([])
        }

        setHasMore(false)
      } finally {
        setLoading(false)
        loadingRef.current = false
      }
    },
    [
      buildQueryParams,
      locale,
      initialLoading,
      isSearchActive,
      cityId,
      cityName,
      courseSearchParams,
    ]
  )

  // Load more function remains the same
  const loadMore = useCallback(() => {
    console.log("Loading more courses...", loadingRef.current, hasMore)

    if (!loadingRef.current && hasMore && !showNoResultsMessage) {
      const nextPage = pageRef.current + 1
      setPage(nextPage)
      fetchCourses(nextPage, false, !!appliedFilters) // Use ignoreFilters if we're showing unfiltered results
    }
  }, [hasMore, fetchCourses, showNoResultsMessage, appliedFilters])

  // Set up infinite scroll
  const observerTarget = useInfiniteScroll(loadMore, hasMore, loading)

  // Initial load and search effect
  useEffect(() => {
    // Reset state for new search
    setCourses([])
    setPage(1)
    pageRef.current = 1
    setHasMore(true)
    setError(null)
    setShowNoResultsMessage(false)
    setAppliedFilters(null)

    // Fetch first page
    fetchCourses(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSearchParams.subject, courseSearchParams.location, cityId])

  useEffect(() => {
    console.log("Current state:", {
      courses: courses.length,
      hasMore,
      loading,
      page,
      totalCount,
      error,
      showNoResultsMessage,
      appliedFilters,
    })
  }, [
    courses,
    hasMore,
    loading,
    page,
    totalCount,
    error,
    showNoResultsMessage,
    appliedFilters,
  ])

  // Handle course enrollment navigation
  const handleEnrollNow = useCallback(
    (courseId: number) => {
      router.push(
        `/${locale}/courses/${courseId}${cityId && cityName ? `?cityId=${cityId}&cityName=${cityName}` : ""}`
      )
    },
    [router, locale, cityId, cityName]
  )

  // Scroll to courses section
  const scrollToCourses = useCallback(() => {
    setTimeout(() => {
      const coursesElement = document.getElementById("courses")
      if (coursesElement) {
        coursesElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }, [])

  // URL management functions
  const updateURL = useCallback(
    (newParams: { subject: string; location: string }) => {
      const params = new URLSearchParams(searchParams.toString())

      // Remove old params
      params.delete("subject")
      params.delete("location")

      // Add new params if they exist
      if (newParams.subject) params.set("subject", newParams.subject)
      if (newParams.location) params.set("location", newParams.location)

      const queryString = params.toString()
      const newURL = queryString ? `${pathname}?${queryString}` : pathname

      router.push(newURL)

      if (!newParams.subject && !newParams.location) {
        scrollToCourses()
      }
    },
    [searchParams, pathname, router, scrollToCourses]
  )

  const handleClearAll = useCallback(() => {
    setCourseSearchParams({ subject: "", location: "" })

    const params = new URLSearchParams()
    if (cityId) params.set("cityId", cityId)
    if (cityName) params.set("cityName", cityName)

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
    scrollToCourses()
  }, [
    setCourseSearchParams,
    cityId,
    cityName,
    pathname,
    router,
    scrollToCourses,
  ])

  const handleClearSubject = useCallback(() => {
    const newParams = { ...courseSearchParams, subject: "" }
    setCourseSearchParams(newParams)
    updateURL(newParams)
  }, [courseSearchParams, setCourseSearchParams, updateURL])

  const handleClearLocation = useCallback(() => {
    const newParams = { ...courseSearchParams, location: "" }
    setCourseSearchParams(newParams)
    updateURL(newParams)
  }, [courseSearchParams, setCourseSearchParams, updateURL])

  const handleClearCity = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("cityId")
    params.delete("cityName")

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }, [searchParams, pathname, router])

  const handleRetry = useCallback(() => {
    setError(null)
    setCourses([])
    setPage(1)
    pageRef.current = 1
    setShowNoResultsMessage(false)
    setAppliedFilters(null)
    fetchCourses(1, true)
  }, [fetchCourses])

  // Memoized values
  const hasActiveFilters = useMemo(() => {
    return !!(
      courseSearchParams.subject ||
      courseSearchParams.location ||
      cityId
    )
  }, [courseSearchParams.subject, courseSearchParams.location, cityId])

  const resultText = useMemo(() => {
    if (showNoResultsMessage && appliedFilters) {
      return "No courses found with your filters"
    }
    if (totalCount > 0) {
      return `${totalCount} ${totalCount === 1 ? "course" : "courses"} found`
    }
    if (courses.length > 0) {
      return `${courses.length} ${courses.length === 1 ? "course" : "courses"} loaded`
    }
    return "No courses found"
  }, [totalCount, courses.length, showNoResultsMessage, appliedFilters])

  console.log("page", page)

  // Render functions
  const renderFilters = () => {
    // Show applied filters that returned no results
    if (appliedFilters && showNoResultsMessage) {
      return (
        <div className={styles.filterSection}>
          <div className={styles.noResultsNotice}>
            <p className={styles.noResultsText}>
              No courses found with the following filters:
            </p>
            <div className={styles.appliedFilters}>
              {appliedFilters.subject && (
                <span className={styles.filterItem}>
                  Subject: {appliedFilters.subject}
                </span>
              )}
              {appliedFilters.location && (
                <span className={styles.filterItem}>
                  Location: {appliedFilters.location}
                </span>
              )}
              {appliedFilters.cityId && (
                <span className={styles.filterItem}>
                  City:{" "}
                  {appliedFilters.cityName || `ID ${appliedFilters.cityId}`}
                </span>
              )}
            </div>
            {isLoadingUnfiltered ? (
              <p className={styles.loadingUnfilteredText}>
                Loading all available courses...
              </p>
            ) : (
              <p className={styles.showingAllText}>
                Showing all available courses instead:
              </p>
            )}
          </div>
        </div>
      )
    }

    // Normal filter display
    if (!hasActiveFilters) return null

    return (
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

          {cityId && (
            <div className={styles.filterChip}>
              <span>City: {cityName || `ID ${cityId}`}</span>
              <button
                onClick={handleClearCity}
                aria-label="Remove city filter"
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
          <p className={styles.resultCount}>{resultText}</p>
        </div>
      </div>
    )
  }

  // Loading state for initial load
  if (initialLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading courses...</p>
        </div>
      </div>
    )
  }

  // Error state for initial load
  if (error && courses.length === 0 && !showNoResultsMessage) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h3>Error loading courses</h3>
            <p className={styles.errorText}>{error}</p>
            <button onClick={handleRetry} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {/* Filters */}
      {renderFilters()}

      {/* Loading unfiltered courses */}
      {isLoadingUnfiltered && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading available courses...</p>
        </div>
      )}

      {/* Courses grid */}
      {!isLoadingUnfiltered && courses.length > 0 ? (
        <>
          <div className={styles.courseGrid}>
            {courses.map((course, index) => (
              <div
                key={`${course.id}-${index}`}
                className={styles.courseContainer}>
                <CourseCard
                  course={course}
                  onEnrollNow={() => handleEnrollNow(course.id)}
                />
              </div>
            ))}
          </div>

          {/* Loading indicator for pagination */}
          {loading && courses.length > 0 && (
            <div className={styles.loadingMore}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading more courses...</p>
            </div>
          )}

          {/* Error state for pagination */}
          {error && courses.length > 0 && (
            <div className={styles.errorBanner}>
              <p>Error loading more courses: {error}</p>
              <button onClick={handleRetry} className={styles.retryLink}>
                Try again
              </button>
            </div>
          )}

          {/* Intersection Observer Target */}
          {hasMore && !error && !showNoResultsMessage && (
            <div
              ref={observerTarget}
              className={styles.observerTarget}
              aria-hidden="true"
            />
          )}

          {/* End of list indicator */}
          {!hasMore && courses.length > 0 && !loading && (
            <div className={styles.endOfList}>
              <p>No more courses to load</p>
            </div>
          )}
        </>
      ) : (
        /* No results - only show if not loading unfiltered */
        !isLoadingUnfiltered &&
        !showNoResultsMessage && (
          <div className={styles.noResults}>
            <h3>No courses found</h3>
            <p>
              {isSearchActive
                ? "No courses match your current filters."
                : "No courses are currently available."}
            </p>
            {isSearchActive && (
              <button onClick={handleClearAll} className={styles.showAllButton}>
                Show all courses
              </button>
            )}
          </div>
        )
      )}
    </div>
  )
}

export default CourseContainer
