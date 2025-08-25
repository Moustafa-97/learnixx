import React from "react"
import styles from "./WhyUs.module.scss"
import { useLocale, useTranslations } from "next-intl"
import WhyUsCard from "../whyUsCard/WhyUsCard"
import { Outcome } from "@/types/career"

interface WhyUsProps {
  outcomes?: Outcome[]; // Optional in case it's still loading
  loading?: boolean;
  error?: string | null;
}

function WhyUs({ outcomes = [], loading = false, error }: WhyUsProps) {
  const locale = useLocale()
  const t = useTranslations("whyUs2")

  // Transform outcomes to match the card structure
  const whyCards = outcomes.map((outcome, index) => ({
    id: outcome.id,
    number: (index + 1).toString().padStart(2, '0'),
    title: outcome.name,
    description: outcome.description,
  }))

  return (
    <div className={styles.container} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t("title")}</h2>
        {loading ? (
          <p className={styles.description}>{t("loading", { default: "Loading course outcomes..." })}</p>
        ) : error ? (
          <p className={styles.errorDescription}>{error}</p>
        ) : (
          <p className={styles.description}>{t("description")}</p>
        )}
      </div>

      {loading ? (
        <div className={styles.loadingCards}>
          {/* Show skeleton cards while loading */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonNumber}></div>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDescription}></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{t("errorMessage", { default: "Failed to load learning outcomes" })}</p>
        </div>
      ) : outcomes.length > 0 ? (
        <div className={styles.cards}>
          {whyCards.map(card => (
            <WhyUsCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className={styles.noOutcomes}>
          <p>{t("noOutcomes", { default: "No learning outcomes available for this course." })}</p>
        </div>
      )}
    </div>
  )
}

export default WhyUs