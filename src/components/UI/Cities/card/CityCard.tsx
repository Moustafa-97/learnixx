import React from "react"
import { City } from "@/types/city"
import styles from "./CityCard.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

interface CityCardProps {
  city: City
}

function CityCard({ city }: CityCardProps) {
  const locale = useLocale()
  const router = useRouter()
  const handleNavigation = () => {
    router.push(`/${locale}/courses?cityId=${city.id}&cityName=${city.name}`)
  }
  return (
    <div onClick={handleNavigation} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={city.cityPicture}
          alt={city.name}
          className={styles.image}
          loading="lazy"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.cityName}>{city.name}</h3>
      </div>
    </div>
  )
}

export default CityCard
