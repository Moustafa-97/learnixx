// "use client"

// import React, { useState, useEffect, useCallback, useRef } from "react"
// import axios from "axios"
// import { useSearchParams } from "next/navigation"
// import { City, CitiesApiResponse } from "@/types/city"
// import CityCard from "./card/CityCard"
// import styles from "./Cities.module.scss"
// import useStore from "@/store/useStore"

// function Cities() {
//   const searchParams = useSearchParams()
//   const cityId = searchParams.get("cityId")
//   const searchQuery = searchParams.get("location")
//   const { courseSearchParams, setCourseSearchParams } = useStore()
//   const [cities, setCities] = useState<City[]>([])
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [hasMore, setHasMore] = useState(true)

//   // Use ref to track loading state without causing re-renders
//   const loadingRef = useRef(false)
//   const observerTarget = useRef<HTMLDivElement>(null)

//   const fetchCities = useCallback(
//     async (pageNum: number) => {
//       // Check ref instead of state to avoid dependency issues
//       if (loadingRef.current) return

//       loadingRef.current = true
//       setLoading(true)
//       setError(null)

//       try {
//         // Build URL with search params
//         const params = new URLSearchParams()
//         params.append("page", pageNum.toString())
//         params.append("perPage", "10")

//         // Add filters if they exist
//         if (cityId) params.append("cityId", cityId)
//         if (searchQuery) params.append("search", searchQuery)

//         const url = `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${params.toString()}`
//         const response = await axios.get<CitiesApiResponse>(url)

//         const { data, meta } = response.data

//         setCities(prev => (pageNum === 1 ? data : [...prev, ...data]))
//         setHasMore(meta.hasNext)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch cities")
//         console.error("Error fetching cities:", err)
//       } finally {
//         setLoading(false)
//         loadingRef.current = false
//       }
//     },
//     [cityId, searchQuery]
//   )

//   // Reset when search params change
//   useEffect(() => {
//     setCities([])
//     setPage(1)
//     setHasMore(true)
//     fetchCities(1)
//   }, [cityId, searchQuery, fetchCities])

//   // Set up intersection observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       entries => {
//         if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
//           setPage(prev => prev + 1)
//         }
//       },
//       { threshold: 0.1 }
//     )

//     const currentTarget = observerTarget.current
//     if (currentTarget) {
//       observer.observe(currentTarget)
//     }

//     return () => {
//       if (currentTarget) {
//         observer.unobserve(currentTarget)
//       }
//     }
//   }, [hasMore])

//   // Fetch cities when page changes (but not on initial mount)
//   useEffect(() => {
//     if (page > 1) {
//       fetchCities(page)
//     }
//   }, [page, fetchCities])

//   if (error && cities.length === 0) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorContent}>
//           <p className={styles.errorText}>Error: {error}</p>
//           <button
//             onClick={() => {
//               setPage(1)
//               setCities([])
//               fetchCities(1)
//             }}
//             className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className={styles.container}>
//         {(cityId || searchQuery) && (
//           <div className={styles.filterInfo}>
//             {searchQuery && <span>Searching for: {`${searchQuery}`}</span>}
//             {cityId && searchQuery && <span> • </span>}
//             {cityId && <span>City ID: {cityId}</span>}
//           </div>
//         )}

//         <div className={styles.citiesGrid}>
//           {cities.map(city => (
//             <CityCard key={city.id} city={city} />
//           ))}
//         </div>

//         {cities.length === 0 && !loading && (
//           <div className={styles.noResults}>
//             No cities found{searchQuery ? ` for "${searchQuery}"` : ""}
//           </div>
//         )}

//         {loading && (
//           <div className={styles.loadingContainer}>
//             <div className={styles.spinner}></div>
//           </div>
//         )}

//         {error && cities.length > 0 && (
//           <div className={styles.errorBanner}>
//             <p>Error loading more cities</p>
//             <button
//               onClick={() => fetchCities(page)}
//               className={styles.retryLink}>
//               Try again
//             </button>
//           </div>
//         )}

//         {/* Intersection Observer Target */}
//         <div ref={observerTarget} className={styles.observerTarget}></div>
//       </div>
//     </>
//   )
// }

// export default Cities
"use client"

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import axios from "axios"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { City, CitiesApiResponse } from "@/types/city"
import CityCard from "./card/CityCard"
import styles from "./Cities.module.scss"
import useStore from "@/store/useStore"
import { useLocale } from "next-intl"

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

function Cities() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const cityId = searchParams.get("cityId")
  const cityName = searchParams.get("cityName")

  const { courseSearchParams, setCourseSearchParams } = useStore()
  const searchQuery =
    courseSearchParams.location || searchParams.get("location") || ""

  // State management
  const [cities, setCities] = useState<City[]>([])
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
      params.append("perPage", "5") // Increased for better UX

      if (cityId) params.append("cityId", cityId)

      // Add search query
      if (isSearchActive) {
        const searchTerms = [
          courseSearchParams.subject,
          courseSearchParams.location,
        ]
          .filter(Boolean)
          .join(" ")
        if (searchTerms) params.append("search", searchTerms)
      } else if (searchQuery) {
        params.append("search", searchQuery)
      }

      return params
    },
    [cityId, isSearchActive, courseSearchParams, searchQuery]
  )

  // Fetch cities function
  const fetchCities = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      // Prevent duplicate requests
      if (loadingRef.current && !isNewSearch) return

      loadingRef.current = true
      setLoading(true)
      setError(null)

      try {
        const params = buildQueryParams(pageNum)
        const url = `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${params.toString() || `page=${page}&perPage=5`}`

        const response = await axios.get<CitiesApiResponse>(url, {
          headers: {
            "Accept-Language": locale,
          },
        })

        const { data, meta } = response.data

        setCities(prev => {
          // If it's a new search or first page, replace all cities
          if (isNewSearch || pageNum === 1) {
            return data
          }
          // Otherwise append to existing cities
          return [...prev, ...data]
        })

        setHasMore(meta.hasNext)
        setTotalCount(meta.total || 0)
        pageRef.current = pageNum

        // Set initial loading to false after first successful load
        if (initialLoading) {
          setInitialLoading(false)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch cities"
        setError(errorMessage)
        console.error("Error fetching cities:", err)

        // If it's the first page, clear cities
        if (pageNum === 1) {
          setCities([])
        }
      } finally {
        setLoading(false)
        loadingRef.current = false
      }
    },
    [buildQueryParams, page, locale, initialLoading]
  )

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      const nextPage = pageRef.current + 1
      setPage(nextPage)
      fetchCities(nextPage)
    }
  }, [hasMore, fetchCities])

  // Set up infinite scroll
  const observerTarget = useInfiniteScroll(loadMore, hasMore, loading)

  // Initial load and search effect
  useEffect(() => {
    // Reset state for new search
    setCities([])
    setPage(1)
    pageRef.current = 1
    setHasMore(true)
    setError(null)

    // Fetch first page
    fetchCities(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSearchParams.subject, courseSearchParams.location, cityId]) // Don't include fetchCities to avoid infinite loop

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
    },
    [searchParams, pathname, router]
  )

  const handleClearAll = useCallback(() => {
    setCourseSearchParams({ subject: "", location: "" })

    const params = new URLSearchParams()
    if (cityId) params.set("cityId", cityId)
    if (cityName) params.set("cityName", cityName)

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }, [setCourseSearchParams, cityId, cityName, pathname, router])

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
    setCities([])
    setPage(1)
    pageRef.current = 1
    fetchCities(1, true)
  }, [fetchCities])

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
      return `${totalCount} ${totalCount === 1 ? "city" : "cities"} found`
    }
    if (cities.length > 0) {
      return `${cities.length} ${cities.length === 1 ? "city" : "cities"} loaded`
    }
    return "No cities found"
  }, [totalCount, cities.length])

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
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading cities...</p>
        </div>
      </div>
    )
  }

  // Error state for initial load
  if (error && cities.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h3>Error loading cities</h3>
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
    <div className={styles.container}>
      {/* Filters */}
      {renderFilters()}

      {/* Cities grid */}
      {cities.length > 0 ? (
        <>
          <div className={styles.citiesGrid}>
            {cities.map((city, index) => (
              <CityCard key={`${city.id}-${index}`} city={city} />
            ))}
          </div>

          {/* Loading indicator for pagination */}
          {loading && cities.length > 0 && (
            <div className={styles.loadingMore}>
              <div className={styles.spinner}></div>
              <p>Loading more cities...</p>
            </div>
          )}

          {/* Error state for pagination */}
          {error && cities.length > 0 && (
            <div className={styles.errorBanner}>
              <p>Error loading more cities: {error}</p>
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
          {!hasMore && cities.length > 0 && !loading && (
            <div className={styles.endOfList}>
              <p>No more cities to load</p>
            </div>
          )}
        </>
      ) : (
        /* No results */
        <div className={styles.noResults}>
          <h3>No cities found</h3>
          <p>
            {isSearchActive
              ? "No cities match your current filters."
              : "No cities are currently available."}
          </p>
          {isSearchActive && (
            <button onClick={handleClearAll} className={styles.showAllButton}>
              Show all cities
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Cities
