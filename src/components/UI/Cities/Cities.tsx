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
  // State management - separate states for all cities and search results
  const [allCities, setAllCities] = useState<City[]>([])
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [page, setPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchHasMore, setSearchHasMore] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  // Use ref to track loading state without causing re-renders
  const loadingRef = useRef(false)
  const searchLoadingRef = useRef(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Determine if search is active
  const isSearchActive =
    courseSearchParams.subject || courseSearchParams.location

  // Determine which cities to display
  const displayedCities = useMemo(() => {
    if (!isSearchActive) {
      return allCities
    }
    return searchResults
  }, [isSearchActive, allCities, searchResults])

  // Fetch all cities
  const fetchAllCities = useCallback(
    async (pageNum: number) => {
      if (loadingRef.current) return

      loadingRef.current = true
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (cityId) params.append("cityId", cityId)
        if (searchQuery) params.append("search", searchQuery)
        params.append("page", pageNum.toString())
        params.append("perPage", "10")

        if (cityId) params.append("cityId", cityId)

        const url = `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${params.toString()}`
        const response = await axios.get<CitiesApiResponse>(url, {
          headers: {
            "Accept-Language": locale,
          },
        })

        const { data, meta } = response.data

        setAllCities(prev => (pageNum === 1 ? data : [...prev, ...data]))
        setHasMore(meta.hasNext)

        if (pageNum === 1) {
          setInitialLoadComplete(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cities")
        console.error("Error fetching cities:", err)
      } finally {
        setLoading(false)
        loadingRef.current = false
      }
    },
    [cityId, locale, searchQuery]
  )

  // Search cities
  const searchCities = useCallback(
    async (pageNum: number) => {
      const { subject, location } = courseSearchParams

      if (!subject && !location) {
        setSearchResults([])
        return
      }

      if (searchLoadingRef.current) return

      searchLoadingRef.current = true
      setSearchLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        params.append("page", pageNum.toString())
        params.append("perPage", "10")

        // Build search query from courseSearchParams
        const searchQuery = [subject, location].filter(Boolean).join(" ")
        params.append("search", searchQuery)

        if (cityId) params.append("cityId", cityId)

        const url = `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${params.toString()}`
        const response = await axios.get<CitiesApiResponse>(url)

        const { data, meta } = response.data

        setSearchResults(prev => (pageNum === 1 ? data : [...prev, ...data]))
        setSearchHasMore(meta.hasNext)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search cities")
        console.error("Error searching cities:", err)
      } finally {
        setSearchLoading(false)
        searchLoadingRef.current = false
      }
    },
    [cityId, courseSearchParams]
  )

  // Initial load - fetch all cities
  useEffect(() => {
    setAllCities([])
    setPage(1)
    setHasMore(true)
    fetchAllCities(1)
  }, [fetchAllCities])

  // Search when search params change
  useEffect(() => {
    setSearchResults([])
    setSearchPage(1)
    setSearchHasMore(true)

    if (isSearchActive) {
      searchCities(1)
    }
  }, [courseSearchParams, searchCities, isSearchActive])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (isSearchActive && searchHasMore && !searchLoadingRef.current) {
            setSearchPage(prev => prev + 1)
          } else if (!isSearchActive && hasMore && !loadingRef.current) {
            setPage(prev => prev + 1)
          }
        }
      },
      { threshold: 0.1 }
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
  }, [hasMore, searchHasMore, isSearchActive])

  // Fetch more pages when page number changes
  useEffect(() => {
    if (page > 1 && !isSearchActive) {
      fetchAllCities(page)
    }
  }, [page, isSearchActive, fetchAllCities])

  useEffect(() => {
    if (searchPage > 1 && isSearchActive) {
      searchCities(searchPage)
    }
  }, [searchPage, isSearchActive, searchCities])

  // URL and filter management functions
  const updateURL = (newParams: { subject: string; location: string }) => {
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
  }

  const handleClearAll = () => {
    setCourseSearchParams({ subject: "", location: "" })
    const params = new URLSearchParams()
    if (cityId) params.set("cityId", cityId)
    if (cityName) params.set("cityName", cityName)

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

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

  const handleClearCity = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("cityId")
    params.delete("cityName")

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  // Retry function for errors
  const handleRetry = () => {
    if (isSearchActive) {
      // Reset search
      setSearchResults([])
      setSearchPage(1)
      searchCities(1)
    } else {
      // Reset all cities
      setAllCities([])
      setPage(1)
      fetchAllCities(1)
    }
  }

  // Loading state for initial load
  if (!initialLoadComplete && loading) {
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
  if (error && !isSearchActive && displayedCities.length === 0) {
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
    <>
      <div className={styles.container}>
        {/* Active filters */}
        {(isSearchActive || cityId) && (
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
                    aria-label={`Remove city filter`}
                    className={styles.chipClose}>
                    ×
                  </button>
                </div>
              )}

              <button
                onClick={handleClearAll}
                className={styles.clearAllButton}>
                Clear all
              </button>
            </div>

            <div className={styles.resultInfo}>
              {searchLoading && searchPage === 1 ? (
                <div className={styles.searchLoading}>
                  <div className={styles.smallSpinner}></div>
                  <span>Searching...</span>
                </div>
              ) : error && isSearchActive ? (
                <div className={styles.searchError}>
                  <span>{error}</span>
                  <button onClick={handleRetry} className={styles.retryLink}>
                    Retry
                  </button>
                </div>
              ) : (
                <p className={styles.resultCount}>
                  {displayedCities.length} cit
                  {displayedCities.length !== 1 ? "ies" : "y"} found
                </p>
              )}
            </div>
          </div>
        )}

        {/* Cities grid */}
        {displayedCities.length > 0 ? (
          <div className={styles.citiesGrid}>
            {displayedCities.map(city => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        ) : (
          !loading &&
          !searchLoading && (
            <div className={styles.noResults}>
              <h3>No cities found</h3>
              <p>
                {isSearchActive
                  ? "No cities match your current filters."
                  : "No cities are currently available."}
              </p>
              {isSearchActive && allCities.length > 0 && (
                <>
                  <button
                    onClick={handleClearAll}
                    className={styles.showAllButton}>
                    Show all cities
                  </button>
                  <div
                    className={styles.citiesGrid}
                    style={{ marginTop: "2rem" }}>
                    {allCities.map(city => (
                      <CityCard key={city.id} city={city} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        )}

        {/* Loading indicator for pagination */}
        {((loading && !isSearchActive) || (searchLoading && isSearchActive)) &&
          displayedCities.length > 0 && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
            </div>
          )}

        {/* Error banner for pagination errors */}
        {error && displayedCities.length > 0 && (
          <div className={styles.errorBanner}>
            <p>Error loading more cities</p>
            <button onClick={handleRetry} className={styles.retryLink}>
              Try again
            </button>
          </div>
        )}

        {/* Intersection Observer Target */}
        {((hasMore && !isSearchActive) ||
          (searchHasMore && isSearchActive)) && (
          <div ref={observerTarget} className={styles.observerTarget}></div>
        )}
      </div>
    </>
  )
}

export default Cities
