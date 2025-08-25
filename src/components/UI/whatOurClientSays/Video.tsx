import React from 'react'
import styles from "./WhatSays.module.scss"

function Video() {
  return (
    
      <video autoPlay loop muted playsInline className={styles.video}>
        <source src="/says/says.mp4" type="video/mp4" />
      </video>
    
  )
}

export default Video