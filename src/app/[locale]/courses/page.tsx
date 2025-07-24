// app/[locale]/courses/page.tsx
import CourseContainer from "@/components/UI/Course_Container/CourseContainer"
import HeroCourses from "@/components/UI/Hero_Courses/HeroCourses"
import CourseSearchSync from "@/components/CourseSearchSync/CourseSearchSync"
import CourseHeader from "@/components/UI/Course_Container_Header/CourseHeader"
import styles from "./page.module.scss"

export default function CoursesPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams?: { subject?: string; location?: string }
}) {
  // Extract search parameters
  const { locale } = params
  console.log(locale, "Locale from params")

  const subject = searchParams?.subject || ""
  const location = searchParams?.location || ""

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <HeroCourses />
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <CourseHeader />
        </div>
        <div className={styles.content}>
          {/* This component syncs URL params with store */}
          <CourseSearchSync subject={subject} location={location} />
          <CourseContainer />
        </div>
      </div>
    </div>
  )
}
