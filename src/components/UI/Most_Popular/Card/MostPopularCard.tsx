"use client"
import React from "react"
import styles from "./MostPopularCard.module.scss"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import logo from "@/../public/logo/imageW.png"

interface Props {
  cardContent: {
    id: number
    image: string | StaticImageData
    header: string
    description: string
  }
}
function MostPopularCard(props: Props) {
  const router = useRouter()
  const locale = useLocale()
  const handleClick = () => {
    router.push(`/${locale}/courses`)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Image src={logo} alt="Logo" />
          </div>
          <div className={styles.title}>
            <h3>{props.cardContent.header}</h3>
          </div>
          <div className={styles.desc}>
            <p>{props.cardContent.description}</p>
          </div>
          <div className={styles.btn}>
            <button onClick={handleClick}>View Course</button>
          </div>
        </div>
        <div onClick={handleClick} className={styles.bgImage}>
          {/* <Image
            src={props.cardContent.image}
            alt="Most Popular"
            width={10000}
            height={10000}
            loading="lazy"
          /> */}
        </div>
      </div>
    </>
  )
}

export default MostPopularCard
