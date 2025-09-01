import React from "react"
import styles from "./StayTuned.module.scss"
import chand from "@/../public/tuned/chandellier.png"
import Image from "next/image"

function StayTuned() {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <Image
          src={chand}
          alt="Chandelier"
          className={styles.chandelier}
          width={200}
          height={200}
          loading="lazy"
        />
        {/* Shadow effect */}
        <div className={styles.shadow}></div>
      </div>

      {/* Stay Tuned Text */}
      <div className={styles.textContainer}>
        <h1 className={styles.stayTunedText}>STAYTUNED</h1>
      </div>
    </div>
  )
}

export default StayTuned
