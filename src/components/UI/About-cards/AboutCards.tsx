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
            <div className={styles.imgs}></div>
            <div className={styles.link}>
              <Link href="/trainers">And more</Link>
              <FaArrowLeft />
            </div>
          </div>
        </div>
        <div className={styles.smallContainer}>
          <div className={styles.smallB}>
            <h6>Professional Skills</h6>
            <p>
              Explore leadership development, strategic thinking, effective
              communication, project management, and global business practices
              with top leaders.
            </p>
          </div>
          <div className={styles.smallW}>
            <h6>Prime Learning Locations</h6>
            <p>
              Enjoy the best meeting rooms in prime locations across Europe’s
              most vibrant cities.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutCards
