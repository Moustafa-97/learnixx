import React from "react"
import styles from "./WhatSays.module.scss"

function Video() {
  return (
    <video autoPlay loop muted playsInline className={styles.video}>
      <source
        src="https://yllaaa-bucket.fra1.cdn.digitaloceanspaces.com/learnix/uploads/says.mp4"
        type="video/mp4"
      />
    </video>
  )
}

export default Video
