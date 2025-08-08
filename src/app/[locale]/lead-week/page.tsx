import HeroLead from "@/components/UI/Hero_Lead/HeroLead"
import LeadFQA from "@/components/UI/Lead_fqa/LeadFQA"
import CourseOverview from "@/components/UI/LeedSch/CourseOverview"
import React from "react"

function LeadWeekend() {
  return (
    <main style={{ marginTop: "150px" }}>
      <section>
        <HeroLead />
      </section>
      <section>
        <CourseOverview />
      </section>
      <section>
        <LeadFQA />
      </section>
    </main>
  )
}

export default LeadWeekend
