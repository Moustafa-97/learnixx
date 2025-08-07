import React from "react"
import FrequentAsk from "@/components/UI/frequentlyAsked/FrequentAsk"

import WhatSays from "@/components/UI/whatOurClientSays/WhatSays"
import AboutHero from "@/components/UI/About_Courses/AboutHero"
import Trainers from "@/components/UI/Trainers/Trainers"
import WhyUs from "@/components/UI/WhyUs/WhyUs"
import AboutCards from "@/components/UI/About-cards/AboutCards"

function About() {
  return (
    <main>
      <section>
        <AboutHero />
      </section>
      <section>
        <AboutCards />
      </section>
      <section>
        <Trainers />
      </section>
      <section>
        <WhyUs />
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

export default About
