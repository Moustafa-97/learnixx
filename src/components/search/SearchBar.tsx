// "use client"

// import { useState, useRef, useEffect, useCallback } from "react"
// import { useForm } from "react-hook-form"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import { useLocale, useTranslations } from "next-intl"
// import { MdSearch } from "react-icons/md"
// import useStore from "@/store/useStore"
// import { useDebounce } from "@/hooks/useDebounce"
// import styles from "./SearchBar.module.scss"
// import { FaFilter } from "react-icons/fa"

// interface SearchFormData {
//   subject: string
//   location: string
//   search: string // Add general search field
// }

// interface SearchBarProps {
//   type?: "courses" | "cities" // Add type prop
// }

// export default function SearchBar({ type = "courses" }: SearchBarProps) {
//   const t = useTranslations("search")
//   const locale = useLocale()
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const [isSearching, setIsSearching] = useState(false)
//   const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
//   const [subjectInput, setSubjectInput] = useState("")
//   const [locationInput, setLocationInput] = useState("")
//   const [searchInput, setSearchInput] = useState("")

//   const subjectRef = useRef<HTMLDivElement>(null)

//   const {
//     courseSearchParams,
//     setCourseSearchParams,
//     addRecentCourseSearch,
//     popularSubjects,
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
//       search: searchParams.get("search") || "",
//     },
//   })

//   // Check if we're on the correct page
//   const isOnCoursesPage = pathname?.includes("/courses")
//   const isOnCitiesPage = pathname?.includes("/cities")

//   // Debounce the input values
//   const debouncedSubject = useDebounce(subjectInput, 300)
//   const debouncedLocation = useDebounce(locationInput, 300)
//   const debouncedSearch = useDebounce(searchInput, 300)

//   // Update for cities search
//   useEffect(() => {
//     if (type === "cities" && isOnCitiesPage && debouncedSearch) {
//       const params = new URLSearchParams(searchParams.toString())
//       params.set("location", debouncedSearch)
//       params.set("page", "1") // Reset to page 1 on new search
//       router.push(`${pathname}?${params.toString()}`)
//     }
//   }, [debouncedSearch, type, isOnCitiesPage, router, pathname, searchParams])

//   // Update store when debounced values change (only for courses)
//   useEffect(() => {
//     if (type === "courses" && isOnCoursesPage) {
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
//     type,
//   ])

//   // Initialize search input from URL params for cities
//   useEffect(() => {
//     if (type === "cities") {
//       const searchValue = searchParams.get("location") || ""
//       setSearchInput(searchValue)
//       setValue("location", searchValue)
//     }
//   }, [searchParams, setValue, type])

//   // Initialize input values from store for courses
//   useEffect(() => {
//     if (type === "courses") {
//       setSubjectInput(courseSearchParams.subject || "")
//       setLocationInput(courseSearchParams.location || "")
//       setValue("subject", courseSearchParams.subject || "")
//       setValue("location", courseSearchParams.location || "")
//     }
//   }, [courseSearchParams.subject, courseSearchParams.location, setValue, type])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         subjectRef.current &&
//         !subjectRef.current.contains(event.target as Node)
//       ) {
//         setShowSubjectDropdown(false)
//       }
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

//   const handleSearchChange = useCallback(
//     (value: string) => {
//       setSearchInput(value)
//       setValue("location", value)
//     },
//     [setValue]
//   )

//   const onSubmit = async (data: SearchFormData) => {
//     setIsSearching(true)

//     if (type === "cities") {
//       // Handle cities search
//       const params = new URLSearchParams()
//       if (data.location) {
//         params.set("location", data.location)
//         params.set("page", "1") // Reset to page 1
//       }

//       const queryString = params.toString()
//       const citiesPath = `/${locale}/cities`
//       const newURL = queryString ? `${citiesPath}?${queryString}` : citiesPath

//       router.push(newURL)
//     } else {
//       // Handle courses search (existing logic)
//       setCourseSearchParams({
//         subject: data.subject,
//         location: data.location,
//       })

//       if (data.subject || data.location) {
//         addRecentCourseSearch(data)
//       }

//       const params = new URLSearchParams()
//       if (data.subject) params.set("subject", data.subject)
//       if (data.location) params.set("location", data.location)

//       const queryString = params.toString()
//       const coursesPath = `/${locale}/courses`
//       const newURL = queryString ? `${coursesPath}?${queryString}` : coursesPath

//       router.push(newURL)
//     }

//     setIsSearching(false)
//   }

//   const handleClearSearch = () => {
//     if (type === "cities") {
//       setSearchInput("")
//       setValue("location", "")
//       router.push(`/${locale}/cities#all`)
//     } else {
//       setSubjectInput("")
//       setLocationInput("")
//       setValue("subject", "")
//       setValue("location", "")
//       setCourseSearchParams({ subject: "", location: "" })
//       if (isOnCoursesPage) {
//         router.push(`/${locale}/courses`)
//       }
//     }
//   }

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

//   const filteredSubjects = subjectSuggestions.filter(subject =>
//     subject.toLowerCase().includes(subjectInput.toLowerCase())
//   )

//   // Show clear button if there's any input
//   const showClearButton =
//     type === "cities" ? searchInput : subjectInput || locationInput

//   return (
//     <div className={styles.searchContainer}>
//       <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
//         <div
//           style={isOnCoursesPage || isOnCitiesPage ? { width: "100%" } : {}}
//           className={styles.searchFields}>
//           {type === "cities" ? (
//             // City search - single search field
//             <div className={styles.fieldWrapper}>
//               <div className={styles.inputWrapper}>
//                 <MdSearch className={styles.inputIcon} />
//                 <input
//                   {...register("location")}
//                   type="text"
//                   placeholder={
//                     t("searchCitiesPlaceholder") || "location cities..."
//                   }
//                   className={styles.input}
//                   value={searchInput}
//                   onChange={e => handleSearchChange(e.target.value)}
//                 />
//               </div>
//               {errors.location && (
//                 <span className={styles.error}>{errors.location.message}</span>
//               )}
//             </div>
//           ) : (
//             // Course search - subject field
//             <div className={styles.fieldWrapper} ref={subjectRef}>
//               <div className={styles.inputWrapper}>
//                 <MdSearch className={styles.inputIcon} />
//                 <input
//                   {...register("subject")}
//                   type="text"
//                   placeholder={t("whatToLearnPlaceholder")}
//                   className={styles.input}
//                   value={subjectInput}
//                   onFocus={() => setShowSubjectDropdown(true)}
//                   onChange={e => handleSubjectChange(e.target.value)}
//                 />
//               </div>
//               {showSubjectDropdown && filteredSubjects.length > 0 && (
//                 <div className={styles.dropdown}>
//                   {filteredSubjects.map(subject => (
//                     <div
//                       key={subject}
//                       className={styles.dropdownItem}
//                       onClick={() => {
//                         handleSubjectChange(subject)
//                         setShowSubjectDropdown(false)
//                       }}>
//                       {subject}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {errors.subject && (
//                 <span className={styles.error}>{errors.subject.message}</span>
//               )}
//             </div>
//           )}
//         </div>

//         <div className={styles.searchActions}>
//           {/* Clear Button */}
//           {((isOnCoursesPage && type === "courses") ||
//             (isOnCitiesPage && type === "cities")) &&
//             showClearButton && (
//               <button
//                 type="button"
//                 onClick={handleClearSearch}
//                 className={styles.clearButton}
//                 aria-label="Clear search">
//                 Clear
//               </button>
//             )}

//           {/* Filter Button - only for courses */}
//           {isOnCoursesPage && type === "courses" && (
//             <button
//               type="button"
//               className={styles.searchButton}
//               aria-label="Filter">
//               <FaFilter />
//               <span>Filter</span>
//             </button>
//           )}

//           {/* Search Button */}
//           <button
//             type="submit"
//             disabled={isSearching}
//             className={`${isOnCoursesPage || isOnCitiesPage ? styles.searchButtonCourses : styles.searchButton}`}>
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
// import { FaFilter } from "react-icons/fa"

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
  // const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
  // const [setShowSubjectDropdown] = useState(false)
  const [subjectInput, setSubjectInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const subjectRef = useRef<HTMLDivElement>(null)

  const {
    courseSearchParams,
    setCourseSearchParams,
    addRecentCourseSearch,
    // popularSubjects,
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

  // Update store when debounced values change for both courses and cities
  useEffect(() => {
    if (type === "courses" && isOnCoursesPage) {
      setCourseSearchParams({
        subject: debouncedSubject,
        location: debouncedLocation,
      })
    } else if (type === "cities" && isOnCitiesPage) {
      // Use the same store params for cities search
      setCourseSearchParams({
        subject: "", // Clear subject for cities
        location: debouncedSearch,
      })
    }
  }, [
    debouncedSubject,
    debouncedLocation,
    debouncedSearch,
    setCourseSearchParams,
    isOnCoursesPage,
    isOnCitiesPage,
    type,
  ])

  // Initialize search input from store for cities
  useEffect(() => {
    if (type === "cities" && isOnCitiesPage) {
      const searchValue = courseSearchParams.location || ""
      setSearchInput(searchValue)
      setValue("location", searchValue)
    }
  }, [courseSearchParams.location, setValue, type, isOnCitiesPage])

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
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       subjectRef.current &&
  //       !subjectRef.current.contains(event.target as Node)
  //     ) {
  //       setShowSubjectDropdown(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => document.removeEventListener("mousedown", handleClickOutside)
  // }, [])

  const handleSubjectChange = useCallback(
    (value: string) => {
      setSubjectInput(value)
      setValue("subject", value)
    },
    [setValue]
  )

  const handleLocationChange = useCallback(
    (value: string) => {
      setLocationInput(value)
      setValue("location", value)
    },
    [setValue]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value)
      setValue("location", value)
    },
    [setValue]
  )

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)

    if (type === "cities") {
      // Handle cities search - update store
      setCourseSearchParams({
        subject: "",
        location: data.location,
      })

      // Update URL for shareable links
      const params = new URLSearchParams()
      if (data.location) {
        params.set("location", data.location)
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

      // Update URL for shareable links
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
      setValue("location", "")
      setCourseSearchParams({ subject: "", location: "" })
      router.push(`/${locale}/cities`)
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

  // const subjectSuggestions =
  //   locale === "ar"
  //     ? [
  //         "تطوير الويب",
  //         "علوم البيانات",
  //         "التعلم الآلي",
  //         "التصميم الجرافيكي",
  //         "التسويق الرقمي",
  //         "التصوير",
  //         "الأعمال",
  //         "اللغات",
  //       ]
  //     : popularSubjects

  // const filteredSubjects = subjectSuggestions.filter(subject =>
  //   subject.toLowerCase().includes(subjectInput.toLowerCase())
  // )

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
                  {...register("location")}
                  type="text"
                  placeholder={
                    t("searchCitiesPlaceholder") || "Search cities..."
                  }
                  className={styles.input}
                  value={searchInput}
                  onChange={e => handleSearchChange(e.target.value)}
                />
              </div>
              {errors.location && (
                <span className={styles.error}>{errors.location.message}</span>
              )}
            </div>
          ) : (
            <>
              {/* Course search - subject field */}
              <div className={styles.fieldWrapper} ref={subjectRef}>
                <div className={styles.inputWrapper}>
                  <MdSearch className={styles.inputIcon} />
                  <input
                    {...register("subject")}
                    type="text"
                    placeholder={t("whatToLearnPlaceholder")}
                    className={styles.input}
                    value={subjectInput}
                    // onFocus={() => setShowSubjectDropdown(true)}
                    onChange={e => handleSubjectChange(e.target.value)}
                  />
                </div>
                {/* {showSubjectDropdown && filteredSubjects.length > 0 && (
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
                )} */}
                {errors.subject && (
                  <span className={styles.error}>{errors.subject.message}</span>
                )}
              </div>

              {/* Course search - location field (only show on non-course pages) */}
              {!isOnCoursesPage && isOnCitiesPage && (
                <div className={styles.fieldWrapper}>
                  <div className={styles.inputWrapper}>
                    <MdSearch className={styles.inputIcon} />
                    <input
                      {...register("location")}
                      type="text"
                      placeholder={t("locationPlaceholder")}
                      className={styles.input}
                      value={locationInput}
                      onChange={e => handleLocationChange(e.target.value)}
                    />
                  </div>
                  {errors.location && (
                    <span className={styles.error}>
                      {errors.location.message}
                    </span>
                  )}
                </div>
              )}
            </>
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
          {/* {isOnCoursesPage && type === "courses" && (
            <button
              type="button"
              className={styles.searchButton}
              aria-label="Filter">
              <FaFilter />
              <span>Filter</span>
            </button>
          )} */}

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
