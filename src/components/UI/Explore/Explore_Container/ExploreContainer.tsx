// components/ExploreContainer/ExploreContainer.tsx
"use client"
import React, { useState, useRef, useEffect } from "react"
import styles from "./ExploreContainer.module.scss"
import ExploreCard from "./card/ExploreCard"
import { Career } from "@/types/career"
import { careerData } from "@/data/careerData"
import { useLocale } from "next-intl"

const tabsData: Career[] = careerData

export default function ExploreContainer() {
  const locale = useLocale() as "en" | "ar"
  const [activeTab, setActiveTab] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

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
  }, [])

  // Scroll active tab into view
  useEffect(() => {
    if (tabsContainerRef.current) {
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
  }, [activeTab])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className={styles.container}>
      {/* Tabs Header */}
      <div className={styles.tabsWrapper}>
        <div
          ref={tabsContainerRef}
          className={`${styles.tabsContainer} ${isScrollable ? styles.scrollable : ""}`}>
          <div ref={tabsRef} className={styles.tabs}>
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                data-tab-index={index}
                className={`${styles.tab} ${activeTab === index ? styles.active : ""}`}
                onClick={() => handleTabClick(index)}
                aria-selected={activeTab === index}
                role="tab">
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label[locale]}</span>
              </button>
            ))}
          </div>
          <div
            className={styles.tabIndicator}
            style={{
              transform: `translateX(${activeTab * 100}%)`,
              width: `${100 / tabsData.length}%`,
            }}
          />
        </div>
      </div>

      {/* Tab Panels */}
      <div className={styles.tabPanels}>
        {tabsData.map((tab, index) => (
          <div
            key={tab.id}
            className={`${styles.tabPanel} ${activeTab === index ? styles.active : ""}`}
            role="tabpanel"
            aria-hidden={activeTab !== index}>
            <div className={styles.cardsGrid}>
              {tab.content.map(card => (
                <ExploreCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
