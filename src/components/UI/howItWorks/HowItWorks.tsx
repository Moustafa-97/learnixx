import React from "react"
import { useTranslations } from 'next-intl'
import big from "@/../public/howItWorks/big.png"
import small from "@/../public/howItWorks/small.png"
import round11 from "@/../public/howItWorks/round11.svg"
import round22 from "@/../public/howItWorks/round22.svg"
import round33 from "@/../public/howItWorks/round33.svg"
import search from "@/../public/howItWorks/ssearchIcon.svg"
import connect from "@/../public/howItWorks/connectIcon.svg"
import admin from "@/../public/howItWorks/adminIcon.svg"

import styles from "./HowItWorks.module.scss"
import Image from "next/image"
import Card from "./card/Card"

function HowItWorks() {
  const t = useTranslations('howItWorks')

  const content = {
    title: t('title'),
    cards: [
      {
        id: 1,
        no: t('cards.card1.no'),
        title: t('cards.card1.title'),
        description: t('cards.card1.description'),
        image: search,
      },
      {
        id: 2,
        no: t('cards.card2.no'),
        title: t('cards.card2.title'),
        description: t('cards.card2.description'),
        image: admin,
      },
      {
        id: 3,
        no: t('cards.card3.no'),
        title: t('cards.card3.title'),
        description: t('cards.card3.description'),
        image: connect,
      },
    ],
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{content.title}</h2>
          <div className={styles.cards}>
            {content.cards.map(card => (
              <div
                key={card.id}
                className={`${styles.card} ${card.id === 2 && styles.reverse}`}>
                <span className={styles.cardNo}>{card.no}</span>
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.bigImage}>
            <Image
              src={big}
              alt={t('images.bigImage')}
              width={500}
              height={500}
              className={styles.bigImageStyle}
              loading="lazy"
            />
          </div>
          <div className={styles.smallImage}>
            <Image
              src={small}
              alt={t('images.smallImage')}
              width={500}
              height={500}
              className={styles.smallImageStyle}
              loading="lazy"
            />
          </div>
          <div className={styles.roundImages}>
            <div className={styles.Rimages}>
              <Image
                src={round11}
                alt={t('images.round11Image')}
                width={500}
                height={500}
                className={styles.round11ImageStyle}
                loading="lazy"
              />
              <Image
                src={round22}
                alt={t('images.round22Image')}
                width={500}
                height={500}
                className={styles.round22ImageStyle}
                loading="lazy"
              />
              <Image
                src={round33}
                alt={t('images.round33Image')}
                width={500}
                height={500}
                className={styles.round33ImageStyle}
                loading="lazy"
              />
            </div>
            <div className={styles.roundText}>
              <p>{t('stats.count')}</p>
              <p>{t('stats.label')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorks