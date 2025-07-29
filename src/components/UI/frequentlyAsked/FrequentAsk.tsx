"use client"
import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { LuCross } from "react-icons/lu"
import styles from "./FrequentAsk.module.scss"

export default function AccordionUsage() {
  const [expanded, setExpanded] = React.useState<string | false>("")

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }
  return (
    <>
      <div className={styles.section}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.container}>
          <div className={styles.grp1}>
            <Accordion
              className={styles.accordion}
              style={
                expanded === "panel1"
                  ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
                  : { borderRadius: "20px" }
              }
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}>
              <AccordionSummary
                expandIcon={<LuCross />}
                aria-controls="panel1-content"
                id="panel1-header">
                <Typography component="span">Accordion_1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={styles.accordion}
              style={
                expanded === "panel2"
                  ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
                  : { borderRadius: "20px" }
              }
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}>
              <AccordionSummary
                expandIcon={<LuCross />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={styles.accordion}
              style={
                expanded === "panel3"
                  ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
                  : { borderRadius: "20px" }
              }
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}>
              <AccordionSummary
                expandIcon={<LuCross />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={styles.grp2}>
            <Accordion
              className={styles.accordion}
              style={
                expanded === "panel4"
                  ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
                  : { borderRadius: "20px" }
              }
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}>
              <AccordionSummary
                expandIcon={<LuCross />}
                aria-controls="panel1-content"
                id="panel1-header">
                <Typography component="span">Accordion_1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={styles.accordion}
              style={
                expanded === "panel5"
                  ? { backgroundColor: "#CCCCCC", borderRadius: "20px" }
                  : { borderRadius: "20px" }
              }
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}>
              <AccordionSummary
                expandIcon={<LuCross />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
