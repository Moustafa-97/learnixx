"use client"
import React, { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import {
  FaChevronDown,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaGlobe,
} from "react-icons/fa"
import styles from "./Header.module.scss"

// You'll need to import your logo
import logo from "@/../public/logo/header.png"
import ReactCountryFlag from "react-country-flag"

interface NavRoute {
  key: string
  href: string
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("header")

  const navRoutes: NavRoute[] = [
    { key: "aboutUs", href: "/about-us" },
    { key: "courses", href: "/courses" },
    { key: "cities", href: "/cities" },
    { key: "leadWeek", href: "/lead-week" },
    { key: "customizeAI", href: "/customize-ai" },
  ]

  const languages = [
    { code: "en", label: "English", flag: "us" },
    { code: "ar", label: "العربية", flag: "sa" },
  ]

  const isActiveRoute = (href: string): boolean => {
    return pathname === href || pathname === `/${locale}${href}`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }
  const languageDropdown = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      languageDropdown.current &&
      !languageDropdown.current.contains(event.target as Node)
    ) {
      setIsLanguageDropdownOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    // Implement language change logic here
    // This will depend on your next-intl setup
    const currentPath = pathname.replace(`/${locale}`, "") || "/"
    window.location.href = `/${langCode}${currentPath}`
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src={logo}
              alt={t("logoAlt")}
              width={120}
              height={40}
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navRoutes.map(route => (
              <li key={route.key} className={styles.navItem}>
                <Link
                  href={route.href}
                  className={`${styles.navLink} ${isActiveRoute(route.href) ? styles.active : ""}`}>
                  {t(`nav.${route.key}`)}
                  {isActiveRoute(route.href) && (
                    <span className={styles.activeLine}></span>
                  )}
                </Link>
              </li>
            ))}

            {/* Language Dropdown */}
            <li className={styles.navItem}>
              <div ref={languageDropdown} className={styles.languageDropdown}>
                <button
                  className={styles.languageButton}
                  onClick={toggleLanguageDropdown}
                  aria-label={t("languageSelector")}>
                  <FaGlobe />
                  <span>{locale.toUpperCase()}</span>
                  <FaChevronDown
                    className={`${styles.chevron} ${isLanguageDropdownOpen ? styles.rotated : ""}`}
                  />
                </button>

                {isLanguageDropdownOpen && (
                  <div className={styles.languageMenu}>
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        className={`${styles.languageOption} ${locale === lang.code ? styles.activeLang : ""}`}
                        onClick={() => {
                          handleLanguageChange(lang.code)
                          setIsLanguageDropdownOpen(false)
                        }}>
                        {/* <span className={styles.flag}> */}
                        <ReactCountryFlag
                          countryCode={lang.flag}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginRight: "0.5em",
                          }}
                        />
                        {/* </span> */}
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>

        {/* Contact Button */}
        <div className={styles.contactSection}>
          <Link href="/contact" className={styles.contactButton}>
            <span>{t("contactUs")}</span>
            <FaArrowRight className={styles.arrow} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={t("mobileMenuToggle")}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNav}>
              {navRoutes.map(route => (
                <Link
                  key={route.key}
                  href={route.href}
                  className={`${styles.mobileNavLink} ${isActiveRoute(route.href) ? styles.active : ""}`}
                  onClick={closeMobileMenu}>
                  {t(`nav.${route.key}`)}
                </Link>
              ))}
            </nav>

            {/* Mobile Language Selector */}
            <div className={styles.mobileLanguageSection}>
              <h4>{t("selectLanguage")}</h4>
              <div className={styles.mobileLanguageOptions}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`${styles.mobileLanguageOption} ${locale === lang.code ? styles.activeLang : ""}`}
                    onClick={() => {
                      handleLanguageChange(lang.code)
                      closeMobileMenu()
                    }}>
                    <span className={styles.flag}>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Contact Button */}
            <Link
              href="/contact"
              className={styles.mobileContactButton}
              onClick={closeMobileMenu}>
              <span>{t("contactUs")}</span>
              <FaArrowRight className={styles.arrow} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
