
import ExploreContainer from "@/components/UI/Explore/Explore_Container/ExploreContainer"
import FrequentAsk from "@/components/UI/frequentlyAsked/FrequentAsk"
import HeroHome from "@/components/UI/Hero_Home/HeroHome"
import HowItWorks from "@/components/UI/howItWorks/HowItWorks"
import MostPopular from "@/components/UI/Most_Popular/MostPopular"
import WhatSays from "@/components/UI/whatOurClientSays/WhatSays"
import WhyLearnix from "@/components/UI/whyLearnix/WhyLearnix"

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
