"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
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
  search: string
}

interface SearchBarProps {
  type?: "courses" | "cities"
}

interface Category {
  id: number
  name: string
}

export default function SearchBar({ type = "courses" }: SearchBarProps) {
  const t = useTranslations("search")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)
  const [subjectInput, setSubjectInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [searchInput, setSearchInput] = useState("")

  // New state for categories dropdown
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })

  const subjectRef = useRef<HTMLDivElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)

  const { courseSearchParams, setCourseSearchParams, addRecentCourseSearch } =
    useStore()

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

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      if (type === "courses" && categories.length === 0) {
        setIsLoadingCategories(true)
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/api/v1/courses/categories`,
            {
              headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
              },
            }
          )
          // if (response.ok) {
          const data = await response.json()
          setCategories(data)
          // }
        } catch (error) {
          console.error("Failed to fetch categories:", error)
        } finally {
          setIsLoadingCategories(false)
        }
      }
    }
    fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, categories.length])

  // Initialize selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(Number(categoryParam))
    }
  }, [searchParams])

  // Update dropdown position when it opens
  useEffect(() => {
    if (showCategoriesDropdown && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 220),
      })
    }
  }, [showCategoriesDropdown])

  // Handle click outside for categories dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node) &&
        !document
          .getElementById("categories-dropdown")
          ?.contains(event.target as Node)
      ) {
        setShowCategoriesDropdown(false)
      }
    }

    if (showCategoriesDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCategoriesDropdown])

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

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setShowCategoriesDropdown(false)

    // Update URL with category param
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId) {
      params.set("category", categoryId.toString())
    } else {
      params.delete("category")
    }

    const queryString = params.toString()
    const coursesPath = `/${locale}/courses`
    const newURL = queryString ? `${coursesPath}?${queryString}` : coursesPath

    router.push(newURL)
  }

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
      // Preserve category if selected
      if (selectedCategory) params.set("category", selectedCategory.toString())

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
      setSelectedCategory(null)
      if (isOnCoursesPage) {
        router.push(`/${locale}/courses`)
      }
    }
  }

  // Show clear button if there's any input
  const showClearButton =
    type === "cities"
      ? searchInput
      : subjectInput || locationInput || selectedCategory

  // Get selected category name
  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)?.name
    : null

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
                    onChange={e => handleSubjectChange(e.target.value)}
                  />
                </div>
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
          {isOnCoursesPage && type === "courses" && (
            <button
              ref={filterButtonRef}
              type="button"
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              className={`${styles.searchButton} ${selectedCategory ? styles.active : ""}`}
              aria-label="Filter">
              <FaFilter />
              <span>{selectedCategoryName || "Filter"}</span>
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

      {/* Categories Dropdown Portal */}
      {showCategoriesDropdown &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            id="categories-dropdown"
            className={styles.categoriesDropdown}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
             
            }}>
            {isLoadingCategories ? (
              <div className={styles.dropdownItem}>Loading categories...</div>
            ) : (
              <>
                {selectedCategory && (
                  <div
                    className={`${styles.dropdownItem} ${styles.clearCategory}`}
                    onClick={() => handleCategorySelect(null)}>
                    Clear category filter
                  </div>
                )}
                {categories.map(category => (
                  <div
                    key={category.id}
                    className={`${styles.dropdownItem} ${selectedCategory === category.id ? styles.selected : ""}`}
                    onClick={() => handleCategorySelect(category.id)}>
                    {category.name}
                  </div>
                ))}
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}
