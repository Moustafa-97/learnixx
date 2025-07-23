"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { MdSearch, MdLocationOn } from "react-icons/md"
import useStore from "@/store/useStore"
import styles from "./SearchBar.module.scss"

interface SearchFormData {
  subject: string
  location: string
}

export default function SearchBar() {
  const t = useTranslations("search")
  const locale = useLocale()
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [subjectFilter, setSubjectFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const subjectRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  const {
    courseSearchParams,
    setCourseSearchParams,
    addRecentCourseSearch,
    popularSubjects,
    popularLocations,
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
    },
  })

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(event.target as Node)
      ) {
        setShowSubjectDropdown(false)
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    setCourseSearchParams(data)

    if (data.subject || data.location) {
      addRecentCourseSearch(data)
    }

    const queryParams = new URLSearchParams()
    if (data.subject) queryParams.append("subject", data.subject)
    if (data.location) queryParams.append("location", data.location)

    router.push(`/${locale}/courses?${queryParams.toString()}`)
    setIsSearching(false)
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

  const locationSuggestions =
    locale === "ar"
      ? [
          "عبر الإنترنت",
          "نيويورك",
          "لندن",
          "دبي",
          "القاهرة",
          "الرياض",
          "عن بُعد",
          "في الموقع",
        ]
      : popularLocations

  const filteredSubjects = subjectSuggestions.filter(subject =>
    subject.toLowerCase().includes(subjectFilter.toLowerCase())
  )

  const filteredLocations = locationSuggestions.filter(location =>
    location.toLowerCase().includes(locationFilter.toLowerCase())
  )

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
        <div className={styles.searchFields}>
          {/* Subject Field */}
          <div className={styles.fieldWrapper} ref={subjectRef}>
            <div className={styles.inputWrapper}>
              <MdSearch className={styles.inputIcon} />
              <input
                {...register("subject")}
                type="text"
                placeholder={t("whatToLearnPlaceholder")}
                className={styles.input}
                onFocus={() => setShowSubjectDropdown(true)}
                onChange={e => {
                  setSubjectFilter(e.target.value)
                  setValue("subject", e.target.value)
                }}
              />
            </div>
            {showSubjectDropdown && filteredSubjects.length > 0 && (
              <div className={styles.dropdown}>
                {filteredSubjects.map(subject => (
                  <div
                    key={subject}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setValue("subject", subject)
                      setShowSubjectDropdown(false)
                      setSubjectFilter(subject)
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

          {/* Location Field */}
          <div className={styles.fieldWrapper} ref={locationRef}>
            <div className={styles.inputWrapper}>
              <MdLocationOn className={styles.inputIcon} />
              <input
                {...register("location")}
                type="text"
                placeholder={t("whereToLearnPlaceholder")}
                className={styles.input}
                onFocus={() => setShowLocationDropdown(true)}
                onChange={e => {
                  setLocationFilter(e.target.value)
                  setValue("location", e.target.value)
                }}
              />
            </div>
            {showLocationDropdown && filteredLocations.length > 0 && (
              <div className={styles.dropdown}>
                {filteredLocations.map(location => (
                  <div
                    key={location}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setValue("location", location)
                      setShowLocationDropdown(false)
                      setLocationFilter(location)
                    }}>
                    {location}
                  </div>
                ))}
              </div>
            )}
            {errors.location && (
              <span className={styles.error}>{errors.location.message}</span>
            )}
          </div>
        </div>
        {/* Search Button */}
        <button
          type="submit"
          disabled={isSearching}
          className={styles.searchButton}>
          {isSearching ? <div className={styles.spinner} /> : <div> </div>}
          <span>{isSearching ? t("searching") : t("search")}</span>
        </button>
      </form>
    </div>
  )
}
