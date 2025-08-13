import React from "react"
import { useTranslations } from "next-intl"
import styles from "./CourseHeader.module.scss"
import SearchBar from "@/components/search/SearchBar"

function CityHeader() {
  const t = useTranslations("city")

  return (
    <>
      <div id="cities" className={styles.containerHeader}>
        <div className={styles.headerText}>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <div className={styles.filterControls}>
          <div className={styles.searchbar}>
            <SearchBar type="cities" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CityHeader