import React from "react"
import { useTranslations } from "next-intl"
import styles from "./CourseHeader.module.scss"
import SearchBar from "@/components/search/SearchBar"

function CourseHeader() {
  const t = useTranslations("courses.section")
  return (
    <>
      <div className={styles.containerHeader}>
        <div className={styles.headerText}>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <div className={styles.filterControls}>
          <div className={styles.searchbar}>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseHeader
