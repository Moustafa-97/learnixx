"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { TextField, Button, Alert, CircularProgress, Box } from "@mui/material"
import axios from "axios"

import styles from "./ContactUs.module.scss"
import { useTranslations } from "next-intl"
import {  FaLinkedin, FaSnapchat} from "react-icons/fa"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
function ContactUs() {
  const t = useTranslations("contact")
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/v1/contact/get-in-touch`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess(true)
        reset() // Clear form

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message ||
            "Failed to submit form. Please try again."
        )
      } else {
        setSubmitError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <h4>{t("contactus")}</h4>
        </div>
        <div className={styles.blackContainer}>
          <div className={styles.info}>
            <div className={styles.infoBlock1}>
              <div className={styles.info1}>
                <h5>{t("connect")}</h5>
              </div>
              <div className={styles.info2}>
                <p>{t("connectDescription")}</p>
              </div>
            </div>
            <div className={styles.lowBlock}>
              <div className={styles.infoBlock2}>
                <div className={styles.info3}>
                  <h5>{t("info.contactUs")}</h5>
                  <p>+34 634828382</p>
                </div>
                <div className={styles.info4}>
                  <h5>{t("info.location")}</h5>
                  <p>Horizon Convention Center Amsterdam, Netherlands</p>
                </div>
              </div>
              <div className={styles.infoBlock3}>
                <div className={styles.info5}>
                  <h5>{t("info.email")}</h5>
                  <p onClick={() => window.open("mailto:info@learnixplus.com", "_blank")}>info@learnixplus.com</p>
                </div>
                <div className={styles.info6}>
                  <h5>{t("info.followUs")}</h5>
                  <div className={styles.icons}>
                    <FaLinkedin
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/company/learnix-plus/",
                          "_blank"
                        )
                      }
                    />
                    <FaSnapchat
                      onClick={() =>
                        window.open("https://t.snapchat.com/cYM0XmXS", "_blank")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <h6>{t("touch")}</h6>
            <p>{t("description")}</p>
            <Box className={styles.contactForm}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.formM}>
                {/* Success Alert */}
                {submitSuccess && (
                  <Alert severity="success" className={styles.alert}>
                    {`Thank you for contacting us! We'll get back to you soon.`}
                  </Alert>
                )}

                {/* Error Alert */}
                {submitError && (
                  <Alert
                    severity="error"
                    className={styles.alert}
                    onClose={() => setSubmitError(null)}>
                    {submitError}
                  </Alert>
                )}

                {/* Name Field */}
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="name-field"
                      label="Your Name"
                      variant="standard"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={submitting}
                      className={styles.textField}
                    />
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="email-field"
                      label="Email Address"
                      variant="standard"
                      fullWidth
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={submitting}
                      className={styles.textField}
                    />
                  )}
                />

                {/* Subject Field */}
                <Controller
                  name="subject"
                  control={control}
                  rules={{
                    required: "Subject is required",
                    minLength: {
                      value: 3,
                      message: "Subject must be at least 3 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="subject-field"
                      label="Subject"
                      variant="standard"
                      fullWidth
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      disabled={submitting}
                      className={styles.textField}
                    />
                  )}
                />

                {/* Message Field */}
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Message must not exceed 1000 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="message-field"
                      label="Message"
                      variant="standard"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      disabled={submitting}
                      className={styles.textField}
                    />
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting}
                  className={styles.submitButton}
                  size="large">
                  {submitting ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
