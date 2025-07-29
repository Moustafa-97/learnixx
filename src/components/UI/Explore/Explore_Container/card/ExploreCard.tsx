import React from "react"
import styles from "./ExploreCard.module.scss"
// import Image from "next/image"
import { CareerItem } from "@/types/career"
import { useLocale } from "next-intl"

function ExploreCard(props: { card: CareerItem }) {
  const locale = useLocale() as "en" | "ar"
  const { card } = props

  return (
    <>
      <div key={card.id} className={styles.card}>
        <div className={styles.cardHeader}>
          {card.icon && (
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
          )}
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title[locale]}</h3>
            <p className={styles.cardDescription}>
              {card.description[locale].length > 40
                ? card.description[locale].slice(0, 40) + "..."
                : card.description[locale]}
            </p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.cardTags}>
            {card.tags &&
              card.tags[locale].map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
          </span>
        </div>
      </div>
    </>
  )
}

export default ExploreCard
