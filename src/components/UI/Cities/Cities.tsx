"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { City, CitiesApiResponse } from "@/types/city"
import CityCard from "./card/CityCard"
import styles from "./Cities.module.scss"

function Cities() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get('cityId')
  const searchQuery = searchParams.get('search')
  
  const [cities, setCities] = useState<City[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  
  // Use ref to track loading state without causing re-renders
  const loadingRef = useRef(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const fetchCities = useCallback(async (pageNum: number) => {
    // Check ref instead of state to avoid dependency issues
    if (loadingRef.current) return

    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      // Build URL with search params
      const params = new URLSearchParams()
      params.append('page', pageNum.toString())
      params.append('perPage', '10')
      
      // Add filters if they exist
      if (cityId) params.append('cityId', cityId)
      if (searchQuery) params.append('search', searchQuery)

      const url = `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${params.toString()}`
      const response = await axios.get<CitiesApiResponse>(url)

      const { data, meta } = response.data

      setCities(prev => (pageNum === 1 ? data : [...prev, ...data]))
      setHasMore(meta.hasNext)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cities")
      console.error("Error fetching cities:", err)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [cityId, searchQuery])

  // Reset when search params change
  useEffect(() => {
    setCities([])
    setPage(1)
    setHasMore(true)
    fetchCities(1)
  }, [cityId, searchQuery, fetchCities])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          setPage(prev => prev + 1)
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
  }, [hasMore])

  // Fetch cities when page changes (but not on initial mount)
  useEffect(() => {
    if (page > 1) {
      fetchCities(page)
    }
  }, [page, fetchCities])

  if (error && cities.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <p className={styles.errorText}>Error: {error}</p>
          <button
            onClick={() => {
              setPage(1)
              setCities([])
              fetchCities(1)
            }}
            className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        {(cityId || searchQuery) && (
          <div className={styles.filterInfo}>
            {searchQuery && <span>Searching for: {`${searchQuery}`}</span>}
            {cityId && searchQuery && <span> • </span>}
            {cityId && <span>City ID: {cityId}</span>}
          </div>
        )}
        
        <div className={styles.citiesGrid}>
          {cities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        {cities.length === 0 && !loading && (
          <div className={styles.noResults}>
            No cities found{searchQuery ? ` for "${searchQuery}"` : ''}
          </div>
        )}

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {error && cities.length > 0 && (
          <div className={styles.errorBanner}>
            <p>Error loading more cities</p>
            <button
              onClick={() => fetchCities(page)}
              className={styles.retryLink}>
              Try again
            </button>
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={observerTarget} className={styles.observerTarget}></div>
      </div>
    </>
  )
}

export default Cities