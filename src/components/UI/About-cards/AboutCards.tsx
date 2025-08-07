import React from "react"
import styles from "./AboutCards.module.scss"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
function AboutCards() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.big}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>world class trainers</h3>
            </div>
            <div className={styles.body}>
              <div className={styles.arrow}>
                <FaArrowLeft />
              </div>
              <div className={styles.text}>
                <p>
                  Learn from top European trainers and industry leaders who are
                  guiding the next generation of professionals worldwide.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <div className={styles.imgs}>

            </div>
            <div className={styles.link}>
              <Link href="/trainers">View Trainers</Link>
            </div>
          </div>
        </div>
        <div className={styles.smallContainer}>
          <div className={styles.smallB}>5</div>
          <div className={styles.smallW}>5</div>
        </div>
      </div>
    </>
  )
}

export default AboutCards
