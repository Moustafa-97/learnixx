// import { useTranslations } from 'next-intl';
// import HeroSection from '@/components/sections/HeroSection';
// import SliderSection from '@/components/sections/SliderSection';
// import ThemeToggle from '@/components/common/ThemeToggle';

import ExploreContainer from "@/components/UI/Explore/Explore_Container/ExploreContainer"
import FrequentAsk from "@/components/UI/frequentlyAsked/FrequentAsk"
import HeroHome from "@/components/UI/Hero_Home/HeroHome"
import HowItWorks from "@/components/UI/howItWorks/HowItWorks"
import MostPopular from "@/components/UI/Most_Popular/MostPopular"
import WhatSays from "@/components/UI/whatOurClientSays/WhatSays"
import WhyLearnix from "@/components/UI/whyLearnix/WhyLearnix"

export default function HomePage() {
  //   const t = useTranslations();

  return (
    <main>
      <section>
        <HeroHome />
      </section>
      <section>
        <ExploreContainer />
      </section>
      <section>
        <WhyLearnix />
      </section>
      <section>
        <HowItWorks />
      </section>
      <section>
        <MostPopular />
      </section>
      <section>
        <WhatSays />
      </section>
      <section>
        <FrequentAsk />
      </section>
    </main>
  )
}
