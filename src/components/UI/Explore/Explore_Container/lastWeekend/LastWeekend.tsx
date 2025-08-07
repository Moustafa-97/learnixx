import React from "react"
import styles from "./LastWeekend.module.scss"
import Image from "next/image"
import bigI from "@/../public/leed/big.png"

function LastWeekend() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={styles.small}>
            <div className={styles.small1}>
              <p>Powered by Yalla Lead</p>
            </div>
            <div className={styles.small2}>
              <div className={styles.small2Cont}>
                <p>Join with 80k+ other members</p>
                <button>Get Started</button>
              </div>
            </div>
          </div>
          <div className={styles.big}>
            <div className={styles.bigCont}>
              <h3>Elite Leadership Weekend in barcelona</h3>
              <p>
                3-day leadership retreats in Barcelona guided by Europe’s top
                trainers and built around your personal growth.
              </p>
            </div>
            <div className={styles.bigImg}>
              <Image src={bigI} alt="Big Image" width={500} height={500} />
            </div>
          </div>
        </div>
        <div className={styles.button}></div>
      </div>
    </>
  )
}

export default LastWeekend
