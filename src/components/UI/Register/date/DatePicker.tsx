// components/DateRangePicker/DateRangePicker.tsx
import React, { useState, useEffect, useRef } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addDays,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns"
import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  Close,
} from "@mui/icons-material"
import {
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  TextField,
} from "@mui/material"
import { useLocale } from "next-intl"
import styles from "./DateRangePicker.module.scss"

interface DateRangePickerProps {
  value: [Date | null, Date | null]
  onChange: (dates: [Date | null, Date | null]) => void
  placeholder?: string
  error?: boolean
  helperText?: string
  minDate?: Date
  maxDate?: Date
  className?: string
  fullWidth?: boolean
  label?: string
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date range",
  error,
  helperText,
  minDate,
  maxDate,
  className,
  fullWidth = true,
  label,
}) => {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(value[0])
  const [endDate, setEndDate] = useState<Date | null>(value[1])
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isRTL = locale === "ar"

  useEffect(() => {
    setStartDate(value[0])
    setEndDate(value[1])
  }, [value])

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date)
      setEndDate(null)
    } else {
      // Complete the range
      if (isAfter(date, startDate)) {
        setEndDate(date)
        onChange([startDate, date])
        setTimeout(() => setOpen(false), 200)
      } else {
        // If clicked date is before start date, reset
        setStartDate(date)
        setEndDate(null)
      }
    }
  }

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth(
      direction === "prev"
        ? subMonths(currentMonth, 1)
        : addMonths(currentMonth, 1)
    )
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)

    const days = []
    let currentDate = calendarStart

    while (currentDate <= calendarEnd) {
      days.push(currentDate)
      currentDate = addDays(currentDate, 1)
    }

    const weekDays = isRTL
      ? ["س", "ج", "خ", "أ", "ث", "إ", "ح"]
      : ["S", "M", "T", "W", "T", "F", "S"]

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <IconButton onClick={() => handleMonthChange("prev")} size="small">
            {isRTL ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
          <span className={styles.monthYear}>
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <IconButton onClick={() => handleMonthChange("next")} size="small">
            {isRTL ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>

        <div className={styles.weekDays}>
          {weekDays.map((day, index) => (
            <div key={index} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, monthStart)
            const isSelected =
              (startDate && isSameDay(day, startDate)) ||
              (endDate && isSameDay(day, endDate))
            const isInRange =
              startDate &&
              endDate &&
              isWithinInterval(day, { start: startDate, end: endDate })
            const isHoverRange =
              startDate &&
              !endDate &&
              hoverDate &&
              isAfter(hoverDate, startDate) &&
              isWithinInterval(day, { start: startDate, end: hoverDate })
            const isDisabled =
              (minDate && isBefore(day, minDate)) ||
              (maxDate && isAfter(day, maxDate))
            const isToday = isSameDay(day, new Date())

            return (
              <button
                key={index}
                className={`
                  ${styles.day}
                  ${!isCurrentMonth ? styles.otherMonth : ""}
                  ${isSelected ? styles.selected : ""}
                  ${isInRange ? styles.inRange : ""}
                  ${isHoverRange ? styles.hoverRange : ""}
                  ${isDisabled ? styles.disabled : ""}
                  ${isToday ? styles.today : ""}
                  ${startDate && isSameDay(day, startDate) ? styles.rangeStart : ""}
                  ${endDate && isSameDay(day, endDate) ? styles.rangeEnd : ""}
                `}
                onClick={() => !isDisabled && handleDateClick(day)}
                onMouseEnter={() => setHoverDate(day)}
                disabled={isDisabled}>
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`
    }
    return ""
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStartDate(null)
    setEndDate(null)
    onChange([null, null])
  }

  return (
    <>
      <div ref={anchorRef} className={className}>
        <TextField
          fullWidth={fullWidth}
          value={formatDateRange()}
          placeholder={placeholder}
          onClick={() => setOpen(true)}
          error={error}
          helperText={helperText}
          label={label}
          InputProps={{
            readOnly: true,
            startAdornment: <CalendarToday className={styles.calendarIcon} />,
            endAdornment: (startDate || endDate) && (
              <IconButton size="small" onClick={handleClear}>
                <Close fontSize="small" />
              </IconButton>
            ),
          }}
          className={styles.input}
        />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        className={styles.popper}
        modifiers={[
          {
            name: "flip",
            enabled: true,
          },
          {
            name: "preventOverflow",
            enabled: true,
          },
        ]}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={styles.paper} elevation={8}>
            <div className={styles.dateRangePicker}>
              <div className={styles.header}>
                <div className={styles.headerTitle}>
                  {startDate && !endDate
                    ? "Select end date"
                    : "Select date range"}
                </div>
                <IconButton size="small" onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </div>

              <div className={styles.calendarsContainer}>
                {renderCalendar()}
                <div className={styles.divider} />
                <div className={styles.calendar}>
                  {(() => {
                    const nextMonth = addMonths(currentMonth, 1)
                    const monthStart = startOfMonth(nextMonth)
                    const monthEnd = endOfMonth(monthStart)
                    const calendarStart = startOfWeek(monthStart)
                    const calendarEnd = endOfWeek(monthEnd)

                    const days = []
                    let currentDate = calendarStart

                    while (currentDate <= calendarEnd) {
                      days.push(currentDate)
                      currentDate = addDays(currentDate, 1)
                    }

                    const weekDays = isRTL
                      ? ["س", "ج", "خ", "أ", "ث", "إ", "ح"]
                      : ["S", "M", "T", "W", "T", "F", "S"]

                    return (
                      <>
                        <div className={styles.calendarHeader}>
                          <div style={{ width: 40 }} />
                          <span className={styles.monthYear}>
                            {format(nextMonth, "MMMM yyyy")}
                          </span>
                          <div style={{ width: 40 }} />
                        </div>

                        <div className={styles.weekDays}>
                          {weekDays.map((day, index) => (
                            <div key={index} className={styles.weekDay}>
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className={styles.daysGrid}>
                          {days.map((day, index) => {
                            const isCurrentMonth = isSameMonth(day, monthStart)
                            const isSelected =
                              (startDate && isSameDay(day, startDate)) ||
                              (endDate && isSameDay(day, endDate))
                            const isInRange =
                              startDate &&
                              endDate &&
                              isWithinInterval(day, {
                                start: startDate,
                                end: endDate,
                              })
                            const isHoverRange =
                              startDate &&
                              !endDate &&
                              hoverDate &&
                              isAfter(hoverDate, startDate) &&
                              isWithinInterval(day, {
                                start: startDate,
                                end: hoverDate,
                              })
                            const isDisabled =
                              (minDate && isBefore(day, minDate)) ||
                              (maxDate && isAfter(day, maxDate))
                            const isToday = isSameDay(day, new Date())

                            return (
                              <button
                                key={index}
                                className={`
                                  ${styles.day}
                                  ${!isCurrentMonth ? styles.otherMonth : ""}
                                  ${isSelected ? styles.selected : ""}
                                  ${isInRange ? styles.inRange : ""}
                                  ${isHoverRange ? styles.hoverRange : ""}
                                  ${isDisabled ? styles.disabled : ""}
                                  ${isToday ? styles.today : ""}
                                  ${startDate && isSameDay(day, startDate) ? styles.rangeStart : ""}
                                  ${endDate && isSameDay(day, endDate) ? styles.rangeEnd : ""}
                                `}
                                onClick={() =>
                                  !isDisabled && handleDateClick(day)
                                }
                                onMouseEnter={() => setHoverDate(day)}
                                disabled={isDisabled}>
                                {format(day, "d")}
                              </button>
                            )
                          })}
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              {startDate && endDate && (
                <div className={styles.footer}>
                  <div className={styles.selectedRange}>
                    {formatDateRange()}
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
