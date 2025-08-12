import CourseInDetail from "@/components/UI/CourseInDetail/CourseInDetail"
import React from "react"

// For dynamic routes like [courseID], use params instead of searchParams
async function page({ 
  params 
}: { 
  params: { courseID: string } // Dynamic route params are always strings
}) {
  // Extract courseID from params
  const courseID = parseInt(params.courseID) // Convert to number if needed
  
  return (
    <>
      <section>
        <CourseInDetail courseID={courseID} />
      </section>
    </>
  )
}

export default page