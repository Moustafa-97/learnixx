import CourseInDetail from "@/components/UI/CourseInDetail/CourseInDetail"
import React from "react"

interface PageProps {
  params: Promise<{
    courseID: string
  }>
}

async function page({ params }: PageProps) {
  // Await the params Promise
  const { courseID } = await params

  // Convert courseID to number
  const courseIdNumber = parseInt(courseID)

  // Handle invalid courseID
  if (isNaN(courseIdNumber) || courseIdNumber <= 0) {
    return (
      <section>
        <div>Invalid course ID</div>
      </section>
    )
  }

  return (
    <>
      <section>
        <CourseInDetail courseID={courseIdNumber} />
      </section>
    </>
  )
}

export default page
