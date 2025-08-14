import React from "react"
import alan from "@/../public/trainers/ala,.png"
import laura from "@/../public/trainers/laura.png"
import elon from "@/../public/trainers/elon.png"
import emily from "@/../public/trainers/emily.png"
import styles from "./Trainers.module.scss"
import Image from "next/image"
import { useTranslations } from "next-intl"

function Trainers() {
  const t = useTranslations("Trainers")
  const trainers = t.raw("trainers")
  const trainerImages = [emily, elon, laura, alan]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </div>
      <div className={styles.trainersContainer}>
        {trainers.map(
          (trainer: { name: string; title: string }, index: number) => (
            <div
              className={styles.card}
              style={{
                flexDirection:
                  index === 2 || index === 3 ? "row-reverse" : "row",
              }}
              key={index}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{trainer.name}</h3>
                <p className={styles.cardDescription}>{trainer.title}</p>
              </div>
              <div className={styles.cardImage}>
                <Image
                  src={trainerImages[index]}
                  alt={trainer.name}
                  width={100}
                  height={100}
                  className={styles.Icon}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Trainers
