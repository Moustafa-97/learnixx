// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/UI/Course_Container/CourseContainer.tsx
// "use client"
// import React, { useState, useEffect, useMemo } from "react"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import { useLocale } from "next-intl"
// import styles from "./CourseContainer.module.scss"
// import CourseCard from "../Course_Card/CourseCard"
// import useStore from "@/store/useStore"
// import axios from "axios"

// // Types based on API response
// interface Category {
//   id: number
//   name: string
// }

// interface Country {
//   id: number
//   name: string
//   iso?: string
// }

// interface City {
//   id: number
//   name: string
// }

// interface Course {
//   id: number
//   title: string
//   description: string
//   startDate: string
//   price: number
//   categories: Category[]
//   country: Country | null
//   city: City | null
// }

// interface Meta {
//   page: number
//   perPage: number
//   total: number
//   totalPages: number
//   hasNext: boolean
//   hasPrev: boolean
// }

// interface ApiResponse {
//   data: Course[]
//   meta: Meta
//   lang: string
// }

// function CourseContainer() {
//   const params = useSearchParams() as any
//   const cityId = params.get("cityId")
//   const cityName = params.get("cityName")

//   const router = useRouter()
//   const pathname = usePathname()
//   const locale = useLocale() as "en" | "ar"
//   const { courseSearchParams, setCourseSearchParams } = useStore()

//   // State management
//   const [allCourses, setAllCourses] = useState<Course[]>([])
//   const [searchResults, setSearchResults] = useState<Course[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchLoading, setSearchLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch all courses on component mount
//   useEffect(() => {
//     const fetchAllCourses = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         const response = await axios.get<ApiResponse>(
//           `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
//           {
//             headers: {
//               "Accept-Language": locale,
//             },
//           }
//         )
//         setAllCourses(response.data.data)
//       } catch (err) {
//         console.error("Error fetching courses:", err)
//         setError("Failed to load courses")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAllCourses()
//   }, [cityId, locale])

//   // Search courses when search params change
//   useEffect(() => {
//     const searchCourses = async () => {
//       const { subject, location } = courseSearchParams

//       // If no search params, clear search results
//       if (!subject && !location) {
//         setSearchResults([])
//         return
//       }

//       try {
//         setSearchLoading(true)
//         setError(null)

//         // Build search query
//         const searchQuery = [subject, location].filter(Boolean).join(" ")

//         const response = await axios.get<ApiResponse>(
//           `${process.env.NEXT_PUBLIC_API}/api/v1/courses${cityId ? `?cityId=${cityId}` : ""}`,
//           {
//             params: {
//               search: searchQuery,
//             },
//             headers: {
//               "Accept-Language": locale,
//             },
//           }
//         )

//         setSearchResults(response.data.data)
//       } catch (err) {
//         console.error("Error searching courses:", err)
//         setError("Failed to search courses")
//       } finally {
//         setSearchLoading(false)
//       }
//     }

//     searchCourses()
//   }, [cityId, courseSearchParams, locale])

//   // Determine which courses to display
//   const filteredCourses = useMemo(() => {
//     const { subject, location } = courseSearchParams

//     // If no search parameters, return all courses
//     if (!subject && !location) {
//       return allCourses
//     }

//     // Otherwise, return search results
//     return searchResults
//   }, [courseSearchParams, allCourses, searchResults])

//   // Determine if search is active
//   const isSearchActive =
//     courseSearchParams.subject || courseSearchParams.location

//   // Handle course enrollment navigation
//   const handleEnrollNow = (courseId: number) => {
//     router.push(
//       `/${locale}/courses/${courseId}${cityId && cityName ? `?cityId=${cityId}&cityName=${cityName}` : ""}`
//     )
//   }

//   // Scroll to courses section
//   const scrollToCourses = () => {
//     setTimeout(() => {
//       const coursesElement = document.getElementById("courses")
//       if (coursesElement) {
//         coursesElement.scrollIntoView({ behavior: "smooth", block: "start" })
//       }
//     }, 100)
//   }

//   // Update URL helper
//   const updateURL = (newParams: { subject: string; location: string }) => {
//     const params = new URLSearchParams()

//     if (newParams.subject) params.set("subject", newParams.subject)
//     if (newParams.location) params.set("location", newParams.location)

//     const queryString = params.toString()
//     const newURL = queryString
//       ? `${pathname}?${queryString}#courses`
//       : `${pathname}#courses`

//     router.push(newURL)

//     if (!newParams.subject && !newParams.location) {
//       scrollToCourses()
//     }
//   }

//   // Clear all filters
//   const handleClearAll = () => {
//     setCourseSearchParams({ subject: "", location: "" })
//     router.push(`${pathname}#courses`)
//     scrollToCourses()
//   }

//   // Clear individual filter
//   const handleClearSubject = () => {
//     const newParams = { ...courseSearchParams, subject: "" }
//     setCourseSearchParams(newParams)
//     updateURL(newParams)
//   }

//   const handleClearLocation = () => {
//     const newParams = { ...courseSearchParams, location: "" }
//     setCourseSearchParams(newParams)
//     updateURL(newParams)
//   }

//   // Retry function for errors
//   const handleRetry = () => {
//     if (isSearchActive) {
//       // Trigger search again
//       setCourseSearchParams({ ...courseSearchParams })
//     } else {
//       // Reload all courses
//       window.location.reload()
//     }
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className={styles.wrapper}>
//         <div className={styles.loadingContainer}>
//           <div className={styles.loadingSpinner}></div>
//           <p>Loading courses...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && !isSearchActive) {
//     return (
//       <div className={styles.wrapper}>
//         <div className={styles.errorContainer}>
//           <h3>Error loading courses</h3>
//           <p>{error}</p>
//           <button onClick={handleRetry} className={styles.retryButton}>
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={styles.wrapper}>
//       {/* Active filters */}
//       {isSearchActive ||
//         (cityId && (
//           <div className={styles.filterSection}>
//             <div className={styles.activeFilters}>
//               <span className={styles.filterLabel}>Active filters:</span>

//               {courseSearchParams.subject && (
//                 <div className={styles.filterChip}>
//                   <span>Subject: {courseSearchParams.subject}</span>
//                   <button
//                     onClick={handleClearSubject}
//                     aria-label={`Remove ${courseSearchParams.subject} filter`}
//                     className={styles.chipClose}>
//                     ×
//                   </button>
//                 </div>
//               )}
//               {cityId && (
//                 <div className={styles.filterChip}>
//                   <span>City: {cityName}</span>
//                   <button
//                     onClick={handleClearSubject}
//                     aria-label={`Remove ${courseSearchParams.subject} filter`}
//                     className={styles.chipClose}>
//                     ×
//                   </button>
//                 </div>
//               )}

//               {courseSearchParams.location && (
//                 <div className={styles.filterChip}>
//                   <span>Location: {courseSearchParams.location}</span>
//                   <button
//                     onClick={handleClearLocation}
//                     aria-label={`Remove ${courseSearchParams.location} filter`}
//                     className={styles.chipClose}>
//                     ×
//                   </button>
//                 </div>
//               )}

//               <button
//                 onClick={handleClearAll}
//                 className={styles.clearAllButton}>
//                 Clear all
//               </button>
//             </div>

//             <div className={styles.resultInfo}>
//               {searchLoading ? (
//                 <div className={styles.searchLoading}>
//                   <div className={styles.smallSpinner}></div>
//                   <span>Searching...</span>
//                 </div>
//               ) : error ? (
//                 <div className={styles.searchError}>
//                   <span>{error}</span>
//                   <button onClick={handleRetry} className={styles.retryButton}>
//                     Retry
//                   </button>
//                 </div>
//               ) : (
//                 <p className={styles.resultCount}>
//                   {filteredCourses.length} course
//                   {filteredCourses.length !== 1 ? "s" : ""} found
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}

//       {/* Course grid */}
//       {filteredCourses.length > 0 ? (
//         <div className={styles.courseGrid}>
//           {filteredCourses.map(course => (
//             <div key={course.id} className={styles.courseContainer}>
//               <CourseCard
//                 course={course}
//                 onEnrollNow={() => handleEnrollNow(course.id)}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className={styles.noResults}>
//           <h3>No courses found</h3>
//           <p>
//             {isSearchActive
//               ? "No courses match your current filters."
//               : "No courses are currently available."}
//           </p>
//           <div className={styles.courseGrid}>
//             {allCourses.map(course => (
//               <div key={course.id} className={styles.courseContainer}>
//                 <CourseCard
//                   course={course}
//                   onEnrollNow={() => handleEnrollNow(course.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CourseContainer
// components/UI/Course_Container/CourseContainer.tsx
"use client"
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
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

// Custom hook for infinite scroll
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
        rootMargin: "100px", // Start loading 100px before reaching the bottom
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

  // Use refs to prevent race conditions
  const loadingRef = useRef(false)
  const pageRef = useRef(1)

  // Determine if search is active
  const isSearchActive = !!(
    courseSearchParams.subject || courseSearchParams.location
  )

  // Build query parameters
  const buildQueryParams = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams()
      params.append("page", pageNum.toString())
      params.append("perPage", "10") // Adjust as needed

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

      // Add category filters if needed
      // params.append("categoryIds", "1")

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

  // Fetch courses function
  const fetchCourses = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      // console.log("Fetching courses for page:", pageNum)

      // Prevent duplicate requests
      if (loadingRef.current && !isNewSearch) return

      loadingRef.current = true
      setLoading(true)
      setError(null)

      try {
        const params = buildQueryParams(pageNum)
        const url = `${process.env.NEXT_PUBLIC_API}/api/v1/courses?${params.toString()}`
        
        console.log("Fetching courses from:", url);
        const response = await axios.get<ApiResponse>(url, {
          headers: {
            "Accept-Language": locale,
          },
        })

        const { data, meta } = response.data

        // Check different conditions to determine if there are more courses
        const isEmpty = !data || data.length === 0
        // const isLastPage = meta.page >= meta.totalPages
        // const isPartialPage =
        //   data.length < parseInt(params.get("perPage") || "10")

        // Determine if we should continue pagination
        const shouldContinue = !isEmpty

        setCourses(prev => {
          // If it's a new search or first page, replace all courses
          if (isNewSearch || pageNum === 1) {
            return data || []
          }
          // Otherwise append to existing courses if we have data
          if (!isEmpty) {
            return [...prev, ...data]
          }
          return prev
        })

        setHasMore(shouldContinue)
        setTotalCount(meta.total || 0)

        // Only update page ref if we successfully got data
        if (!isEmpty) {
          pageRef.current = pageNum
        }

        // Set initial loading to false after first successful load
        if (initialLoading) {
          setInitialLoading(false)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch courses"
        setError(errorMessage)
        console.error("Error fetching courses:", err)

        // If it's the first page, clear courses
        if (pageNum === 1) {
          setCourses([])
        }

        // Stop pagination on error
        setHasMore(false)
      } finally {
        setLoading(false)
        loadingRef.current = false
      }
    },
    [buildQueryParams, locale, initialLoading]
  )

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    console.log("Loading more courses...", loadingRef.current, hasMore)

    if (!loadingRef.current && hasMore) {
      const nextPage = pageRef.current + 1
      setPage(nextPage)
      fetchCourses(nextPage)
    }
  }, [hasMore, fetchCourses])

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

    // Fetch first page
    fetchCourses(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSearchParams.subject, courseSearchParams.location, cityId, categoryId]) // Don't include fetchCourses to avoid infinite loop
  useEffect(() => {
    console.log("Current state:", {
      courses: courses.length,
      hasMore,
      loading,
      page,
      totalCount,
      error,
    })
  }, [courses, hasMore, loading, page, totalCount, error])
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
    if (totalCount > 0) {
      return `${totalCount} ${totalCount === 1 ? "course" : "courses"} found`
    }
    if (courses.length > 0) {
      return `${courses.length} ${courses.length === 1 ? "course" : "courses"} loaded`
    }
    return "No courses found"
  }, [totalCount, courses.length])

  console.log("page", page)

  // Render functions
  const renderFilters = () => {
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
  if (error && courses.length === 0) {
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

      {/* Courses grid */}
      {courses.length > 0 ? (
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
          {hasMore && !error && (
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
        /* No results */
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
      )}
    </div>
  )
}

export default CourseContainer
