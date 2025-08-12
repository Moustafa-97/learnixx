import React from "react"
import { useTranslations } from "next-intl"
import { Trainer } from "@/types/career"
import styles from "./Trainers.module.scss"
import TrainerCard from "./card/TrainerCard"

interface TrainersProps {
  trainers: Trainer[];
  loading?: boolean;
  error?: string | null;
}

function Trainers({ trainers = [], loading = false, error }: TrainersProps) {
  const t = useTranslations("trainers")

  // Show fallback if no trainers
  if (!trainers || trainers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h6>{t("subtitle", { default: "Trainers" })}</h6>
          <h3>{t("title", { default: "Meet our Trainers" })}</h3>
        </div>
        <div className={styles.noTrainers}>
          <p>{t("noTrainersMessage", { default: "No trainer information available for this course." })}</p>
        </div>
      </div>
    )
  }

  // Dynamic grid class based on number of trainers
  const getTrainersGridClass = () => {
    const count = trainers.length
    if (count === 1) return styles.trainersGrid1
    if (count === 2) return styles.trainersGrid2
    if (count >= 3) return styles.trainersGrid3
    return styles.trainersGridDefault
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h6>{t("subtitle")}</h6>
          <h3>{t("title")}</h3>
          
        </div>
        
        {loading ? (
          <div className={getTrainersGridClass()}>
            {[...Array(Math.min(3, trainers.length || 2))].map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonDetails}>
                  <div className={styles.skeletonName}></div>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonLinkedin}></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={getTrainersGridClass()}>
            {trainers.map(trainer => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Trainers