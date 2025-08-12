/* eslint-disable @typescript-eslint/no-explicit-any */
import Fuse from "fuse.js"
import type { IFuseOptions } from "fuse.js"

// API Response Types
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

// Updated Course interface matching API response
export interface Course {
  id: number
  title: string
  description: string
  startDate: string
  price: number
  categories: Category[]
  country: Country
  city: City
  // Optional fields for search enhancement
  score?: number
  matches?: any[]
}

// Create searchable fields by flattening the course structure
interface SearchableCourse extends Course {
  // Flattened fields for easier searching
  categoryNames: string
  locationText: string
  countryName: string
  cityName: string
}

// Fuse.js configuration for fuzzy search with new structure
const fuseOptions: IFuseOptions<SearchableCourse> = {
  // Fields to search in
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1.5 },
    { name: "categoryNames", weight: 1.8 }, // Combined categories
    { name: "locationText", weight: 1.5 }, // Combined location
    { name: "cityName", weight: 1.2 },
    { name: "countryName", weight: 1.2 },
    { name: "startDate", weight: 0.8 },
    { name: "price", weight: 0.5 },
  ],
  // Fuzzy search options
  threshold: 0.4, // 0 = perfect match, 1 = match anything
  location: 0, // Where in the string to look for the pattern
  distance: 100, // How far from the location to look
  minMatchCharLength: 2, // Min length of the pattern
  // Advanced options
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  findAllMatches: true,
  useExtendedSearch: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
}

class SearchService {
  private fuse: Fuse<SearchableCourse>
  private data: Course[]
  private searchableData: SearchableCourse[]

  constructor(data: Course[]) {
    this.data = data
    this.searchableData = this.transformToSearchable(data)
    this.fuse = new Fuse(this.searchableData, fuseOptions)
  }

  // Transform API courses to searchable format
  private transformToSearchable(courses: Course[]): SearchableCourse[] {
    return courses.map(course => ({
      ...course,
      categoryNames: course.categories.map(cat => cat.name).join(" "),
      locationText: `${course.city.name} ${course.country.name}`,
      cityName: course.city.name,
      countryName: course.country.name,
    }))
  }

  // Update search data
  updateData(data: Course[]) {
    this.data = data
    this.searchableData = this.transformToSearchable(data)
    this.fuse = new Fuse(this.searchableData, fuseOptions)
  }

  // Perform search
  search(query: string, locale: "en" | "ar" = "en"): Course[] {
    if (!query || query.trim().length < 2) {
      return []
    }

    // Clean and normalize query
    const normalizedQuery = this.normalizeText(query, locale)

    // Perform fuzzy search
    const results = this.fuse.search(normalizedQuery)

    // Return original course items with search metadata
    return results.map(result => {
      const originalCourse = this.data.find(
        course => course.id === result.item.id
      )!
      return {
        ...originalCourse,
        score: result.score,
        matches: result.matches as any[], // Cast the matches property to any[]
      }
    })
  }

  // Get suggestions based on partial query
  getSuggestions(
    query: string,
    locale: "en" | "ar" = "en",
    limit: number = 5
  ): string[] {
    if (!query || query.trim().length < 1) {
      return []
    }

    const normalizedQuery = this.normalizeText(query, locale)
    const results = this.fuse.search(normalizedQuery, { limit: limit * 2 }) // Get more results to filter

    // Extract unique suggestions from titles and categories
    const suggestions = new Set<string>()

    results.forEach(result => {
      const originalCourse = this.data.find(
        course => course.id === result.item.id
      )
      if (originalCourse) {
        // Add title
        suggestions.add(originalCourse.title)

        // Add category names
        originalCourse.categories.forEach(category => {
          suggestions.add(category.name)
        })

        // Add location combinations
        suggestions.add(originalCourse.city.name)
        suggestions.add(originalCourse.country.name)
        suggestions.add(
          `${originalCourse.city.name}, ${originalCourse.country.name}`
        )
      }
    })

    return Array.from(suggestions).slice(0, limit)
  }

  // Search by category name
  searchByCategory(categoryName: string): Course[] {
    return this.data.filter(course =>
      course.categories.some(
        category => category.name.toLowerCase() === categoryName.toLowerCase()
      )
    )
  }

  // Search by category ID
  searchByCategoryId(categoryId: number): Course[] {
    return this.data.filter(course =>
      course.categories.some(category => category.id === categoryId)
    )
  }

  // Search by location (city or country)
  searchByLocation(location: string): Course[] {
    const normalizedLocation = location.toLowerCase()

    return this.data.filter(
      course =>
        course.city.name.toLowerCase().includes(normalizedLocation) ||
        course.country.name.toLowerCase().includes(normalizedLocation)
    )
  }

  // Advanced search with filters
  advancedSearch(params: {
    query?: string
    categoryId?: number
    categoryName?: string
    cityName?: string
    countryName?: string
    minPrice?: number
    maxPrice?: number
    locale?: "en" | "ar"
  }): Course[] {
    let results = this.data

    // Apply text search if query provided
    if (params.query) {
      const searchResults = this.search(params.query, params.locale)
      const searchIds = new Set(searchResults.map(r => r.id))
      results = results.filter(course => searchIds.has(course.id))
    }

    // Apply category ID filter
    if (params.categoryId) {
      results = results.filter(course =>
        course.categories.some(category => category.id === params.categoryId)
      )
    }

    // Apply category name filter
    if (params.categoryName) {
      results = results.filter(course =>
        course.categories.some(
          category =>
            category.name.toLowerCase() === params.categoryName!.toLowerCase()
        )
      )
    }

    // Apply city filter
    if (params.cityName) {
      results = results.filter(
        course =>
          course.city.name.toLowerCase() === params.cityName!.toLowerCase()
      )
    }

    // Apply country filter
    if (params.countryName) {
      results = results.filter(
        course =>
          course.country.name.toLowerCase() ===
          params.countryName!.toLowerCase()
      )
    }

    // Apply price filters
    if (params.minPrice !== undefined) {
      results = results.filter(course => course.price >= params.minPrice!)
    }

    if (params.maxPrice !== undefined) {
      results = results.filter(course => course.price <= params.maxPrice!)
    }

    return results
  }

  // Get courses by price range
  searchByPriceRange(minPrice: number, maxPrice: number): Course[] {
    return this.data.filter(
      course => course.price >= minPrice && course.price <= maxPrice
    )
  }

  // Get courses by date range
  searchByDateRange(startDate: string, endDate: string): Course[] {
    const start = new Date(startDate)
    const end = new Date(endDate)

    return this.data.filter(course => {
      const courseDate = new Date(course.startDate)
      return courseDate >= start && courseDate <= end
    })
  }

  // Normalize text for better search
  private normalizeText(text: string, locale: "en" | "ar"): string {
    let normalized = text.trim().toLowerCase()

    if (locale === "ar") {
      // Remove Arabic diacritics
      normalized = normalized
        .replace(/[\u064B-\u065F]/g, "") // Remove Arabic diacritics
        .replace(/[\u0610-\u061A]/g, "") // Remove Arabic punctuation
        .replace(/[\u06D6-\u06ED]/g, "") // Remove Quranic annotation signs
        .replace(/ء/g, "ا") // Replace hamza with alef
        .replace(/آ/g, "ا") // Replace alef with madda to alef
        .replace(/إ/g, "ا") // Replace alef with hamza below to alef
        .replace(/أ/g, "ا") // Replace alef with hamza above to alef
        .replace(/ة/g, "ه") // Replace teh marbuta with heh
        .replace(/ى/g, "ي") // Replace alef maksura with yeh
    }

    return normalized
  }

  // Get popular searches based on categories
  getPopularSearches(limit: number = 10): string[] {
    // Count category frequencies
    const categoryCount = new Map<string, number>()

    this.data.forEach(course => {
      course.categories.forEach(category => {
        categoryCount.set(
          category.name,
          (categoryCount.get(category.name) || 0) + 1
        )
      })
    })

    // Sort by frequency and return top categories
    return Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([categoryName]) => categoryName)
      .slice(0, limit)
  }

  // Get unique categories
  getCategories(): Category[] {
    const categoryMap = new Map<number, Category>()

    this.data.forEach(course => {
      course.categories.forEach(category => {
        categoryMap.set(category.id, category)
      })
    })

    return Array.from(categoryMap.values())
  }

  // Get unique locations
  getLocations(): Array<{ city: City; country: Country }> {
    const locationMap = new Map<string, { city: City; country: Country }>()

    this.data.forEach(course => {
      const key = `${course.city.id}-${course.country.id}`
      locationMap.set(key, {
        city: course.city,
        country: course.country,
      })
    })

    return Array.from(locationMap.values())
  }

  // Get unique cities
  getCities(): City[] {
    const cityMap = new Map<number, City>()

    this.data.forEach(course => {
      cityMap.set(course.city.id, course.city)
    })

    return Array.from(cityMap.values())
  }

  // Get unique countries
  getCountries(): Country[] {
    const countryMap = new Map<number, Country>()

    this.data.forEach(course => {
      countryMap.set(course.country.id, course.country)
    })

    return Array.from(countryMap.values())
  }

  // Spell check suggestions (basic implementation)
  getSpellingSuggestions(query: string, locale: "en" | "ar" = "en"): string[] {
    const normalizedQuery = this.normalizeText(query, locale)
    const suggestions: string[] = []

    // Search with very high threshold for typo tolerance
    const searchOptions = { ...fuseOptions, limit: 5, threshold: 0.8 }
    const fuzzyResults = this.fuse.search(normalizedQuery, searchOptions)

    fuzzyResults.forEach(result => {
      const originalCourse = this.data.find(
        course => course.id === result.item.id
      )
      if (originalCourse && !suggestions.includes(originalCourse.title)) {
        suggestions.push(originalCourse.title)
      }
    })

    return suggestions
  }

  // Get search statistics
  getSearchStats() {
    return {
      totalCourses: this.data.length,
      totalCategories: this.getCategories().length,
      totalCities: this.getCities().length,
      totalCountries: this.getCountries().length,
      priceRange: {
        min: Math.min(...this.data.map(c => c.price)),
        max: Math.max(...this.data.map(c => c.price)),
        average:
          this.data.reduce((sum, c) => sum + c.price, 0) / this.data.length,
      },
    }
  }
}

export default SearchService
