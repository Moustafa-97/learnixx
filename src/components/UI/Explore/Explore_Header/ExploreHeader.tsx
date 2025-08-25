import useStore from "@/store/useStore"
import styles from "./ExploreHeader.module.scss"
import { useTranslations } from "next-intl"

export default function ExploreHeader() {
  const { activeHomeSection, setActiveHomeSection } = useStore()
  const t = useTranslations("ExploreHeader")

  const sections: Array<{
    key: "Ready Courses" | "Lead Weekend" | "Customize with AI"
    id: string
    label: string
    description?: string
  }> = [
    {
      key: "Lead Weekend",
      id: t("sections.LeadWeekend.id"),
      label: t("sections.LeadWeekend.label"),
      description: t("sections.LeadWeekend.description"),
    },
    {
      key: "Ready Courses",
      id: t("sections.ReadyCourses.id"),
      label: t("sections.ReadyCourses.label"),
      description: t("sections.ReadyCourses.description"),
    },
    {
      key: "Customize with AI",
      id: t("sections.CustomizeWithAI.id"),
      label: t("sections.CustomizeWithAI.label"),
      description: t("sections.CustomizeWithAI.description"),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          {sections.find(section => section.id === activeHomeSection)?.label}
        </h2>
        <p>
          {
            sections.find(section => section.id === activeHomeSection)
              ?.description
          }
        </p>
      </div>
      <div className={styles.buttons}>
        {sections.map(section => (
          <button
            key={section.id}
            className={`${styles.button} ${activeHomeSection === section.id ? styles.active : ""}`}
            onClick={() => setActiveHomeSection(section.key)}>
            <span className={styles.label}>{section.id}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
