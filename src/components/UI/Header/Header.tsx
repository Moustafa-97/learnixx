/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useRef, useState, useEffect } from "react"
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
import logo from "@/../public/logo/image.png"
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
  console.log(pathname)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  // Enhanced navRoutes with locale
  const navRoutes: NavRoute[] = [
    { key: "home", href: `/${locale}` },
    { key: "courses", href: `/${locale}/courses` },
    { key: "cities", href: `/${locale}/cities` },
    { key: "leadWeek", href: `/${locale}/lead-week` },
    { key: "aboutUs", href: `/${locale}/about-us` },
    { key: "customizeAI", href: `/${locale}/customize-ai` },
  ]

  const languages = [
    { code: "en", label: "English", flag: "us" },
    { code: "ar", label: "العربية", flag: "sa" },
  ]

  const isActiveRoute = (href: string): boolean => {
    return pathname === href
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  // Enhanced outside click handler for both mobile menu and language dropdown
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node

    // Close language dropdown if clicked outside
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(target)
    ) {
      setIsLanguageDropdownOpen(false)
    }

    // Close mobile menu if clicked outside
    if (
      isMobileMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(target)
    ) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (isMobileMenuOpen || isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      // Prevent body scroll when mobile menu is open
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
      }
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "unset"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileMenuOpen, isLanguageDropdownOpen])

  const handleLanguageChange = (langCode: string) => {
    // Enhanced language change logic with locale replacement
    const currentPath = pathname.replace(`/${locale}`, "") || "/"
    window.location.href = `/${langCode}${currentPath}`
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Enhanced keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMobileMenuOpen(false)
      setIsLanguageDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any)
    return () => document.removeEventListener("keydown", handleKeyDown as any)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href={`/${locale}`} onClick={closeMobileMenu}>
            <Image
              src={logo}
              alt={t("logoAlt")}
              width={120}
              height={40}
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navRoutes.map(route => (
              <li data-tour={route.key} key={route.key} className={styles.navItem}>
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
              <div
                ref={languageDropdownRef}
                className={styles.languageDropdown}>
                <button
                  className={styles.languageButton}
                  onClick={toggleLanguageDropdown}
                  aria-label={t("languageSelector")}
                  aria-expanded={isLanguageDropdownOpen}>
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
                        <ReactCountryFlag
                          countryCode={lang.flag}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                          }}
                        />
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
          <Link href={`/${locale}/contact`} className={pathname !== `/${locale}` ?styles.contactButton: styles.whiteContactButton}>
            <span
              // className={pathname !== `/${locale}` ? "" : styles.whiteTextHover}
              // style={
              //   pathname !== `/${locale}`
              //     ? { color: "#141414" }
              //     : { color: "#fff" }
              // }
              >
              {t("contactUs")}
            </span>
            <FaArrowRight className={styles.arrow} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={t("mobileMenuToggle")}
          aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu} />
          <div ref={mobileMenuRef} className={styles.mobileMenu}>
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
                      <ReactCountryFlag
                        countryCode={lang.flag}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                        }}
                      />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Contact Button */}
              <Link
                href={`/${locale}/contact`}
                className={styles.mobileContactButton}
                onClick={closeMobileMenu}
                style={
                  pathname !== `/${locale}`
                    ? { color: "#141414" }
                    : { color: "#fff" }
                }>
                <span
                  style={
                    pathname !== `/${locale}`
                      ? { color: "#141414" }
                      : { color: "#fff" }
                  }>
                  {t("contactUs")}
                </span>
                <FaArrowRight
                  style={
                    pathname !== `/${locale}`
                      ? { fill: "#141414" }
                      : { fill: "#fff" }
                  }
                  className={styles.arrow}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
