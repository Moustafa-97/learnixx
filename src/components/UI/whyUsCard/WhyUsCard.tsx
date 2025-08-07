import React from "react"
import styles from "./WhyUsCard.module.scss"

interface WhyUsCardProps {
  card: {
    id: number
    number: string
    title: string
    description: string
  }
}
function WhyUsCard(props: WhyUsCardProps) {
  const { card } = props
  return (
    <>
      <div
        className={styles.card}
        style={
          card.id === 3 || card.id === 4
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }
        }>
        <div className={styles.numberContainer}>
          <h6>{card.title}</h6>
          <p>{card.number}</p>
        </div>
        <div className={styles.textContainer}>
          <p>{card.description}</p>
        </div>
      </div>
    </>
  )
}

export default WhyUsCard
