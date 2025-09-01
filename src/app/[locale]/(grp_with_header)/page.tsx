import dynamic from "next/dynamic"

// Dynamic imports with loading states
const HeroHome = dynamic(() => import("@/components/UI/Hero_Home/HeroHome"), {
  loading: () => <div>Loading...</div>,
})

const ExploreContainer = dynamic(
  () => import("@/components/UI/Explore/Explore_Container/ExploreContainer"),
  {
    loading: () => <div>Loading...</div>,
  }
)

const WhyLearnix = dynamic(
  () => import("@/components/UI/whyLearnix/WhyLearnix"),
  {
    loading: () => <div>Loading...</div>,
  }
)

const HowItWorks = dynamic(
  () => import("@/components/UI/howItWorks/HowItWorks"),
  {
    loading: () => <div>Loading...</div>,
  }
)

const MostPopular = dynamic(
  () => import("@/components/UI/Most_Popular/MostPopular"),
  {
    loading: () => <div>Loading...</div>,
  }
)

const WhatSays = dynamic(
  () => import("@/components/UI/whatOurClientSays/WhatSays"),
  {
    loading: () => <div>Loading...</div>,
  }
)

const FrequentAsk = dynamic(
  () => import("@/components/UI/frequentlyAsked/FrequentAsk"),
  {
    loading: () => <div>Loading...</div>,
  }
)

export default function HomePage() {
  return (
    <main>
      <section>
        <HeroHome />
      </section>
      <section>
        <ExploreContainer />
      </section>
      <section id="why-learnix">
        <WhyLearnix />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="top-courses">
        <MostPopular />
      </section>
      <section id="testimonials">
        <WhatSays />
      </section>
      <section>
        <FrequentAsk />
      </section>
    </main>
  )
}
