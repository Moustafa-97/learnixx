// components/DateRangePicker/DateRangePicker.tsx
import React, { useState, useEffect, useRef } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  addDays,
  // isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isWithinInterval,
  isEqual,
  getDay,
} from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { CalendarToday } from "@mui/icons-material"
import styles from "./DateRangePicker.module.scss"
import { useLocale, useTranslations } from "next-intl"

interface DateRangePickerProps {
  value: [Date | null, Date | null]
  onChange: (dates: [Date | null, Date | null]) => void
  placeholder?: string
  error?: boolean
  helperText?: string
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
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
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  className,
  fullWidth = true,
  label,
}) => {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(value[0])
  const [endDate, setEndDate] = useState<Date | null>(value[1])
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [screenWidth, setScreenWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const t = useTranslations("registration")
  const isRTL = locale === "ar"

  // Get the appropriate locale for date-fns
  const dateLocale = isRTL ? ar : enUS

  // Arabic month names
  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ]

  // Arabic weekday names
  const arabicWeekDays = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ]
  const englishWeekDays = ["S", "M", "T", "W", "T", "F", "S"]

  // Handle screen width for responsive design
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    setScreenWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = screenWidth <= 768

  useEffect(() => {
    setStartDate(value[0])
    setEndDate(value[1])
  }, [value])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date)
      setEndDate(null)
    } else {
      // Complete the range
      if (isAfter(date, startDate) || isEqual(date, startDate)) {
        setEndDate(date)
      } else {
        // If clicked date is before start date, make it the new start
        setEndDate(startDate)
        setStartDate(date)
      }
    }
  }

  const handleApply = () => {
    if (startDate && endDate) {
      onChange([startDate, endDate])
      setOpen(false)
    }
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true
    if (maxDate && isAfter(date, maxDate)) return true
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate))
  }

  const formatMonthYear = (date: Date) => {
    if (isRTL) {
      const month = arabicMonths[date.getMonth()]
      const year = date.getFullYear()
      return `${month} ${year}`
    }
    return format(date, "MMMM yyyy", { locale: dateLocale })
  }

  const renderMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate)
    const monthEnd = endOfMonth(monthStart)
    
    // Calculate the starting day of the week for the first day of the month
    const startDayOfWeek = getDay(monthStart)
    
    // Create array for days in the month only
    const days = []
    let currentDate = monthStart
    
    // Add empty slots for days before the month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the current month
    while (currentDate <= monthEnd) {
      days.push(currentDate)
      currentDate = addDays(currentDate, 1)
    }

    const weekDays = isRTL ? arabicWeekDays : englishWeekDays

    return (
      <div className={styles.calendar}>
        <div className={styles.monthYear}>{formatMonthYear(monthDate)}</div>

        <div className={styles.weekDays}>
          {weekDays.map((day, index) => (
            <div key={index} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {days.map((day, index) => {
            // Handle empty slots
            if (!day) {
              return <div key={index} className={styles.emptyDay}></div>
            }
            
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
              ((isAfter(hoverDate, startDate) &&
                isWithinInterval(day, { start: startDate, end: hoverDate })) ||
                (isBefore(hoverDate, startDate) &&
                  isWithinInterval(day, { start: hoverDate, end: startDate })))
            const isDisabled = isDateDisabled(day)
            const isToday = isSameDay(day, new Date())

            return (
              <button
                key={index}
                className={`
                  ${styles.day}
                  ${isSelected ? styles.selected : ""}
                  ${isInRange ? styles.inRange : ""}
                  ${isHoverRange ? styles.hoverRange : ""}
                  ${isDisabled ? styles.disabled : ""}
                  ${isToday ? styles.today : ""}
                  ${startDate && isSameDay(day, startDate) ? styles.rangeStart : ""}
                  ${endDate && isSameDay(day, endDate) ? styles.rangeEnd : ""}
                `}
                onClick={() => !isDisabled && handleDateClick(day)}
                onMouseEnter={() => !isDisabled && setHoverDate(day)}
                disabled={isDisabled}>
                {format(day, "d", { locale: dateLocale })}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const formatDateRange = () => {
    if (startDate && endDate) {
      if (isRTL) {
        // Arabic date format: DD/MM/YYYY
        return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`
      }
      return `${format(startDate, "yyyy-MM-dd")} - ${format(endDate, "yyyy-MM-dd")}`
    }
    return ""
  }

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentMonth(
      direction === "prev"
        ? subMonths(currentMonth, 1)
        : addMonths(currentMonth, 1)
    )
  }

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.selectButton} ${error ? styles.error : ""} ${fullWidth ? styles.fullWidth : ""}`}
        onClick={() => setOpen(true)}>
        <p>
          <span className={styles.selectText}>
            {startDate && endDate ? formatDateRange() : placeholder}
          </span>
          <span>
            <CalendarToday className={styles.selectButtonIcon} />
          </span>
        </p>
      </div>

      {helperText && (
        <div
          className={`${styles.helperText} ${error ? styles.errorText : ""}`}>
          {helperText}
        </div>
      )}

      {open && (
        <div className={styles.calendarWrapper} dir="ltr">
          <div className={styles.calendarContainer}>
            <div className={styles.navigation}>
              <button
                className={styles.navButton}
                onClick={() => handleNavigation("prev")}
                type="button">
                ‹
              </button>
              <button
                className={styles.navButton}
                onClick={() => handleNavigation("next")}
                type="button">
                ›
              </button>
            </div>

            <div className={styles.calendars}>
              {renderMonth(currentMonth)}
              {!isMobile && renderMonth(addMonths(currentMonth, 1))}
            </div>

            <div className={styles.footer}>
              <button
                onClick={handleApply}
                className={styles.applyButton}
                disabled={!startDate || !endDate}
                type="button">
                {t("fields.dateRange.apply") || "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}