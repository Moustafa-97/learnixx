"use client"
import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import Skeleton from "@mui/material/Skeleton"
import { LuCross } from "react-icons/lu"
import { useTranslations } from "next-intl"
import { Curriculum } from "@/types/career"
import styles from "./LeadFQA.module.scss"

interface LeadFQAProps {
  curriculums?: Curriculum[]
  loading?: boolean
  error?: string | null
}

function LeadFQA({ curriculums = [], loading = false, error }: LeadFQAProps) {
  const t = useTranslations("faq")
  const [expanded, setExpanded] = React.useState<string | false>("")

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  // Transform curriculum to include unit numbers
  const transformedCurriculums = curriculums.map((curriculum, index) => ({
    ...curriculum,
    unitTitle: `Unit ${index + 1}: ${curriculum.name}`,
    panelId: `panel-${curriculum.id}`,
  }))

  const renderAccordion = (
    curriculum: (typeof transformedCurriculums)[0],
    index: number
  ) => (
    <Accordion
      id={`accordion-${curriculum.id}-${index}`}
      key={curriculum.panelId}
      className={styles.accordion}
      style={
        expanded !== curriculum.panelId
          ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
          : { borderRadius: "20px" }
      }
      expanded={expanded === curriculum.panelId}
      onChange={handleChange(curriculum.panelId)}>
      <AccordionSummary
        expandIcon={<LuCross />}
        aria-controls={`${curriculum.panelId}-content`}
        id={`${curriculum.panelId}-header`}>
        <Typography component="span">{curriculum.unitTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{curriculum.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  const renderLoadingSkeleton = () => (
    <div className={styles.grp1}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.skeletonAccordion}>
          <Skeleton
            variant="rectangular"
            height={60}
            style={{ borderRadius: "20px" }}
          />
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className={styles.section}>
        <div className={styles.header}>
          <h6>{t("smallTitle")}</h6>
          <h2>{t("title2")}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <h5>{t("items.title")}</h5>
            {loading ? (
              <Skeleton variant="text" width="80%" height={24} />
            ) : error ? (
              <p className={styles.errorText}>{error}</p>
            ) : (
              <p>{t("items.subtitle")}</p>
            )}
          </div>

          {loading ? (
            renderLoadingSkeleton()
          ) : error ? (
            <div className={styles.errorContainer}>
              <p>
                {t("curriculumError", {
                  default: "Failed to load curriculum information",
                })}
              </p>
            </div>
          ) : curriculums.length > 0 ? (
            <div className={styles.grp1}>
              {transformedCurriculums.map((curriculum, index) =>
                renderAccordion(curriculum, index)
              )}
            </div>
          ) : (
            <div className={styles.noCurriculumContainer}>
              <p>
                {t("noCurriculumMessage", {
                  default:
                    "No curriculum information available for this course.",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default LeadFQA
