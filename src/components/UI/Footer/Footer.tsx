"use client"
import React from "react"
import styles from "./Footer.module.scss"
import footer from "@/../public/footer/Footer.png"
import top from "@/../public/footer/CTA.png"
import Image from "next/image"
import {
  FaEnvelope,
  FaCheckCircle,
  FaLinkedin,
  FaSnapchat,
} from "react-icons/fa"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import axios from "axios"
import logo from "@/../public/logo/image.png"
function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  const [email, setEmail] = React.useState("")
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const links = [
    {
      header: t("navigation.home.title"),
      sections: [
        { name: t("navigation.home.courses"), link: `/${locale}/courses` },
        {
          name: t("navigation.home.whyLearnix"),
          link: `/${locale}#why-learnix`,
        },
        {
          name: t("navigation.home.topCourses"),
          link: `/${locale}#top-courses`,
        },
        {
          name: t("navigation.home.testimonials"),
          link: `/${locale}#testimonials`,
        },
        { name: t("navigation.home.contactUs"), link: `/${locale}/contact` },
      ],
    },
    {
      header: t("navigation.about.title"),
      sections: [
        {
          name: t("navigation.about.howItWorks"),
          link: `/${locale}#how-it-works`,
        },
        {
          name: t("navigation.about.testimonials"),
          link: `/${locale}#testimonials`,
        },
        {
          name: t("navigation.about.trainers"),
          link: `/${locale}/about-us#trainers`,
        },
      ],
    },
    {
      header: t("navigation.cities.title"),
      sections: [
        {
          name: t("navigation.cities.explore"),
          link: `/${locale}/cities`,
        },
        {
          name: t("navigation.cities.madrid"),
          link: `/${locale}/cities?search=madrid`,
        },
        {
          name: t("navigation.cities.paris"),
          link: `/${locale}/cities?search=paris`,
        },
      ],
    },
  ]

  const onSubmit = () => {
    if (!email || isLoading) return

    setIsLoading(true)
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/api/v1/contact/join-us`, {
        email: email,
      })
      .then(res => {
        console.log(res)
        setEmail("")
        setShowSuccess(true)

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button onClick={onSubmit} disabled={isLoading || !email}>
                {isLoading
                  ? t("cta.subscribing") || "Subscribing..."
                  : t("cta.subscribe")}
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className={styles.successMessage}>
                <FaCheckCircle />
                <span>
                  {t("cta.successMessage") ||
                    "Successfully subscribed to newsletter!"}
                </span>
              </div>
            )}
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
              <div
                className={`${styles.logoSection} ${locale === "ar" ? styles.rtl : ""}`}>
                <div className={styles.companyInfo}>
                  <Image src={logo} alt="Learnix Logo" />
                </div>
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
                <FaLinkedin onClick={() => window.open("https://www.linkedin.com/company/learnix-plus/", "_blank")} />
                <FaSnapchat onClick={() => window.open("https://t.snapchat.com/cYM0XmXS", "_blank")} />
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
