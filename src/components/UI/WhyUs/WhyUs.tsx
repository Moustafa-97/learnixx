import React from "react"
import styles from "./WhyUs.module.scss"
import { useLocale, useTranslations } from "next-intl"
import WhyUsCard from "../whyUsCard/WhyUsCard"

function WhyUs() {
  const locale = useLocale()
  const t = useTranslations("whyUs")

  const whyCards = [
    {
      id: 1,
      number: "01",
      title: t("cards.1.title"),
      description: t("cards.1.description"),
    },
    {
      id: 2,
      number: "02",
      title: t("cards.2.title"),
      description: t("cards.2.description"),
    },
    {
      id: 3,
      number: "03",
      title: t("cards.3.title"),
      description: t("cards.3.description"),
    },
    {
      id: 4,
      number: "04",
      title: t("cards.4.title"),
      description: t("cards.4.description"),
    },
  ]
  return (
    <div className={styles.container} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.description}>{t("description")}</p>
      </div>
      <div className={styles.cards}>
        {whyCards.map(card => (
          <WhyUsCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default WhyUs
