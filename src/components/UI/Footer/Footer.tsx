"use client"
import React from "react"
import styles from "./Footer.module.scss"
import footer from "@/../public/footer/Footer.png"
import top from "@/../public/footer/CTA.png"
import Image from "next/image"
import {
  FaEnvelope,
  FaInstagramSquare,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import axios from "axios"

function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  const links = [
    {
      header: t("navigation.home.title"),
      sections: [
        { name: t("navigation.home.courses"), link: `/${locale}/courses` },
        {
          name: t("navigation.home.whyLearnix"),
          link: `/${locale}/why-learnix`,
        },
        {
          name: t("navigation.home.topCourses"),
          link: `/${locale}/top-courses`,
        },
        {
          name: t("navigation.home.testimonials"),
          link: `/${locale}/testimonials`,
        },
        { name: t("navigation.home.contactUs"), link: `/${locale}/contact-us` },
      ],
    },
    {
      header: t("navigation.about.title"),
      sections: [
        {
          name: t("navigation.about.howItWorks"),
          link: `/${locale}/how-it-works`,
        },
        {
          name: t("navigation.about.testimonials"),
          link: `/${locale}/testimonials`,
        },
        { name: t("navigation.about.trainers"), link: `/${locale}/trainers` },
      ],
    },
    {
      header: t("navigation.cities.title"),
      sections: [
        {
          name: t("navigation.cities.explore"),
          link: `/${locale}/explore-cities`,
        },
        {
          name: t("navigation.cities.madrid"),
          link: `/${locale}/explore-cities?city=madrid`,
        },
        {
          name: t("navigation.cities.paris"),
          link: `/${locale}/explore-cities?city=paris`,
        },
      ],
    },
  ]
  const [email, setEmail] = React.useState("")
  const onSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/api/v1/contact/get-in-touch`, {
        email: email,
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topC}>
          <div className={styles.topContainer}>
            <h2>{t("cta.heading")}</h2>
            <div className={styles.emailForm}>
              <div className={styles.inputC}>
                <FaEnvelope />
                <input
                  type="email"
                  placeholder={t("cta.emailPlaceholder")}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button onClick={onSubmit}>{t("cta.subscribe")}</button>
            </div>
          </div>
          <Image
            src={top}
            alt="CTA"
            width={1000}
            height={1000}
            className={styles.top}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomContainer}>
            <div className={styles.section}>
              <div className={styles.logoSection}>
                <h2>Learnix</h2>
                <p className={styles.description}>{t("company.description")}</p>
                <div className={styles.social}>
                  <p>
                    <span>{t("contact.phone")}:</span> 0123456789
                  </p>
                  <p>
                    <span>{t("contact.email")}:</span> kK8b9@example.com
                  </p>
                </div>
              </div>
              {links.map((link, index) => (
                <div key={index} className={styles.links}>
                  <div key={link.header} className={styles.link}>
                    <h3>{link.header}</h3>
                    {link.sections.map(section => (
                      <p key={section.name}>
                        <Link href={section.link}>{section.name}</Link>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.copyR}>
              <p>{t("copyright")}</p>
              <div className={styles.socialMedia}>
                <FaInstagramSquare />
                <FaTiktok />
                <FaTelegram />
                <FaYoutube />
              </div>
            </div>
          </div>
          <Image
            src={footer}
            alt="Footer"
            width={1000}
            height={1000}
            className={styles.footer}
          />
        </div>
      </div>
    </>
  )
}

export default Footer
