import { Course } from "@/types/courses"
import Fuse from "fuse.js"
import type { IFuseOptions } from "fuse.js"
// Define your searchable data structure
export interface SearchableItem {
  id: string
  image?: string | undefined
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  category: string
  categoryAr?: string
  startDate?: string
  startDateAr?: string
  tags: string[]
  flag?: string
  location?: string
  locationAr?: string
  price: number
  instructor?: string
  instructorAr?: string
  duration?: string
  durationAr?: string
  level?: string
  levelAr?: string
  rating: number
  students: number
}

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<Course> = {
  // Fields to search in
  keys: [
    { name: "title", weight: 2 },
    { name: "titleAr", weight: 2 },
    { name: "description", weight: 1 },
    { name: "descriptionAr", weight: 1 },
    { name: "category", weight: 1.5 },
    { name: "categoryAr", weight: 1.5 },
    { name: "tags", weight: 1 },
    { name: "location", weight: 1 },
    { name: "locationAr", weight: 1 },
    { name: "instructor", weight: 1 },
    { name: "instructorAr", weight: 1 },
    { name: "duration", weight: 1 },
    { name: "durationAr", weight: 1 },
    { name: "level", weight: 1 },
    { name: "levelAr", weight: 1 },
    { name: "startDate", weight: 1 },
    { name: "startDateAr", weight: 1 },
    { name: "price", weight: 0.5 },
    { name: "rating", weight: 0.5 },
    { name: "students", weight: 0.5 },
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
  // For Arabic support
  useExtendedSearch: true,
  ignoreLocation: true, // Important for Arabic text
  ignoreFieldNorm: true,
}

class SearchService {
  private fuse: Fuse<Course>
  private data: Course[]

  constructor(data: Course[]) {
    this.data = data
    this.fuse = new Fuse(data, fuseOptions)
  }

  // Update search data
  updateData(data: Course[]) {
    this.data = data
    this.fuse = new Fuse(data, fuseOptions)
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

    // Return items sorted by score
    return results.map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches,
    }))
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
    const results = this.fuse.search(normalizedQuery, { limit })

    // Extract unique suggestions from titles and categories
    const suggestions = new Set<string>()

    results.forEach(result => {
      if (locale === "ar") {
        if (result.item.titleAr) suggestions.add(result.item.titleAr)
        if (result.item.categoryAr) suggestions.add(result.item.categoryAr)
      } else {
        suggestions.add(result.item.title)
        suggestions.add(result.item.category)
      }
    })

    return Array.from(suggestions).slice(0, limit)
  }

  // Search by category
  searchByCategory(category: string, locale: "en" | "ar" = "en"): Course[] {
    return this.data.filter(item => {
      const itemCategory =
        locale === "ar" ? item.categoryAr || item.category : item.category
      return itemCategory.toLowerCase() === category.toLowerCase()
    })
  }

  // Advanced search with filters
  advancedSearch(params: {
    query?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    tags?: string[]
    locale?: "en" | "ar"
  }): Course[] {
    let results = this.data

    // Apply text search if query provided
    if (params.query) {
      const searchResults = this.search(params.query, params.locale)
      const searchIds = new Set(searchResults.map(r => r.id))
      results = results.filter(item => searchIds.has(item.id))
    }

    // Apply category filter
    if (params.category) {
      results = results.filter(item => {
        const itemCategory =
          params.locale === "ar"
            ? item.categoryAr || item.category
            : item.category
        return itemCategory.toLowerCase() === params.category!.toLowerCase()
      })
    }

    // Apply price filters
    if (params.minPrice !== undefined) {
      results = results.filter(
        item => item.price && item.price >= params.minPrice!
      )
    }
    if (params.maxPrice !== undefined) {
      results = results.filter(
        item => item.price && item.price <= params.maxPrice!
      )
    }

    // Apply tag filters
    // Apply tag filters
    if (params.tags && params.tags.length > 0) {
      results = results.filter(item =>
        params.tags!.some(tag => item.tags.includes(tag))
      )
    }

    return results
  }

  // Normalize text for better search (handles Arabic)
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

  // Get popular searches
  getPopularSearches(locale: "en" | "ar" = "en", limit: number = 10): string[] {
    // In a real app, this would come from analytics
    // For now, return popular categories
    const categories = this.data
      .map(item =>
        locale === "ar" ? item.categoryAr || item.category : item.category
      )
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, limit)

    return categories
  }

  // Spell check suggestions (basic implementation)
  getSpellingSuggestions(query: string, locale: "en" | "ar" = "en"): string[] {
    const normalizedQuery = this.normalizeText(query, locale)
    const suggestions: string[] = []

    // Search with very high threshold for typo tolerance
    const searchOptions = { ...fuseOptions, limit: 5, threshold: 0.8 }
    const fuzzyResults = this.fuse.search(normalizedQuery, searchOptions)

    fuzzyResults.forEach(result => {
      const title =
        locale === "ar"
          ? result.item.titleAr || result.item.title
          : result.item.title
      if (!suggestions.includes(title)) {
        suggestions.push(title)
      }
    })

    return suggestions
  }
}

export default SearchService
