// "use client"
// import React from "react"
// import styles from "./WhyLearnix.module.scss"
// import arrowbig from "@/../public/whyLearnix/arrowbig.svg"
// import arrowsmall from "@/../public/whyLearnix/arrowsmall.svg"
// import idea from "@/../public/whyLearnix/idea.svg"
// import chat from "@/../public/whyLearnix/chat.svg"
// import computer from "@/../public/whyLearnix/computer.svg"
// import world from "@/../public/whyLearnix/world.svg"
// import Image from "next/image"
// import { useTranslations } from "next-intl"
// import { useLocale } from "next-intl" // Add this import
// import { useRouter } from "next/navigation"

// function WhyLearnix() {
//   const t = useTranslations("whyLearnix")
//   const locale = useLocale() // Get current locale
//   const isRTL = locale === 'ar' // Check if Arabic
//   const router = useRouter()
//   const handleNavigation = () => {
//     router.push(`/${locale}/courses`)
//   }
  
//   return (
//     <>
//       <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
//         <div className={styles.content}>
//           <h2 className={styles.title}>{t("title")}</h2>
//           <p className={styles.description}>
//             {t("subtitle")}
//           </p>
//         </div>
//         <div className={styles.section}>
//           <div className={styles.cyrcle1}>
//             <div className={styles.cyrcle2}>
//               <div className={styles.cyrcle3}></div>
//             </div>
//           </div>
//           <div className={styles.cards1}>
//             <div className={styles.largeCard}>
//               <Image
//                 src={computer}
//                 alt={t("cards.globalConnections.iconAlt")}
//                 width={50}
//                 height={50}
//                 className={styles.Icon}
//               />
//               <h2>{t("cards.globalConnections.title")}</h2>
//               <p>
//                 {t("cards.globalConnections.description")}
//               </p>
//               <button onClick={handleNavigation}>{t("cards.globalConnections.buttonText")}</button>
//             </div>
//             <div className={styles.smallCard}>
//               <Image
//                 src={world}
//                 alt={t("cards.learnBest.iconAlt")}
//                 width={50}
//                 height={50}
//                 className={styles.Icon}
//               />
//               <h3>{t("cards.learnBest.title")}</h3>
//             </div>
//             <div className={styles.arrow}>
//               <Image
//                 src={arrowbig}
//                 alt="Arrow"
//                 width={100}
//                 height={100}
//                 className={styles.arrowBig}
//               />
//             </div>
//           </div>
//           <div className={styles.videoContainer}>
//             <video autoPlay loop muted playsInline className={styles.video}>
//               <source src="/whyLearnix/video2.mp4" type="video/mp4" />
//             </video>
//           </div>
//           <div className={styles.cards2}>
//             <div className={styles.arrow}>
//               <Image
//                 src={arrowsmall}
//                 alt="Arrow"
//                 width={100}
//                 height={100}
//                 className={styles.arrowSmall}
//               />
//             </div>
//             <div className={styles.smallCard}>
//               <Image
//                 src={chat}
//                 alt={t("cards.growingCommunity.iconAlt")}
//                 width={50}
//                 height={50}
//                 className={styles.Icon}
//               />
//               <h3>{t("cards.growingCommunity.title")}</h3>
//             </div>
//             <div className={styles.largeCard}>
//               <Image
//                 src={idea}
//                 alt={t("cards.practicalTrainers.iconAlt")}
//                 width={50}
//                 height={50}
//                 className={styles.Icon}
//               />
//               <h2>{t("cards.practicalTrainers.title")}</h2>
//               <p>
//                 {t("cards.practicalTrainers.description")}
//               </p>
//               <button onClick={handleNavigation}>{t("cards.practicalTrainers.buttonText")}</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default WhyLearnix

// app/components/WhyLearnix.tsx
"use client"
import React, { useEffect, useState, useRef } from "react"
import styles from "./WhyLearnix.module.scss"
import arrowbig from "@/../public/whyLearnix/arrowbig.svg"
import arrowsmall from "@/../public/whyLearnix/arrowsmall.svg"
import idea from "@/../public/whyLearnix/idea.svg"
import chat from "@/../public/whyLearnix/chat.svg"
import computer from "@/../public/whyLearnix/computer.svg"
import world from "@/../public/whyLearnix/world.svg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

// Custom hook for video caching
function useVideoCache(videoUrl: string) {
  const [videoSrc, setVideoSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const blobUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadVideo() {
      try {
        setIsLoading(true)
        setError(null)

        // Check if Cache API is available
        if (!('caches' in window)) {
          setVideoSrc(videoUrl)
          setIsLoading(false)
          return
        }

        const cacheName = 'video-cache-v1'
        const cache = await caches.open(cacheName)
        
        // Try to get from cache first
        const cachedResponse = await cache.match(videoUrl)
        
        if (cachedResponse) {
          const blob = await cachedResponse.blob()
          const blobUrl = URL.createObjectURL(blob)
          blobUrlRef.current = blobUrl
          
          if (isMounted) {
            setVideoSrc(blobUrl)
            setIsLoading(false)
          }
          return
        }

        // If not in cache, fetch and cache it
        const response = await fetch(videoUrl)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`)
        }

        // Clone response before caching
        const responseToCache = response.clone()
        await cache.put(videoUrl, responseToCache)
        
        // Create blob URL for immediate playback
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        blobUrlRef.current = blobUrl
        
        if (isMounted) {
          setVideoSrc(blobUrl)
          setIsLoading(false)
        }
        
      } catch (err) {
        console.error('Error loading video:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load video')
          setVideoSrc(videoUrl) // Fallback to direct URL
          setIsLoading(false)
        }
      }
    }

    loadVideo()

    // Cleanup function
    return () => {
      isMounted = false
      // Revoke blob URL when component unmounts
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
    }
  }, [videoUrl])

  return { videoSrc, isLoading, error }
}

function WhyLearnix() {
  const t = useTranslations("whyLearnix")
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { videoSrc, isLoading, error } = useVideoCache('/whyLearnix/video2.mp4')
  
  const handleNavigation = () => {
    router.push(`/${locale}/courses`)
  }

  // Retry playing video if it fails
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(e => {
        console.log('Autoplay prevented:', e)
      })
    }
  }, [videoSrc])
  
  return (
    <>
      <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.description}>
            {t("subtitle")}
          </p>
        </div>
        <div className={styles.section}>
          <div className={styles.cyrcle1}>
            <div className={styles.cyrcle2}>
              <div className={styles.cyrcle3}></div>
            </div>
          </div>
          <div className={styles.cards1}>
            <div className={styles.largeCard}>
              <Image
                src={computer}
                alt={t("cards.globalConnections.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h2>{t("cards.globalConnections.title")}</h2>
              <p>
                {t("cards.globalConnections.description")}
              </p>
              <button onClick={handleNavigation}>{t("cards.globalConnections.buttonText")}</button>
            </div>
            <div className={styles.smallCard}>
              <Image
                src={world}
                alt={t("cards.learnBest.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h3>{t("cards.learnBest.title")}</h3>
            </div>
            <div className={styles.arrow}>
              <Image
                src={arrowbig}
                alt="Arrow"
                width={100}
                height={100}
                className={styles.arrowBig}
              />
            </div>
          </div>
          <div className={styles.videoContainer}>
            {isLoading && (
              <div className={styles.videoPlaceholder}>
                <div className={styles.spinner}></div>
                <p>Loading video...</p>
              </div>
            )}
            {error && (
              <div className={styles.videoError}>
                <p>Error loading video</p>
              </div>
            )}
            {videoSrc && (
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.video}
                preload="metadata"
                style={{ display: isLoading ? 'none' : 'block' }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className={styles.cards2}>
            <div className={styles.arrow}>
              <Image
                src={arrowsmall}
                alt="Arrow"
                width={100}
                height={100}
                className={styles.arrowSmall}
              />
            </div>
            <div className={styles.smallCard}>
              <Image
                src={chat}
                alt={t("cards.growingCommunity.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h3>{t("cards.growingCommunity.title")}</h3>
            </div>
            <div className={styles.largeCard}>
              <Image
                src={idea}
                alt={t("cards.practicalTrainers.iconAlt")}
                width={50}
                height={50}
                className={styles.Icon}
              />
              <h2>{t("cards.practicalTrainers.title")}</h2>
              <p>
                {t("cards.practicalTrainers.description")}
              </p>
              <button onClick={handleNavigation}>{t("cards.practicalTrainers.buttonText")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyLearnix