// import { useTranslations } from 'next-intl';
// import HeroSection from '@/components/sections/HeroSection';
// import SliderSection from '@/components/sections/SliderSection';
// import ThemeToggle from '@/components/common/ThemeToggle';

import ExploreContainer from "@/components/UI/Explore/Explore_Container/ExploreContainer"
import HeroHome from "@/components/UI/Hero_Home/HeroHome"
import HowItWorks from "@/components/UI/howItWorks/HowItWorks"
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
    </main>
  )
}
