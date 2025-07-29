import React from "react"
import styles from "./Card.module.scss"
import Image from "next/image"

function Card(props: {
  card: {
    id: number
    title: string
    description: string
    image: string
  }
}) {
  const { card } = props
  return (
    <>
      <div className={styles.card}>
        <div className={`${styles[`cardImage${card.id}`]} ${styles.cardImage}`}>
          <Image
            src={card.image}
            alt={card.title}
            width={50}
            height={50}
            className={styles.Icon}
          />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardDescription}>{card.description}</p>
        </div>
      </div>
    </>
  )
}

export default Card
