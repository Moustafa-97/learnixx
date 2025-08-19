import React from "react"
import styles from "./MostPopularCard.module.scss"
import Image, { StaticImageData } from "next/image"

interface Props {
  cardContent: {
    id: number
    image: string | StaticImageData
  }
}
function MostPopularCard(props: Props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bgImage}>
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
