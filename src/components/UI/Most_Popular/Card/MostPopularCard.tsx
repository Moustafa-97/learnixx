"use client"
import React from "react"
import styles from "./MostPopularCard.module.scss"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

interface Props {
  cardContent: {
    id: number
    image: string | StaticImageData
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
        <div onClick={handleClick} className={styles.bgImage}>
          <Image
            src={props.cardContent.image}
            alt="Most Popular"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </>
  )
}

export default MostPopularCard
