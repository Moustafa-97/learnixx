import useStore from "@/store/useStore"
import styles from "./ExploreHeader.module.scss"

export default function ExploreHeader() {
  const { activeHomeSection, setActiveHomeSection } = useStore()

  const sections: Array<{
    id: "Ready Courses" | "Lead Weekend" | "Customize with AI"
    label: string
    description?: string
  }> = [
    {
      id: "Ready Courses",
      label: "Explore Career Ready Courses",
      description: "Career-based courses in management, tech, marketing, finance, and more  delivered in 5 focused weekdays.",
    },
    {
      id: "Lead Weekend",
      label: "Lead Weekend",
      description: "Join our weekend leadership programs",
    },
    {
      id: "Customize with AI",
      label: "Customize with AI",
      description: "Create personalized learning paths",
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
            onClick={() => setActiveHomeSection(section.id)}>
            <span className={styles.label}>{section.id}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
