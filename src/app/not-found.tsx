// app/not-found.tsx
import React from "react"
import styles from "./notFound.module.scss"
import Link from "next/link"

export default function NotFound() {
  return (
    <body className={styles.container}>
      <h1>404</h1>
      <p>Sorry, we were unable to find that page</p>
      <Link href="/">HOME</Link>
    </body>
  )
}
