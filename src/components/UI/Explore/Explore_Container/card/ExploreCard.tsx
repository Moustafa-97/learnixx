"use client"
import React from "react"
import styles from "./ExploreCard.module.scss"
// import Image from "next/image"
import { Course } from "@/types/courses"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

function ExploreCard(props: { card: Course }) {
  const { card } = props
  const router = useRouter()
  const locale = useLocale()
  const handleNavigation = () => {
    router.push(`/${locale}/courses/${card.id}`)
  }

  return (
    <>
      <div onClick={handleNavigation} key={card.id} className={styles.card}>
        <div className={styles.cardHeader}>
          {/* {card.icon && (
            //   typeof card.icon === "string" ? (
            //     <div className={styles.cardImage}>
            //       <Image
            //         src={card.icon}
            //         alt={card.title}
            //         width={50}
            //         height={50}
            //       />
            //     </div>
            //   ) :
            <div className={styles.cardIcon}>
              <p>{card.icon}</p>
            </div>
          )} */}
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>
              {card.description.length > 40
                ? card.description.slice(0, 40) + "..."
                : card.description}
            </p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.cardTags}>
            {card.price && <span className={styles.tag}>{card.price}€</span>}
          </span>
        </div>
      </div>
    </>
  )
}

export default ExploreCard
