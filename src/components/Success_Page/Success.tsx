/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect } from "react"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

export default function SuccessPage() {
  const locale = useLocale()
  const router = useRouter()
  useEffect(() => {
    const duration = 10 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 15, spread: 200, ticks: 600, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      onClick={() => {
        router.push(`/${locale}`)
      }}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#fff",
      }}>
      {/* Success content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
        }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉 Success!</h1>
        <p style={{ fontSize: "1.5rem" }}>
          Your operation was completed successfully.
        </p>
      </div>
    </div>
  )
}
