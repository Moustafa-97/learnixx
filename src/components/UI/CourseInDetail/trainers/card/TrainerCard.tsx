"use client"
import React from "react"
import { FaLinkedin } from "react-icons/fa"
import Image from "next/image"
import { Trainer } from "@/types/career"
import styles from "./TrainerCard.module.scss"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

interface TrainerCardProps {
  trainer: Trainer
  courseID: number | string
}

function TrainerCard({ trainer, courseID }: TrainerCardProps) {
  const handleLinkedInClick = () => {
    if (trainer.linkedIn) {
      window.open(trainer.linkedIn, "_blank", "noopener,noreferrer")
    }
  }
  const param = useSearchParams()
  const cityID = param.get("cityId")
  const cityName = param.get("cityName")
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("Trainers.course")
  const handleApplyClick = () => {
    // Handle enrollment logic
    if (cityID && cityName) {
      router.push(
        `/${locale}/register?courseID=${courseID}&cityId=${cityID}&cityName=${cityName}`
      )
    } else {
      router.push(`/${locale}/register?courseID=${courseID}`)
    }
    console.log(`Apply for course ${courseID}`)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.image}>
            <Image
              src={trainer.trainerPicture}
              alt={trainer.name}
              width={100}
              height={100}
              className={styles.trainerImage}
              // onError={(e) => {
              //   // Fallback to default image on error
              //   e.currentTarget.src = "/default-trainer.png"
              // }}
            />
          </div>
          <div className={styles.details}>
            <p className={styles.name}>{trainer.name}</p>
            <p className={styles.title}>{trainer.title}</p>

            <button
              className={styles.chooseButton}
              onClick={handleApplyClick}
              aria-label={`View ${trainer.name}'s LinkedIn profile`}>
              {t("choose", { default: "Choose your Trainer" })}
              {/* <span>Full Review</span> */}
            </button>
          </div>
          <button
            className={styles.linkedinButton}
            onClick={handleLinkedInClick}
            aria-label={`View ${trainer.name}'s LinkedIn profile`}>
            <FaLinkedin className={styles.linkedinIcon} />
            {/* <span>Full Review</span> */}
          </button>
        </div>
      </div>
    </>
  )
}

export default TrainerCard
