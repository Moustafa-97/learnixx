// import React from "react"
// import styles from "./HeroHome.module.scss"
// import SearchBar from "../search/SearchBar"
// import ImageMarquee from "../marquee/ImageMarquee"
// import person from "../../../public/herohome/person.png"
// import person2 from "../../../public/herohome/person2.png"
// import person3 from "../../../public/herohome/person3.png"
// import person4 from "../../../public/herohome/person4.png"
// function HeroHome() {
//   const gallery = [
//     {
//       id: 1,
//       src: person,
//       alt: "Person 1",
//       width: 400,
//       height: 350,
//     },
//     {
//       id: 2,
//       src: person2,
//       alt: "Person 2",
//       width: 400,
//       height: 350,
//     },
//     {
//       id: 3,
//       src: person3,
//       alt: "Person 3",
//       width: 400,
//       height: 350,
//     },
//     {
//       id: 4,
//       src: person4,
//       alt: "Person 4",
//       width: 400,
//       height: 350,
//     },
//   ]
//   return (
//     <>
//       <section className={styles.hero}>
//         <div className={styles.content}>
//           {/* // hero content */}
//         </div>
//         <div className={styles.search}>
//           <SearchBar />
//         </div>
//         <div className={styles.marquee}>
//           <ImageMarquee
//             images={gallery}
//             speed={50}
//             pauseOnHover
//             gradient
//             gradientColor="#f8f9fa"
//             gap={40}
//             className={styles.logoMarquee}
//           />
//         </div>
//       </section>
//     </>
//   )
// }

// export default HeroHome

import React from "react"
import { useTranslations } from "next-intl"
import styles from "./HeroHome.module.scss"
import SearchBar from "../../search/SearchBar"
import ImageMarquee from "../../marquee/ImageMarquee"
import person from "@/../public/herohome/person.png"
import person2 from "@/../public/herohome/person2.png"
import person3 from "@/../public/herohome/person3.png"
import person4 from "@/../public/herohome/person4.png"

function HeroHome() {
  const t = useTranslations("hero")

  const gallery = [
    {
      id: 1,
      src: person,
      alt: "Person 1",
      width: 400,
      height: 350,
    },
    {
      id: 2,
      src: person2,
      alt: "Person 2",
      width: 400,
      height: 350,
    },
    {
      id: 3,
      src: person3,
      alt: "Person 3",
      width: 400,
      height: 350,
    },
    {
      id: 4,
      src: person4,
      alt: "Person 4",
      width: 400,
      height: 350,
    },
  ]

  // Custom icon component based on Figma design
  const BadgeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none">
      <path
        d="M11.507 21.5H10.105C6.52 21.5 4.728 21.5 3.614 20.365C2.5 19.23 2.5 17.403 2.5 13.75C2.5 10.097 2.5 8.27 3.614 7.135C4.728 6 6.52 6 10.105 6H13.908C17.493 6 19.286 6 20.4 7.135C21.257 8.008 21.454 9.291 21.5 11.5V13"
        stroke="#141414"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 18.5H16.5M16.5 21.5C15.7044 21.5 14.9413 21.1839 14.3787 20.6213C13.8161 20.0587 13.5 19.2956 13.5 18.5C13.5 17.7044 13.8161 16.9413 14.3787 16.3787C14.9413 15.8161 15.7044 15.5 16.5 15.5M19.5 21.5C20.2956 21.5 21.0587 21.1839 21.6213 20.6213C22.1839 20.0587 22.5 19.2956 22.5 18.5C22.5 17.7044 22.1839 16.9413 21.6213 16.3787C21.0587 15.8161 20.2956 15.5 19.5 15.5M16.5 6L16.4 5.69C15.905 4.15 15.658 3.38 15.069 2.94C14.479 2.5 13.697 2.5 12.131 2.5H11.868C10.303 2.5 9.52 2.5 8.931 2.94C8.341 3.38 8.094 4.15 7.599 5.69L7.5 6"
        stroke="#141414"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          {/* Badge */}
          <div className={styles.badge}>
            <BadgeIcon />
            <span className={styles.badgeText}>{t("badge")}</span>
          </div>

          {/* Main Title */}
          <h1 className={styles.title}>{t("title")}</h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.search}>
          <SearchBar />
        </div>

        <div className={styles.marquee}>
          <ImageMarquee
            images={gallery}
            speed={50}
            pauseOnHover
            gradient
            gradientColor="#f8f9fa"
            gap={40}
            className={styles.logoMarquee}
          />
        </div>
      </section>
    </>
  )
}

export default HeroHome
