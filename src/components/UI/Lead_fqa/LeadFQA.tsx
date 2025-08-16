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
        expanded !== panelId
          ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
          : { borderRadius: "20px" }
      }
      expanded={expanded === panelId}
      onChange={handleChange(panelId)}>
      <AccordionSummary
        expandIcon={<LuCross />}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}>
        <Typography component="span">{t(`items.lead.${panelId}.unit`)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{t(`items.lead.${panelId}.content`)}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  const groupPanels = FAQ_PANEL_IDS

  return (
    <>
      <div className={styles.section}>
        <div className={styles.header}>
          <h6>{t("smallTitle")}</h6>
          <h2>{t("title")}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <h5>{t("items.title")}</h5>
            <p>{t("items.subtitle")}</p>
          </div>
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
