// app/[locale]/courses/page.tsx
import CourseContainer from "@/components/UI/Course_Container/CourseContainer"
import HeroCourses from "@/components/UI/Hero_Courses/HeroCourses"
import CourseSearchSync from "@/components/CourseSearchSync/CourseSearchSync"
import styles from "./page.module.scss"
import CourseHeader from "@/components/UI/Course_Container_Header/CourseHeader"

interface PageProps {
  searchParams: {
    subject?: string
    location?: string
  }
}

export default function CoursesPage({ searchParams }: PageProps) {
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
          <CourseSearchSync
            subject={searchParams.subject || ""}
            location={searchParams.location || ""}
          />
          <CourseContainer />
        </div>
      </div>
    </div>
  )
}
