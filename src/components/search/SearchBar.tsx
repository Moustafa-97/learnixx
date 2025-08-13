// "use client"

// import { useState, useRef, useEffect, useCallback } from "react"
// import { useForm } from "react-hook-form"
// import { useRouter, usePathname } from "next/navigation"
// import { useLocale, useTranslations } from "next-intl"
// import { MdSearch } from "react-icons/md"
// import useStore from "@/store/useStore"
// import { useDebounce } from "@/hooks/useDebounce"
// import styles from "./SearchBar.module.scss"
// import { FaFilter } from "react-icons/fa"

// interface SearchFormData {
//   subject: string
//   location: string
// }

// export default function SearchBar() {
//   const t = useTranslations("search")
//   const locale = useLocale()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [isSearching, setIsSearching] = useState(false)
//   const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
//   // const [showLocationDropdown, setShowLocationDropdown] = useState(false)
//   const [subjectInput, setSubjectInput] = useState("")
//   const [locationInput, setLocationInput] = useState("")

//   const subjectRef = useRef<HTMLDivElement>(null)
//   // const locationRef = useRef<HTMLDivElement>(null)

//   const {
//     courseSearchParams,
//     setCourseSearchParams,
//     addRecentCourseSearch,
//     popularSubjects,
//     // popularLocations,
//   } = useStore()

//   const {
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     register,
//   } = useForm<SearchFormData>({
//     defaultValues: {
//       subject: courseSearchParams.subject || "",
//       location: courseSearchParams.location || "",
//     },
//   })

//   // Check if we're on the courses page
//   const isOnCoursesPage = pathname?.includes("/courses")

//   // Debounce the input values
//   const debouncedSubject = useDebounce(subjectInput, 300)
//   const debouncedLocation = useDebounce(locationInput, 300)

//   // Update store when debounced values change (only if on courses page for real-time search)
//   useEffect(() => {
//     if (isOnCoursesPage) {
//       setCourseSearchParams({
//         subject: debouncedSubject,
//         location: debouncedLocation,
//       })
//     }
//   }, [
//     debouncedSubject,
//     debouncedLocation,
//     setCourseSearchParams,
//     isOnCoursesPage,
//   ])

//   // Initialize input values from store
//   useEffect(() => {
//     setSubjectInput(courseSearchParams.subject || "")
//     setLocationInput(courseSearchParams.location || "")
//     setValue("subject", courseSearchParams.subject || "")
//     setValue("location", courseSearchParams.location || "")
//   }, [courseSearchParams.subject, courseSearchParams.location, setValue])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         subjectRef.current &&
//         !subjectRef.current.contains(event.target as Node)
//       ) {
//         setShowSubjectDropdown(false)
//       }
//       // if (
//       //   locationRef.current &&
//       //   !locationRef.current.contains(event.target as Node)
//       // ) {
//       //   setShowLocationDropdown(false)
//       // }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const handleSubjectChange = useCallback(
//     (value: string) => {
//       setSubjectInput(value)
//       setValue("subject", value)
//     },
//     [setValue]
//   )

//   // const handleLocationChange = useCallback(
//   //   (value: string) => {
//   //     setLocationInput(value)
//   //     setValue("location", value)
//   //   },
//   //   [setValue]
//   // )

//   // Update the SearchBar onSubmit function to use router.push instead of router.replace
//   const onSubmit = async (data: SearchFormData) => {
//     setIsSearching(true)

//     // Update store with search params
//     setCourseSearchParams({
//       subject: data.subject,
//       location: data.location,
//     })

//     // Add to recent searches
//     if (data.subject || data.location) {
//       addRecentCourseSearch(data)
//     }

//     // Build URL with params
//     const params = new URLSearchParams()
//     if (data.subject) params.set("subject", data.subject)
//     if (data.location) params.set("location", data.location)

//     const queryString = params.toString()
//     const coursesPath = `/${locale}/courses`
//     const newURL = queryString ? `${coursesPath}?${queryString}` : coursesPath

//     router.push(newURL)
//     setIsSearching(false)
//   }

//   // Also update the clear search function
//   // const handleClearSearch = () => {
//   //   setSubjectInput("")
//   //   setLocationInput("")
//   //   setValue("subject", "")
//   //   setValue("location", "")
//   //   setCourseSearchParams({ subject: "", location: "" })

//   //   // If on courses page, update URL to remove params
//   //   if (isOnCoursesPage) {
//   //     router.push(`/${locale}/courses`)
//   //   }
//   // }

//   const subjectSuggestions =
//     locale === "ar"
//       ? [
//           "تطوير الويب",
//           "علوم البيانات",
//           "التعلم الآلي",
//           "التصميم الجرافيكي",
//           "التسويق الرقمي",
//           "التصوير",
//           "الأعمال",
//           "اللغات",
//         ]
//       : popularSubjects

//   // const locationSuggestions =
//   //   locale === "ar"
//   //     ? [
//   //         "عبر الإنترنت",
//   //         "نيويورك",
//   //         "لندن",
//   //         "دبي",
//   //         "القاهرة",
//   //         "الرياض",
//   //         "عن بُعد",
//   //         "في الموقع",
//   //       ]
//   //     : popularLocations

//   const filteredSubjects = subjectSuggestions.filter(subject =>
//     subject.toLowerCase().includes(subjectInput.toLowerCase())
//   )

//   // const filteredLocations = locationSuggestions.filter(location =>
//   //   location.toLowerCase().includes(locationInput.toLowerCase())
//   // )

//   // Show clear button if there's any input
//   // const showClearButton = subjectInput || locationInput

//   return (
//     <div className={styles.searchContainer}>
//       <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
//         <div
//           style={isOnCoursesPage ? { width: "100%" } : {}}
//           className={styles.searchFields}>
//           {/* Subject Field */}
//           <div className={styles.fieldWrapper} ref={subjectRef}>
//             <div className={styles.inputWrapper}>
//               <MdSearch className={styles.inputIcon} />
//               <input
//                 {...register("subject")}
//                 type="text"
//                 placeholder={t("whatToLearnPlaceholder")}
//                 className={styles.input}
//                 value={subjectInput}
//                 onFocus={() => setShowSubjectDropdown(true)}
//                 onChange={e => handleSubjectChange(e.target.value)}
//               />
//             </div>
//             {showSubjectDropdown && filteredSubjects.length > 0 && (
//               <div className={styles.dropdown}>
//                 {filteredSubjects.map(subject => (
//                   <div
//                     key={subject}
//                     className={styles.dropdownItem}
//                     onClick={() => {
//                       handleSubjectChange(subject)
//                       setShowSubjectDropdown(false)
//                     }}>
//                     {subject}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.subject && (
//               <span className={styles.error}>{errors.subject.message}</span>
//             )}
//           </div>

//           {/* Location Field */}
//           {/* <div className={styles.fieldWrapper} ref={locationRef}>
//             <div className={styles.inputWrapper}>
//               <MdLocationOn className={styles.inputIcon} />
//               <input
//                 {...register("location")}
//                 type="text"
//                 placeholder={t("whereToLearnPlaceholder")}
//                 className={styles.input}
//                 value={locationInput}
//                 onFocus={() => setShowLocationDropdown(true)}
//                 onChange={e => handleLocationChange(e.target.value)}
//               />
//             </div>
//             {showLocationDropdown && filteredLocations.length > 0 && (
//               <div className={styles.dropdown}>
//                 {filteredLocations.map(location => (
//                   <div
//                     key={location}
//                     className={styles.dropdownItem}
//                     onClick={() => {
//                       handleLocationChange(location)
//                       setShowLocationDropdown(false)
//                     }}>
//                     {location}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.location && (
//               <span className={styles.error}>{errors.location.message}</span>
//             )}
//           </div> */}
//         </div>

//         <div className={styles.searchActions}>
//           {/* Clear Button */}
//           {isOnCoursesPage && (
//             <button
//               type="button"
//               // onClick={handleClearSearch}
//               className={styles.searchButton}
//               aria-label="Clear search">
//               <FaFilter />
//               <span>Filter</span>
//             </button>
//           )}

//           {/* Search Button */}
//           <button
//             type="submit"
//             disabled={isSearching}
//             className={`${!isOnCoursesPage ? styles.searchButton : styles.searchButtonCourses}`}>
//             {isSearching ? <div className={styles.spinner} /> : <MdSearch />}
//             <span>{isSearching ? t("searching") : t("search")}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { MdSearch } from "react-icons/md"
import useStore from "@/store/useStore"
import { useDebounce } from "@/hooks/useDebounce"
import styles from "./SearchBar.module.scss"
import { FaFilter } from "react-icons/fa"

interface SearchFormData {
  subject: string
  location: string
  search: string // Add general search field
}

interface SearchBarProps {
  type?: "courses" | "cities" // Add type prop
}

export default function SearchBar({ type = "courses" }: SearchBarProps) {
  const t = useTranslations("search")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
  const [subjectInput, setSubjectInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const subjectRef = useRef<HTMLDivElement>(null)

  const {
    courseSearchParams,
    setCourseSearchParams,
    addRecentCourseSearch,
    popularSubjects,
  } = useStore()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<SearchFormData>({
    defaultValues: {
      subject: courseSearchParams.subject || "",
      location: courseSearchParams.location || "",
      search: searchParams.get("search") || "",
    },
  })

  // Check if we're on the correct page
  const isOnCoursesPage = pathname?.includes("/courses")
  const isOnCitiesPage = pathname?.includes("/cities")

  // Debounce the input values
  const debouncedSubject = useDebounce(subjectInput, 300)
  const debouncedLocation = useDebounce(locationInput, 300)
  const debouncedSearch = useDebounce(searchInput, 300)

  // Update for cities search
  useEffect(() => {
    if (type === "cities" && isOnCitiesPage && debouncedSearch) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("search", debouncedSearch)
      params.set("page", "1") // Reset to page 1 on new search
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [debouncedSearch, type, isOnCitiesPage, router, pathname, searchParams])

  // Update store when debounced values change (only for courses)
  useEffect(() => {
    if (type === "courses" && isOnCoursesPage) {
      setCourseSearchParams({
        subject: debouncedSubject,
        location: debouncedLocation,
      })
    }
  }, [
    debouncedSubject,
    debouncedLocation,
    setCourseSearchParams,
    isOnCoursesPage,
    type,
  ])

  // Initialize search input from URL params for cities
  useEffect(() => {
    if (type === "cities") {
      const searchValue = searchParams.get("search") || ""
      setSearchInput(searchValue)
      setValue("search", searchValue)
    }
  }, [searchParams, setValue, type])

  // Initialize input values from store for courses
  useEffect(() => {
    if (type === "courses") {
      setSubjectInput(courseSearchParams.subject || "")
      setLocationInput(courseSearchParams.location || "")
      setValue("subject", courseSearchParams.subject || "")
      setValue("location", courseSearchParams.location || "")
    }
  }, [courseSearchParams.subject, courseSearchParams.location, setValue, type])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(event.target as Node)
      ) {
        setShowSubjectDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubjectChange = useCallback(
    (value: string) => {
      setSubjectInput(value)
      setValue("subject", value)
    },
    [setValue]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value)
      setValue("search", value)
    },
    [setValue]
  )

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)

    if (type === "cities") {
      // Handle cities search
      const params = new URLSearchParams()
      if (data.search) {
        params.set("search", data.search)
        params.set("page", "1") // Reset to page 1
      }

      const queryString = params.toString()
      const citiesPath = `/${locale}/cities`
      const newURL = queryString ? `${citiesPath}?${queryString}` : citiesPath

      router.push(newURL)
    } else {
      // Handle courses search (existing logic)
      setCourseSearchParams({
        subject: data.subject,
        location: data.location,
      })

      if (data.subject || data.location) {
        addRecentCourseSearch(data)
      }

      const params = new URLSearchParams()
      if (data.subject) params.set("subject", data.subject)
      if (data.location) params.set("location", data.location)

      const queryString = params.toString()
      const coursesPath = `/${locale}/courses`
      const newURL = queryString ? `${coursesPath}?${queryString}` : coursesPath

      router.push(newURL)
    }

    setIsSearching(false)
  }

  const handleClearSearch = () => {
    if (type === "cities") {
      setSearchInput("")
      setValue("search", "")
      router.push(`/${locale}/cities#all`)
    } else {
      setSubjectInput("")
      setLocationInput("")
      setValue("subject", "")
      setValue("location", "")
      setCourseSearchParams({ subject: "", location: "" })
      if (isOnCoursesPage) {
        router.push(`/${locale}/courses`)
      }
    }
  }

  const subjectSuggestions =
    locale === "ar"
      ? [
          "تطوير الويب",
          "علوم البيانات",
          "التعلم الآلي",
          "التصميم الجرافيكي",
          "التسويق الرقمي",
          "التصوير",
          "الأعمال",
          "اللغات",
        ]
      : popularSubjects

  const filteredSubjects = subjectSuggestions.filter(subject =>
    subject.toLowerCase().includes(subjectInput.toLowerCase())
  )

  // Show clear button if there's any input
  const showClearButton =
    type === "cities" ? searchInput : subjectInput || locationInput

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
        <div
          style={isOnCoursesPage || isOnCitiesPage ? { width: "100%" } : {}}
          className={styles.searchFields}>
          {type === "cities" ? (
            // City search - single search field
            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <MdSearch className={styles.inputIcon} />
                <input
                  {...register("search")}
                  type="text"
                  placeholder={
                    t("searchCitiesPlaceholder") || "Search cities..."
                  }
                  className={styles.input}
                  value={searchInput}
                  onChange={e => handleSearchChange(e.target.value)}
                />
              </div>
              {errors.search && (
                <span className={styles.error}>{errors.search.message}</span>
              )}
            </div>
          ) : (
            // Course search - subject field
            <div className={styles.fieldWrapper} ref={subjectRef}>
              <div className={styles.inputWrapper}>
                <MdSearch className={styles.inputIcon} />
                <input
                  {...register("subject")}
                  type="text"
                  placeholder={t("whatToLearnPlaceholder")}
                  className={styles.input}
                  value={subjectInput}
                  onFocus={() => setShowSubjectDropdown(true)}
                  onChange={e => handleSubjectChange(e.target.value)}
                />
              </div>
              {showSubjectDropdown && filteredSubjects.length > 0 && (
                <div className={styles.dropdown}>
                  {filteredSubjects.map(subject => (
                    <div
                      key={subject}
                      className={styles.dropdownItem}
                      onClick={() => {
                        handleSubjectChange(subject)
                        setShowSubjectDropdown(false)
                      }}>
                      {subject}
                    </div>
                  ))}
                </div>
              )}
              {errors.subject && (
                <span className={styles.error}>{errors.subject.message}</span>
              )}
            </div>
          )}
        </div>

        <div className={styles.searchActions}>
          {/* Clear Button */}
          {((isOnCoursesPage && type === "courses") ||
            (isOnCitiesPage && type === "cities")) &&
            showClearButton && (
              <button
                type="button"
                onClick={handleClearSearch}
                className={styles.clearButton}
                aria-label="Clear search">
                Clear
              </button>
            )}

          {/* Filter Button - only for courses */}
          {isOnCoursesPage && type === "courses" && (
            <button
              type="button"
              className={styles.searchButton}
              aria-label="Filter">
              <FaFilter />
              <span>Filter</span>
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={isSearching}
            className={`${isOnCoursesPage || isOnCitiesPage ? styles.searchButtonCourses : styles.searchButton}`}>
            {isSearching ? <div className={styles.spinner} /> : <MdSearch />}
            <span>{isSearching ? t("searching") : t("search")}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
