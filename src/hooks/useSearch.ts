import { useCallback, useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import useStore from "@/store/useStore"
import SearchService, { SearchableItem } from "@/lib/searchService"
import { debounce } from "@/lib/utils"

// Extend SearchableItem for course-specific fields
export interface CourseItem extends SearchableItem {
  location?: string;
  locationAr?: string;
  instructor?: string;
  instructorAr?: string;
  duration?: string;
  durationAr?: string;
  level?: string;
  levelAr?: string;
  rating?: number;
  students?: number;
}

// Sample course data - replace with your actual data or API call
const sampleCourseData: CourseItem[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    titleAr: "معسكر تطوير الويب الكامل",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and build real projects",
    descriptionAr: "تعلم HTML و CSS و JavaScript و React و Node.js وقم ببناء مشاريع حقيقية",
    category: "Web Development",
    categoryAr: "تطوير الويب",
    tags: ["javascript", "react", "nodejs", "html", "css", "frontend", "backend", "web development"],
    location: "Online",
    locationAr: "عبر الإنترنت",
    price: 599,
    instructor: "John Smith",
    instructorAr: "جون سميث",
    duration: "12 weeks",
    durationAr: "12 أسبوع",
    level: "Beginner to Advanced",
    levelAr: "من المبتدئ إلى المتقدم",
    rating: 4.8,
    students: 15420,
  },
  {
    id: "2",
    title: "Data Science with Python",
    titleAr: "علوم البيانات مع بايثون",
    description: "Master data analysis, machine learning, and visualization with Python",
    descriptionAr: "احترف تحليل البيانات والتعلم الآلي والتصور المرئي مع بايثون",
    category: "Data Science",
    categoryAr: "علوم البيانات",
    tags: ["python", "data science", "machine learning", "pandas", "numpy", "data analysis"],
    location: "Online",
    locationAr: "عبر الإنترنت",
    price: 799,
    instructor: "Sarah Johnson",
    instructorAr: "سارة جونسون",
    duration: "10 weeks",
    durationAr: "10 أسابيع",
    level: "Intermediate",
    levelAr: "متوسط",
    rating: 4.9,
    students: 12350,
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    titleAr: "دورة احتراف التسويق الرقمي",
    description: "Learn SEO, Social Media Marketing, Content Marketing, and PPC",
    descriptionAr: "تعلم تحسين محركات البحث والتسويق عبر وسائل التواصل الاجتماعي",
    category: "Digital Marketing",
    categoryAr: "التسويق الرقمي",
    tags: ["marketing", "seo", "social media", "digital marketing", "advertising"],
    location: "New York",
    locationAr: "نيويورك",
    price: 399,
    instructor: "Mike Chen",
    instructorAr: "مايك تشين",
    duration: "8 weeks",
    durationAr: "8 أسابيع",
    level: "Beginner",
    levelAr: "مبتدئ",
    rating: 4.7,
    students: 8920,
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    titleAr: "أساسيات تصميم واجهة المستخدم",
    description: "Learn design principles, Figma, and create stunning user interfaces",
    descriptionAr: "تعلم مبادئ التصميم وبرنامج Figma وإنشاء واجهات مستخدم مذهلة",
    category: "Design",
    categoryAr: "التصميم",
    tags: ["design", "ui", "ux", "figma", "user interface", "user experience"],
    location: "London",
    locationAr: "لندن",
    price: 449,
    instructor: "Emily Davis",
    instructorAr: "إميلي ديفيس",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    level: "Beginner to Intermediate",
    levelAr: "من المبتدئ إلى المتوسط",
    rating: 4.8,
    students: 6780,
  },
  {
    id: "5",
    title: "Photography Workshop",
    titleAr: "ورشة التصوير الفوتوغرافي",
    description: "Hands-on photography training with professional equipment",
    descriptionAr: "تدريب عملي على التصوير بمعدات احترافية",
    category: "Photography",
    categoryAr: "التصوير",
    tags: ["photography", "camera", "editing", "lightroom", "photoshop"],
    location: "Dubai",
    locationAr: "دبي",
    price: 899,
    instructor: "James Wilson",
    instructorAr: "جيمس ويلسون",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    level: "All Levels",
    levelAr: "جميع المستويات",
    rating: 4.9,
    students: 3210,
  },
  {
    id: "6",
    title: "Business English Course",
    titleAr: "دورة اللغة الإنجليزية للأعمال",
    description: "Improve your business English communication skills",
    descriptionAr: "حسّن مهاراتك في اللغة الإنجليزية للأعمال",
    category: "Languages",
    categoryAr: "اللغات",
    tags: ["english", "business", "communication", "language learning"],
    location: "Cairo",
    locationAr: "القاهرة",
    price: 299,
    instructor: "Elizabeth Brown",
    instructorAr: "إليزابيث براون",
    duration: "8 weeks",
    durationAr: "8 أسابيع",
    level: "Intermediate to Advanced",
    levelAr: "من المتوسط إلى المتقدم",
    rating: 4.7,
    students: 4560,
  },
  {
    id: "7",
    title: "Machine Learning with TensorFlow",
    titleAr: "التعلم الآلي مع TensorFlow",
    description: "Build and deploy machine learning models",
    descriptionAr: "بناء ونشر نماذج التعلم الآلي",
    category: "Machine Learning",
    categoryAr: "التعلم الآلي",
    tags: ["machine learning", "tensorflow", "python", "ai", "deep learning"],
    location: "Remote",
    locationAr: "عن بُعد",
    price: 899,
    instructor: "Dr. Alan Turner",
    instructorAr: "د. آلان تيرنر",
    duration: "14 weeks",
    durationAr: "14 أسبوع",
    level: "Advanced",
    levelAr: "متقدم",
    rating: 4.9,
    students: 7890,
  },
  {
    id: "8",
    title: "Arabic Calligraphy Masterclass",
    titleAr: "دورة احتراف الخط العربي",
    description: "Learn traditional Arabic calligraphy art",
    descriptionAr: "تعلم فن الخط العربي التقليدي",
    category: "Art",
    categoryAr: "الفنون",
    tags: ["calligraphy", "arabic", "art", "traditional", "culture"],
    location: "Riyadh",
    locationAr: "الرياض",
    price: 349,
    instructor: "Ahmed Hassan",
    instructorAr: "أحمد حسن",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    level: "Beginner",
    levelAr: "مبتدئ",
    rating: 4.8,
    students: 2890,
  },
]

export function useSearch() {
  const locale = useLocale() as "en" | "ar"
  const searchServiceRef = useRef<SearchService>()

  const {
    courseSearchParams,
    setCourseSearchParams,
    recentCourseSearches,
    addRecentCourseSearch,
  } = useStore()

  // Initialize search service with course data
  useEffect(() => {
    searchServiceRef.current = new SearchService(sampleCourseData)
  }, [])

  // Search courses by subject and location
  const searchCourses = useCallback(
    (subject: string, location: string): CourseItem[] => {
      if (!searchServiceRef.current) return []

      let results = sampleCourseData

      // Filter by subject
      if (subject && subject.trim()) {
        const subjectResults = searchServiceRef.current.search(subject, locale)
        const subjectIds = new Set(subjectResults.map(r => r.id))
        results = results.filter(course => subjectIds.has(course.id))
      }

      // Filter by location
      if (location && location.trim()) {
        results = results.filter(course => {
          const courseLocation = locale === 'ar' ? 
            (course.locationAr || course.location) : 
            course.location
          return courseLocation?.toLowerCase().includes(location.toLowerCase())
        })
      }

      return results as CourseItem[]
    },
    [locale]
  )

  // Get subject suggestions based on input
  const getSubjectSuggestions = useCallback(
    (input: string): string[] => {
      if (!input || input.trim().length < 1) return []

      const suggestions = new Set<string>()
      const normalizedInput = input.toLowerCase()

      sampleCourseData.forEach(course => {
        // Check title
        const title = locale === 'ar' ? course.titleAr : course.title
        if (title?.toLowerCase().includes(normalizedInput)) {
          suggestions.add(title)
        }

        // Check category
        const category = locale === 'ar' ? 
          (course.categoryAr || course.category) : 
          course.category
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
      
      sampleCourseData.forEach(course => {
        const location = locale === 'ar' ? 
          (course.locationAr || course.location) : 
          course.location
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
    
    sampleCourseData.forEach(course => {
      const category = locale === 'ar' ? 
        (course.categoryAr || course.category) : 
        course.category
      
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
    (category: string): CourseItem[] => {
      return sampleCourseData.filter(course => {
        const courseCategory = locale === 'ar' ? 
          (course.categoryAr || course.category) : 
          course.category
        return courseCategory?.toLowerCase() === category.toLowerCase()
      })
    },
    [locale]
  )

  // Get featured courses
  const getFeaturedCourses = useCallback((): CourseItem[] => {
    // Return top-rated courses with most students
    return [...sampleCourseData]
      .sort((a, b) => {
        const scoreA = (a.rating || 0) * (a.students || 0)
        const scoreB = (b.rating || 0) * (b.students || 0)
        return scoreB - scoreA
      })
      .slice(0, 6)
  }, [])

  // Get recent searches formatted for display
  const getRecentSearchesFormatted = useCallback((): string[] => {
    return recentCourseSearches.map(search => {
      const parts = []
      if (search.subject) parts.push(search.subject)
      if (search.location) parts.push(search.location)
      return parts.join(' - ')
    }).filter(Boolean)
  }, [recentCourseSearches])

  // Advanced search with multiple filters
  const advancedCourseSearch = useCallback(
    (params: {
      subject?: string;
      location?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      level?: string;
      minRating?: number;
    }): CourseItem[] => {
      let results = sampleCourseData

      // Apply subject filter
      if (params.subject && params.subject.trim()) {
        const searchResults = searchServiceRef.current?.search(params.subject, locale) || []
        const searchIds = new Set(searchResults.map(r => r.id))
        results = results.filter(course => searchIds.has(course.id))
      }

      // Apply location filter
      if (params.location && params.location.trim()) {
        results = results.filter(course => {
          const courseLocation = locale === 'ar' ? 
            (course.locationAr || course.location) : 
            course.location
          return courseLocation?.toLowerCase().includes(params.location!.toLowerCase())
        })
      }

      // Apply category filter
      if (params.category) {
        results = results.filter(course => {
          const courseCategory = locale === 'ar' ? 
            (course.categoryAr || course.category) : 
            course.category
          return courseCategory?.toLowerCase() === params.category!.toLowerCase()
        })
      }

      // Apply price filters
      if (params.minPrice !== undefined) {
        results = results.filter(course => 
          course.price && course.price >= params.minPrice!
        )
      }
      if (params.maxPrice !== undefined) {
        results = results.filter(course => 
          course.price && course.price <= params.maxPrice!
        )
      }

      // Apply level filter
      if (params.level) {
        results = results.filter(course => {
          const courseLevel = locale === 'ar' ? 
            (course.levelAr || course.level) : 
            course.level
          return courseLevel?.toLowerCase().includes(params.level!.toLowerCase())
        })
      }

      // Apply rating filter
      if (params.minRating !== undefined) {
        results = results.filter(course => 
          course.rating && course.rating >= params.minRating!
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
    
    // All courses (for debugging/testing)
    allCourses: sampleCourseData,
  }
}