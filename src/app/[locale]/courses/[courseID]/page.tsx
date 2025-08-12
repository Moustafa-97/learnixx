import CourseInDetail from "@/components/UI/CourseInDetail/CourseInDetail"
import React from "react"

// Import the PageProps type from your project
import type { PageProps } from "@/types/pageProp" // Adjust the import path based on your project structure

async function page({ params }: PageProps) {
  // Extract courseID from params and convert to number
  const courseID = parseInt(params.courseID)

  // Handle invalid courseID
  if (isNaN(courseID) || courseID <= 0) {
    return (
      <section>
        <div>Invalid course ID</div>
      </section>
    )
  }

  return (
    <>
      <section>
        <CourseInDetail courseID={courseID} />
      </section>
    </>
  )
}

export default page
