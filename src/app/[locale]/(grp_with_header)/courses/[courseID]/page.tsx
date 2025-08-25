import CourseInDetail from "@/components/UI/CourseInDetail/CourseInDetail"
import React from "react"
import styles from "../page.module.scss"

interface PageProps {
  params: Promise<{
    courseID: string
  }>
}

async function page({ params }: PageProps) {
  // Await the params Promise
  const { courseID } = await params
  console.log("Course ID:", courseID)
  
  // Convert courseID to number
  const courseIdNumber = parseInt(courseID)
  
  console.log("Course IDN:", courseIdNumber)

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
      <section className={styles.page}>
        <CourseInDetail courseID={courseIdNumber} />
      </section>
    </>
  )
}

export default page
