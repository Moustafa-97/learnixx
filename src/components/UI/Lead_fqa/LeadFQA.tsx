"use client"
import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { LuCross } from "react-icons/lu"
import { useTranslations } from "next-intl"
import styles from "./LeadFQA.module.scss"

const FAQ_PANEL_IDS = [
  "panel1",
  "panel2",
  "panel3",
  "panel4",
  "panel5",
] as const

function LeadFQA() {
  const t = useTranslations("faq")
  const [expanded, setExpanded] = React.useState<string | false>("")
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const renderAccordion = (panelId: string, index: number) => (
    <Accordion
      id={`accordion-${index}`}
      key={panelId}
      className={styles.accordion}
      style={
        expanded === panelId
          ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
          : { borderRadius: "20px" }
      }
      expanded={expanded === panelId}
      onChange={handleChange(panelId)}>
      <AccordionSummary
        expandIcon={<LuCross />}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}>
        <Typography component="span">
          {t(`items.${panelId}.question`)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{t(`items.${panelId}.answer`)}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  const groupPanels = FAQ_PANEL_IDS

  return (
    <>
      <div className={styles.section}>
        <h2>{t("title")}</h2>
        <div className={styles.container}>
          <div className={styles.grp1}>
            {groupPanels.map((panelId, index) =>
              renderAccordion(panelId, index)
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadFQA
