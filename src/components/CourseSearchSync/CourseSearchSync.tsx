// components/CourseSearchSync/CourseSearchSync.tsx
"use client"

import { useEffect } from "react"
import useStore from "@/store/useStore"

interface CourseSearchSyncProps {
  subject: string
  location: string
}

export default function CourseSearchSync({ subject, location }: CourseSearchSyncProps) {
  const { setCourseSearchParams } = useStore()

  useEffect(() => {
    setCourseSearchParams({ subject, location })
  }, [subject, location, setCourseSearchParams])

  return null
}