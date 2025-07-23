import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CourseSearchParams {
  subject: string
  location: string
}

interface SearchState {
  // Course search specific
  courseSearchParams: CourseSearchParams
  setCourseSearchParams: (params: CourseSearchParams) => void

  // Recent searches
  recentCourseSearches: CourseSearchParams[]
  addRecentCourseSearch: (params: CourseSearchParams) => void
  clearRecentSearches: () => void

  // Popular subjects and locations (for suggestions)
  popularSubjects: string[]
  popularLocations: string[]
}

interface AppState extends SearchState {
  // User
  user: User | null
  setUser: (user: User | null) => void

  // UI State
  sidebarOpen: boolean
  toggleSidebar: () => void

  // Language preference
  preferredLocale: "en" | "ar"
  setPreferredLocale: (locale: "en" | "ar") => void
}

interface User {
  id: string
  name: string
  email: string
}

const useStore = create<AppState>()(
  persist(
    set => ({
      // Course Search
      courseSearchParams: {
        subject: "",
        location: "",
      },
      setCourseSearchParams: params => set({ courseSearchParams: params }),

      recentCourseSearches: [],
      addRecentCourseSearch: params =>
        set(state => {
          // Don't add empty searches
          if (!params.subject && !params.location) return state

          // Check if this search already exists
          const exists = state.recentCourseSearches.some(
            search =>
              search.subject === params.subject &&
              search.location === params.location
          )

          if (exists) return state

          // Keep only last 5 searches
          const newSearches = [
            params,
            ...state.recentCourseSearches.slice(0, 4),
          ]
          return { recentCourseSearches: newSearches }
        }),

      clearRecentSearches: () => set({ recentCourseSearches: [] }),

      // Sample popular data - in real app, this would come from API
      popularSubjects: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Graphic Design",
        "Digital Marketing",
        "Photography",
        "Business",
        "Languages",
      ],

      popularLocations: [
        "Online",
        "New York",
        "London",
        "Dubai",
        "Cairo",
        "Riyadh",
        "Remote",
        "On-site",
      ],

      // User
      user: null,
      setUser: user => set({ user }),

      // UI State
      sidebarOpen: false,
      toggleSidebar: () =>
        set(state => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      // Language
      preferredLocale: "en",
      setPreferredLocale: locale => set({ preferredLocale: locale }),
    }),
    {
      name: "app-storage",
      partialize: state => ({
        recentCourseSearches: state.recentCourseSearches,
        preferredLocale: state.preferredLocale,
      }),
    }
  )
)

export default useStore
