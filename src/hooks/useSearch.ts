/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSearch.ts
import { useState, useCallback, useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import axios from "axios"
import useStore from "@/store/useStore"
import SearchService from "@/lib/searchService"

// API Response Types
interface Category {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
  iso: string;
}

interface City {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  startDate: string;
  price: number;
  categories: Category[];
  country: Country;
  city: City;
}

interface ApiResponse {
  data: Course[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  lang: string;
}

export function useSearch() {
  const locale = useLocale() as "en" | "ar"
  const searchServiceRef = useRef<SearchService | null>(null)
  
  // State for API data
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    courseSearchParams,
    setCourseSearchParams,
    recentCourseSearches,
    addRecentCourseSearch,
  } = useStore()

  // Fetch all courses from API
  const fetchAllCourses = useCallback(async () => {
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
      
      // Initialize search service with fetched data
      if (response.data.data.length > 0) {
        searchServiceRef.current = new SearchService(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }, [locale])

  // Initial data fetch
  useEffect(() => {
    fetchAllCourses()
  }, [fetchAllCourses])

  // Search courses using API endpoint
  const searchCourses = useCallback(
    async (subject: string, location: string): Promise<Course[]> => {
      try {
        setLoading(true)
        setError(null)
        
        // Build search query
        const searchQuery = [subject, location].filter(Boolean).join(' ')
        
        if (!searchQuery.trim()) {
          return allCourses
        }
        
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
          {
            params: {
              search: searchQuery
            },
            headers: {
              "Accept-Language": locale,
            },
          }
        )
        
        return response.data.data
      } catch (err) {
        console.error('Error searching courses:', err)
        setError('Search failed')
        return []
      } finally {
        setLoading(false)
      }
    },
    [locale, allCourses]
  )

  // Get subject suggestions based on course titles and categories
  const getSubjectSuggestions = useCallback(
    (input: string): string[] => {
      if (!input || input.trim().length < 1) return []

      const suggestions = new Set<string>()
      const normalizedInput = input.toLowerCase()

      allCourses.forEach(course => {
        // Check title
        if (course.title?.toLowerCase().includes(normalizedInput)) {
          suggestions.add(course.title)
        }

        // Check categories
        course.categories.forEach(category => {
          if (category.name?.toLowerCase().includes(normalizedInput)) {
            suggestions.add(category.name)
          }
        })
      })

      return Array.from(suggestions).slice(0, 5)
    },
    [allCourses]
  )

  // Get location suggestions from cities and countries
  const getLocationSuggestions = useCallback(
    (input?: string): string[] => {
      const allLocations = new Set<string>()

      allCourses.forEach(course => {
        // Add city names
        if (course.city?.name) {
          allLocations.add(course.city.name)
        }
        
        // Add country names
        if (course.country?.name) {
          allLocations.add(course.country.name)
        }
        
        // Add combined city, country format
        if (course.city?.name && course.country?.name) {
          allLocations.add(`${course.city.name}, ${course.country.name}`)
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
    [allCourses]
  )

  // Get popular subjects (categories)
  const getPopularSubjects = useCallback((): string[] => {
    const categoryMap = new Map<string, number>()

    allCourses.forEach(course => {
      course.categories.forEach(category => {
        categoryMap.set(category.name, (categoryMap.get(category.name) || 0) + 1)
      })
    })

    // Sort by frequency and return top categories
    return Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([categoryName]) => categoryName)
      .slice(0, 8)
  }, [allCourses])

  // Get courses by category
  const getCoursesByCategory = useCallback(
    (categoryName: string): Course[] => {
      return allCourses.filter(course =>
        course.categories.some(
          category => category.name.toLowerCase() === categoryName.toLowerCase()
        )
      )
    },
    [allCourses]
  )

  // Search courses by category ID using API
  const searchCoursesByCategory = useCallback(
    async (categoryId: number): Promise<Course[]> => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
          {
            params: {
              categoryIds: [categoryId]
            },
            headers: {
              "Accept-Language": locale,
            },
            paramsSerializer: {
              indexes: null // This creates categoryIds=1&categoryIds=2
            }
          }
        )
        
        return response.data.data
      } catch (err) {
        console.error('Error fetching courses by category:', err)
        setError('Failed to fetch courses by category')
        return []
      } finally {
        setLoading(false)
      }
    },
    [locale]
  )

  // Get featured courses (sorted by price - you can modify this logic)
  const getFeaturedCourses = useCallback((): Course[] => {
    // Sort by newest courses or any other criteria
    return [...allCourses]
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, 6)
  }, [allCourses])

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
    async (params: {
      subject?: string
      location?: string
      categoryId?: number
      minPrice?: number
      maxPrice?: number
    }): Promise<Course[]> => {
      try {
        setLoading(true)
        setError(null)
        
        const apiParams: any = {}
        
        // Build search query from subject and location
        const searchQuery = [params.subject, params.location].filter(Boolean).join(' ')
        if (searchQuery) {
          apiParams.search = searchQuery
        }
        
        // Add category filter
        if (params.categoryId) {
          apiParams.categoryIds = [params.categoryId]
        }
        
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses`,
          {
            params: apiParams,
            headers: {
              "Accept-Language": locale,
            },
            paramsSerializer: {
              indexes: null
            }
          }
        )
        
        let results = response.data.data
        
        // Apply client-side price filters (if API doesn't support them)
        if (params.minPrice !== undefined) {
          results = results.filter(course => course.price >= params.minPrice!)
        }
        
        if (params.maxPrice !== undefined) {
          results = results.filter(course => course.price <= params.maxPrice!)
        }
        
        return results
      } catch (err) {
        console.error('Error in advanced search:', err)
        setError('Advanced search failed')
        return []
      } finally {
        setLoading(false)
      }
    },
    [locale]
  )

  // Filter courses client-side (for immediate filtering)
  const filterCoursesLocal = useCallback(
    (filters: {
      subject?: string
      location?: string
      categoryName?: string
      minPrice?: number
      maxPrice?: number
    }): Course[] => {
      let results = allCourses

      // Filter by subject/title
      if (filters.subject && filters.subject.trim()) {
        const normalizedSubject = filters.subject.toLowerCase()
        results = results.filter(course =>
          course.title.toLowerCase().includes(normalizedSubject) ||
          course.description.toLowerCase().includes(normalizedSubject) ||
          course.categories.some(cat => 
            cat.name.toLowerCase().includes(normalizedSubject)
          )
        )
      }

      // Filter by location
      if (filters.location && filters.location.trim()) {
        const normalizedLocation = filters.location.toLowerCase()
        results = results.filter(course =>
          course.city.name.toLowerCase().includes(normalizedLocation) ||
          course.country.name.toLowerCase().includes(normalizedLocation)
        )
      }

      // Filter by category name
      if (filters.categoryName) {
        results = results.filter(course =>
          course.categories.some(category =>
            category.name.toLowerCase() === filters.categoryName!.toLowerCase()
          )
        )
      }

      // Filter by price range
      if (filters.minPrice !== undefined) {
        results = results.filter(course => course.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        results = results.filter(course => course.price <= filters.maxPrice!)
      }

      return results
    },
    [allCourses]
  )

  return {
    // State
    loading,
    error,
    
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
    searchCoursesByCategory,
    getFeaturedCourses,
    advancedCourseSearch,
    filterCoursesLocal,

    // Recent searches
    recentCourseSearches,
    addRecentCourseSearch,
    getRecentSearchesFormatted,

    // All courses
    allCourses,
    
    // Utilities
    fetchAllCourses,
  }
}