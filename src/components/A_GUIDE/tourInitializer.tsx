"use client"

import { useEffect } from "react"
import { useTour } from "./tourProvider"
import { TourConfig, TourStep } from "./tourRegistry"
import { useLocale } from "next-intl"

// Extend your step type to include route information
interface ExtendedStep extends TourStep {
  route?: string | ((locale: string) => string)
}

export default function TourInitializer() {
  const { registerTour } = useTour()
  const locale = useLocale()

  useEffect(() => {
    console.log("TourInitializer: Registering tours")

    // Create steps with locale resolved
    const createTourSteps = (): ExtendedStep[] => {
      const isArabic = locale === "ar"

      return [
        {
          target: '[data-tour="cities"]',
          content: isArabic
            ? "استكشف واختر مدينتك وما وجهاتك المفضلة"
            : "Discover and select your city and what and where you want to learn ",
          title: isArabic
            ? "ندعم المدن في اوروبا"
            : "we support cities in Europe",

          placement: "bottom",
          disableBeacon: false,
          spotlightClicks: true,
        },
        {
          target: '[data-tour="leadWeek"]',
          content: isArabic
            ? "قيادة الاسبوع: التوجيهات الخاصة لك في الاسبوع القادم"
            : "3-day immersive retreat in Barcelona guided by Europe’s top executive trainers Premium. Transformational. Unforgettable.",
          title: isArabic ? "قيادة الاسبوع" : "Lead Weekend",
          placement: "bottom",
          spotlightClicks: true,
        },
        {
          target: '[data-tour="customizeAI"]',
          content: isArabic
            ? "استخدم AI لتحسين تجربتك الدراسية. استخدم AI لتحسين تجربتك الدراسية. استخدم AI لتحسين تجربتك الدراسية"
            : "Smarter learning paths tailored to your goals using adaptive AI technology.",
          title: isArabic ? "استخدم AI" : "Powered by Learnix AI",
          placement: "bottom",
          spotlightClicks: true,
        },
        {
          target: '[data-tour="courses"]',
          content: isArabic
            ? "استكشف كورساتنا واختر الكورس المناسب لك"
            : "Discover and select your course and trainer",
          title: isArabic ? "استكشف كورساتنا" : "See Our variety of courses ",
          placement: "bottom",
          spotlightClicks: true,
        },
      ]
    }

    const headerTour: TourConfig = {
      id: "header-tour",
      name: "Platform Navigation Tour",
      autoStart: true,
      startDelay: 2000,
      showProgress: true,
      showSkipButton: true,
      continuous: true,
      steps: createTourSteps() as TourStep[],
    }

    // Register the tour
    registerTour(headerTour)
  }, [registerTour, locale])

  return null
}
