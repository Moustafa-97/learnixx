/* eslint-disable @typescript-eslint/no-explicit-any */
import Cities from "@/components/UI/Cities/Cities"
import React from "react"
import styles from "./page.module.scss"
import CityHeader from "@/components/UI/Cities/City_Container_Header/CityHeader"
import HeroCity from "@/components/UI/Cities/Hero_City/HeroCity"
import CourseSearchSync from "@/components/CourseSearchSync/CourseSearchSync"

function page(props: any) {
  const { searchParams } = props

  // Safely extract search params
  const subject = searchParams?.subject || ""
  const location = searchParams?.location || ""
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
          <div id="cityPage" className={styles.content}>
            {/* This component syncs URL params with store */}
            <CourseSearchSync subject={subject} location={location} />
            <Cities />
          </div>
        </div>
      </section>
    </>
  )
}

export default page
