// hooks/useSearch.ts
import { useCallback, useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import useStore from "@/store/useStore"
import SearchService from "@/lib/searchService"
import { courses } from "@/data/coursesData"
import { Course } from "@/types/courses"

export function useSearch() {
  const locale = useLocale() as "en" | "ar"
  const searchServiceRef = useRef<SearchService | null>(null)

  const {
    courseSearchParams,
    setCourseSearchParams,
    recentCourseSearches,
    addRecentCourseSearch,
  } = useStore()

  // Initialize search service with course data
  useEffect(() => {
    searchServiceRef.current = new SearchService(courses)
  }, [])

  // Search courses by subject and location
  const searchCourses = useCallback(
    (subject: string, location: string): Course[] => {
      if (!searchServiceRef.current) return []

      let results = courses

      // Filter by subject
      if (subject && subject.trim()) {
        const subjectResults = searchServiceRef.current.search(subject, locale)
        const subjectIds = new Set(subjectResults.map(r => r.id))
        results = results.filter(course => subjectIds.has(course.id))
      }

      // Filter by location
      if (location && location.trim()) {
        results = results.filter(course => {
          const courseLocation =
            locale === "ar"
              ? course.locationAr || course.location
              : course.location
          return courseLocation?.toLowerCase().includes(location.toLowerCase())
        })
      }

      return results
    },
    [locale]
  )

  // Get subject suggestions based on input
  const getSubjectSuggestions = useCallback(
    (input: string): string[] => {
      if (!input || input.trim().length < 1) return []

      const suggestions = new Set<string>()
      const normalizedInput = input.toLowerCase()

      courses.forEach(course => {
        // Check title
        const title = locale === "ar" ? course.titleAr : course.title
        if (title?.toLowerCase().includes(normalizedInput)) {
          suggestions.add(title)
        }

        // Check category
        const category =
          locale === "ar"
            ? course.categoryAr || course.category
            : course.category
        if (category?.toLowerCase().includes(normalizedInput)) {
          suggestions.add(category)
        }

        // Check tags
        course.tags.forEach(tag => {
          if (tag.toLowerCase().includes(normalizedInput)) {
            suggestions.add(tag)
          }
        })
      })

      return Array.from(suggestions).slice(0, 5)
    },
    [locale]
  )

  // Get location suggestions
  const getLocationSuggestions = useCallback(
    (input?: string): string[] => {
      const allLocations = new Set<string>()

      courses.forEach(course => {
        const location =
          locale === "ar"
            ? course.locationAr || course.location
            : course.location
        if (location) {
          allLocations.add(location)
        }
      })

      const locations = Array.from(allLocations)

      if (!input || input.trim().length === 0) {
        return locations.slice(0, 8)
      }

      const normalizedInput = input.toLowerCase()
      return locations
        .filter(loc => loc.toLowerCase().includes(normalizedInput))
        .slice(0, 5)
    },
    [locale]
  )

  // Get popular subjects
  const getPopularSubjects = useCallback((): string[] => {
    const categories = new Map<string, number>()

    courses.forEach(course => {
      const category =
        locale === "ar" ? course.categoryAr || course.category : course.category

      if (category) {
        categories.set(category, (categories.get(category) || 0) + 1)
      }
    })

    // Sort by frequency and return top categories
    return Array.from(categories.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category)
      .slice(0, 8)
  }, [locale])

  // Get courses by category
  const getCoursesByCategory = useCallback(
    (category: string): Course[] => {
      return courses.filter(course => {
        const courseCategory =
          locale === "ar"
            ? course.categoryAr || course.category
            : course.category
        return courseCategory?.toLowerCase() === category.toLowerCase()
      })
    },
    [locale]
  )

  // Get featured courses
  const getFeaturedCourses = useCallback((): Course[] => {
    // Return top-rated courses with most students
    return [...courses]
      .sort((a, b) => {
        const scoreA = (a.rating || 0) * (a.students || 0)
        const scoreB = (b.rating || 0) * (b.students || 0)
        return scoreB - scoreA
      })
      .slice(0, 6)
  }, [])

  // Get recent searches formatted for display
  const getRecentSearchesFormatted = useCallback((): string[] => {
    return recentCourseSearches
      .map(search => {
        const parts = []
        if (search.subject) parts.push(search.subject)
        if (search.location) parts.push(search.location)
        return parts.join(" - ")
      })
      .filter(Boolean)
  }, [recentCourseSearches])

  // Advanced search with multiple filters
  const advancedCourseSearch = useCallback(
    (params: {
      subject?: string
      location?: string
      category?: string
      minPrice?: number
      maxPrice?: number
      level?: string
      minRating?: number
    }): Course[] => {
      let results = courses

      // Apply subject filter
      if (params.subject && params.subject.trim()) {
        const searchResults =
          searchServiceRef.current?.search(params.subject, locale) || []
        const searchIds = new Set(searchResults.map(r => r.id))
        results = results.filter(course => searchIds.has(course.id))
      }

      // Apply location filter
      if (params.location && params.location.trim()) {
        results = results.filter(course => {
          const courseLocation =
            locale === "ar"
              ? course.locationAr || course.location
              : course.location
          return courseLocation
            ?.toLowerCase()
            .includes(params.location!.toLowerCase())
        })
      }

      // Apply category filter
      if (params.category) {
        results = results.filter(course => {
          const courseCategory =
            locale === "ar"
              ? course.categoryAr || course.category
              : course.category
          return (
            courseCategory?.toLowerCase() === params.category!.toLowerCase()
          )
        })
      }

      // Apply price filters
      if (params.minPrice !== undefined) {
        results = results.filter(
          course => course.price && course.price >= params.minPrice!
        )
      }
      if (params.maxPrice !== undefined) {
        results = results.filter(
          course => course.price && course.price <= params.maxPrice!
        )
      }

      // Apply level filter
      if (params.level) {
        results = results.filter(course => {
          const courseLevel =
            locale === "ar" ? course.levelAr || course.level : course.level
          return courseLevel
            ?.toLowerCase()
            .includes(params.level!.toLowerCase())
        })
      }

      // Apply rating filter
      if (params.minRating !== undefined) {
        results = results.filter(
          course => course.rating && course.rating >= params.minRating!
        )
      }

      return results
    },
    [locale]
  )

  return {
    // Course search
    searchCourses,
    courseSearchParams,
    setCourseSearchParams,

    // Suggestions
    getSubjectSuggestions,
    getLocationSuggestions,
    getPopularSubjects,

    // Course data
    getCoursesByCategory,
    getFeaturedCourses,
    advancedCourseSearch,

    // Recent searches
    recentCourseSearches,
    addRecentCourseSearch,
    getRecentSearchesFormatted,

    // All courses
    allCourses: courses,
  }
}