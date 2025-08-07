import React from "react"
import alan from "@/../public/trainers/ala,.png"
import laura from "@/../public/trainers/laura.png"
import elon from "@/../public/trainers/elon.png"
import emily from "@/../public/trainers/emily.png"
import styles from "./Trainers.module.scss"
import Image from "next/image"

function Trainers() {
  const trainers = [
    {
      id: 1,
      en: {
        name: "Dr. Lisa Chang",
        title: "Chief AI Scientist",
      },
      ar: {
        name: "د. ليزا تشانغ",
        title: "مهندسة AI رئيسية",
      },
      image: emily,
    },
    {
      id: 2,
      en: {
        name: "Dr. Lisa Chang",
        title: "Chief AI Scientist",
      },
      ar: {
        name: "د. ليزا تشانغ",
        title: "مهندسة AI رئيسية",
      },
      image: elon,
    },
    {
      id: 3,
      en: {
        name: "Dr. Lisa Chang",
        title: "Chief AI Scientist",
      },
      ar: {
        name: "د. ليزا تشانغ",
        title: "مهندسة AI رئيسية",
      },
      image: laura,
    },
    {
      id: 4,
      en: {
        name: "Dr. Lisa Chang",
        title: "Chief AI Scientist",
      },
      ar: {
        name: "د. ليزا تشانغ",
        title: "مهندسة AI رئيسية",
      },
      image: alan,
    },
  ]
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Trainers</h2>
          <p>Meet the industry leaders and develop your skills with them</p>
        </div>
        <div className={styles.trainersContainer}>
          {trainers.map((trainer, index) => (
            <div
              className={styles.card}
              style={
                index === 2 || index === 3
                  ? { flexDirection: "row-reverse" }
                  : { flexDirection: "row" }
              }
              key={trainer.id}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{trainer.en.name}</h3>
                <p className={styles.cardDescription}>{trainer.en.title}</p>
              </div>
              <div className={styles.cardImage}>
                <Image
                  src={trainer.image}
                  alt={trainer.en.name}
                  width={100}
                  height={100}
                  className={styles.Icon}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Trainers
