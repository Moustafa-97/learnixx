import React from "react"
import FrequentAsk from "@/components/UI/frequentlyAsked/FrequentAsk"
import styles from "./page.module.scss"
import WhatSays from "@/components/UI/whatOurClientSays/WhatSays"
import AboutHero from "@/components/UI/About_Courses/AboutHero"
// import Trainers from "@/components/UI/Trainers/Trainers"
import WhyUs from "@/components/UI/WhyUs/WhyUs"
import AboutCards from "@/components/UI/About-cards/AboutCards"

function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <AboutHero />
      </section>
      <section id="about" className={styles.pageContainer}>
        <AboutCards />
      </section>
      {/* <section id="trainers" className={styles.pageContainer}>
        <Trainers />
      </section> */}
      <section className={styles.pageContainer}>
        <WhyUs />
      </section>
      <section id="testimonials" className={styles.pageContainer}>
        <WhatSays />
      </section>
      <section className={styles.pageContainer}>
        <FrequentAsk />
      </section>
    </main>
  )
}

export default About
