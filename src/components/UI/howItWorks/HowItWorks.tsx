import React from "react"
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

function HowItWorks() {
  const content = {
    title: "How It Works",
    cards: [
      {
        id: 1,
        no: "01",
        title: "Explore Courses",
        description:
          "Browse a variety of professional training programs across business, tech, and leadership.",
        image: search,
      },
      {
        id: 2,
        no: "02",
        title: "Choose Your Trainer",
        description:
          "Find the right expert based on experience, location, and learning style.",
        image: admin,
      },
      {
        id: 3,
        no: "03",
        title: "Connect & Start Learning",
        description:
          "Reach out directly, join the session, and begin your certified training journey.",
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
              <div key={card.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span
                    className={`${styles.cardNo} ${card.id === 2 && styles.reverse}`}>
                    {card.no}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.bigImage}>
            <Image
              src={big}
              alt="Big Image"
              width={500}
              height={500}
              className={styles.bigImageStyle}
            />
          </div>
          <div className={styles.smallImage}>
            <Image
              src={small}
              alt="small Image"
              width={500}
              height={500}
              className={styles.smallImageStyle}
            />
          </div>
          <div className={styles.roundImages}>
            <div className={styles.images}>
              <Image
                src={round11}
                alt="round11 Image"
                width={500}
                height={500}
                className={styles.round11ImageStyle}
              />
              <Image
                src={round22}
                alt="round22 Image"
                width={500}
                height={500}
                className={styles.round22ImageStyle}
              />
              <Image
                src={round33}
                alt="round33 Image"
                width={500}
                height={500}
                className={styles.round33ImageStyle}
              />
            </div>
            <div className={styles.roundText}>
              <p>1K +</p>
              <p>Trainer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorks
