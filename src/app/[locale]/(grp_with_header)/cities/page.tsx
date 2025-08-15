import Cities from "@/components/UI/Cities/Cities"
import React from "react"
import styles from "./page.module.scss"
import CityHeader from "@/components/UI/Cities/City_Container_Header/CityHeader"
import HeroCity from "@/components/UI/Cities/Hero_City/HeroCity"

function page() {
  return (
    <>
      <section className={styles.page}>
        <div className={styles.hero}>
          <HeroCity />
        </div>
        <div id="cityPage" className={styles.pageContainer}>
          <div className={styles.header}>
            <CityHeader />
          </div>
          <div className={styles.content}>
            {/* This component syncs URL params with store */}
            <Cities />
          </div>
        </div>
      </section>
    </>
  )
}

export default page
