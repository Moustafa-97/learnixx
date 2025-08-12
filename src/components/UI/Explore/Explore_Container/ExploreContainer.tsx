// components/ExploreContainer/ExploreContainer.tsx
"use client"
import React, { useState, useRef, useEffect } from "react"
import styles from "./ExploreContainer.module.scss"
import ExploreCard from "./card/ExploreCard"
import { CoursesApiResponse } from "@/types/courses"
import { useLocale } from "next-intl"
import useStore from "@/store/useStore"
import ExploreHeader from "../Explore_Header/ExploreHeader"
import LastWeekend from "./lastWeekend/LastWeekend"
import StayTuned from "./stayTuned/StayTuned"
import axios from "axios"

export default function ExploreContainer() {
  const locale = useLocale() as "en" | "ar"
  const [activeTab, setActiveTab] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Loading states
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [coursesError, setCoursesError] = useState<string | null>(null)

  // Categories
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  )

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        setCategoriesError(null)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses/categories`,
          {
            headers: {
              "Accept-Language": locale,
            },
          }
        )
        // Add "All" category at the beginning
        setCategories([
          { id: 0, name: locale === "ar" ? "الكل" : "All" },
          ...response.data,
        ])
      } catch (err) {
        console.error("Error fetching categories:", err)
        setCategoriesError("Failed to load categories")
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [locale])

  // Courses
  const [courses, setCourses] = useState<CoursesApiResponse>()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true)
        setCoursesError(null)

        let url = `${process.env.NEXT_PUBLIC_API}/api/v1/courses`

        if (activeTab > 0) {
          // Manual array parameter building
          const categoryId = [activeTab] // or multiple IDs
          const queryParams = categoryId.map(id => `categoryId=${id}`).join("&")
          url += `?${queryParams}`
          // This creates: categoryIds=1&categoryIds=2&categoryIds=3
        }

        const response = await axios.get(url, {
          headers: {
            "Accept-Language": locale,
          },
        })

        setCourses(response.data)
      } catch (err) {
        console.error("Error fetching courses:", err)
        setCoursesError("Failed to load courses")
      } finally {
        setCoursesLoading(false)
      }
    }

    if (categories.length > 0) {
      fetchCourses()
    }
  }, [locale, activeTab, categories.length])

  // Check if tabs need to be scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (tabsContainerRef.current && tabsRef.current) {
        const containerWidth = tabsContainerRef.current.offsetWidth
        const tabsWidth = tabsRef.current.scrollWidth
        setIsScrollable(tabsWidth > containerWidth)
      }
    }

    checkScrollable()
    window.addEventListener("resize", checkScrollable)
    return () => window.removeEventListener("resize", checkScrollable)
  }, [categories])

  // Scroll active tab into view
  useEffect(() => {
    if (tabsContainerRef.current && !categoriesLoading) {
      const activeTabElement = tabsContainerRef.current.querySelector(
        `[data-tab-index="${activeTab}"]`
      ) as HTMLElement

      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeTab, categoriesLoading])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const { activeHomeSection } = useStore()

  const renderSectionContent = () => {
    switch (activeHomeSection) {
      case "Ready Courses":
        return (
          <div className={styles.readyCourses}>
            <div className={styles.tabsWrapper}>
              <div
                ref={tabsContainerRef}
                className={`${styles.tabsContainer} ${isScrollable ? styles.scrollable : ""}`}>
                <div ref={tabsRef} className={styles.tabs}>
                  {categoriesLoading ? (
                    <div className={styles.tabsLoading}>
                      Loading categories...
                    </div>
                  ) : categoriesError ? (
                    <div className={styles.tabsError}>{categoriesError}</div>
                  ) : (
                    categories.map(tab => (
                      <button
                        style={{ cursor: "pointer" }}
                        key={tab.id}
                        data-tab-index={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                        aria-selected={activeTab === tab.id}
                        role="tab">
                        <span className={styles.tabLabel}>{tab.name}</span>
                      </button>
                    ))
                  )}
                </div>
                {!categoriesLoading &&
                  !categoriesError &&
                  categories.length > 0 && (
                    <div
                      className={styles.tabIndicator}
                      style={{
                        transform: `translateX(${categories.findIndex(cat => cat.id === activeTab) * 100}%)`,
                        width: `${100 / categories.length}%`,
                      }}
                    />
                  )}
              </div>
            </div>

            {/* Tab Panels */}
            <div className={styles.tabPanels}>
              <div className={styles.tabPanel} role="tabpanel">
                {coursesLoading ? (
                  <div className={styles.coursesLoading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading courses...</p>
                  </div>
                ) : coursesError ? (
                  <div className={styles.coursesError}>
                    <p>{coursesError}</p>
                    <button
                      onClick={() => {
                        setCoursesError(null)
                        // Trigger refetch
                        setActiveTab(prev => prev)
                      }}
                      className={styles.retryButton}>
                      Retry
                    </button>
                  </div>
                ) : courses && courses.data && courses.data.length > 0 ? (
                  <div className={styles.cardsGrid}>
                    {courses.data.map(course => (
                      <ExploreCard key={course.id} card={course} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noCourses}>
                    <p>No courses found for this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case "Lead Weekend":
        return <LastWeekend />
      case "Customize with AI":
        return <StayTuned />
      default:
        return (
          <div className={styles.tabPanels}>
            {coursesLoading ? (
              <div className={styles.coursesLoading}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading courses...</p>
              </div>
            ) : courses && courses.data ? (
              <div className={styles.cardsGrid}>
                {courses.data.map(course => (
                  <ExploreCard key={course.id} card={course} />
                ))}
              </div>
            ) : (
              <div className={styles.noCourses}>
                <p>No courses available</p>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.exploreHeader}>
        <ExploreHeader />
      </div>
      <div className={styles.exploreHeaderContent}>
        {renderSectionContent()}
      </div>
    </div>
  )
}
