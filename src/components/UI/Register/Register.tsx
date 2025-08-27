// // "use client"

// // import React, { useEffect, useState } from "react"
// // import { useSearchParams } from "next/navigation"
// // import { useForm, Controller } from "react-hook-form"
// // import {
// //   TextField,
// //   Button,
// //   RadioGroup,
// //   FormControlLabel,
// //   Radio,
// //   MenuItem,
// //   CircularProgress,
// //   Alert,
// // } from "@mui/material"
// // import { ArrowBack } from "@mui/icons-material"
// // import { useRouter } from "next/navigation"
// // import axios from "axios"
// // import styles from "./RegistrationForm.module.scss"
// // import Image from "next/image"
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// // import { format } from "date-fns"
// // import { useLocale } from "next-intl"

// // // Types
// // interface Trainer {
// //   id: number
// //   name: string
// //   title: string
// //   linkedIn: string
// //   trainerPicture: string
// // }

// // interface City {
// //   id: number
// //   name: string
// //   country: {
// //     id: number
// //     name: string
// //     iso: string
// //   }
// // }

// // interface Course {
// //   id: number
// //   title: string
// //   description: string
// //   startDate: string
// //   endDate?: string
// //   price: number
// //   trainers: Trainer[]
// //   city: City | null
// // }

// // interface RegistrationForm {
// //   fullName: string
// //   email: string
// //   jobTitle: string
// //   startDate: string
// //   endDate: string
// //   companyName: string
// //   cityId: number
// //   trainerId: number
// // }
// // interface apiCity {
// //   data: {
// //     id: number
// //     name: string
// //     iso: string
// //   }[]
// //   meta: {
// //     page: number
// //     perPage: number
// //     total: number
// //     totalPages: number
// //     hasNext: boolean
// //     hasPrev: boolean
// //   }
// //   lang: string
// // }

// // export default function CourseRegistrationForm() {
// //   const router = useRouter()
// //   const searchParams = useSearchParams()
// //   const courseId = searchParams.get("courseID")
// //   const cityIdParam = searchParams.get("cityId")
// //   const cityName = searchParams.get("cityName")
// //   console.log("City ID:", cityIdParam)
// //   console.log("City Name:", cityName)
// //   console.log("Course ID:", courseId)

// //   const [course, setCourse] = useState<Course | null>(null)
// //   // const [loading, setLoading] = useState(true)
// //   const [submitting, setSubmitting] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const locale = useLocale()
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //     setValue,
// //     watch,
// //   } = useForm<RegistrationForm>({
// //     defaultValues: {
// //       fullName: "",
// //       email: "",
// //       jobTitle: "",
// //       startDate: "",
// //       endDate: "",
// //       companyName: "",
// //       cityId: cityIdParam && cityIdParam !== "Leed" ? parseInt(cityIdParam) : 0,
// //       trainerId: 0,
// //     },
// //   })

// //   const selectedTrainerId = watch("trainerId")
// //   const startDate = watch("startDate")

// //   useEffect(() => {
// //     if (courseId && courseId !== "Leed") {
// //       fetchCourseData()
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [courseId])
// //   const [leetCity, setLeetCity] = useState<apiCity | null>(null)
// //   useEffect(() => {
// //     if (courseId === "Leed") {
// //       const fetchLeetCity = async () => {
// //         try {
// //           const { data } = await axios.get<apiCity>(
// //             `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${cityName ? `search=${cityName}` : ""}`,
// //             {
// //               headers: {
// //                 "Accept-Language": locale,
// //               },
// //             }
// //           )
// //           setLeetCity(data)
// //         } catch (err) {
// //           console.error("Error fetching Leet City:", err)
// //         }
// //       }
// //       fetchLeetCity()
// //     }
// //   }, [courseId, cityIdParam, locale, cityName])

// //   const fetchCourseData = async () => {
// //     try {
// //       // setLoading(true)
// //       const { data } = await axios.get<Course>(
// //         `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}`
// //       )
// //       setCourse(data)

// //       // Set default dates from course
// //       setValue("startDate", data.startDate)
// //       if (data.endDate) {
// //         setValue("endDate", data.endDate)
// //       }

// //       // Set city if not provided in params
// //       if (!cityIdParam && data.city) {
// //         setValue("cityId", data.city ? data.city.id : 0)
// //       }
// //     } catch (err) {
// //       console.error("Error fetching course data:", err)
// //       setError("Failed to load course information")
// //     } finally {
// //       // setLoading(false)
// //     }
// //   }

// //   const [leetTrainer, setLeetTrainer] = useState<Trainer[] | null>(null)

// //   useEffect(() => {
// //     if (courseId === "Leed") {
// //       const fetchLeetTrainer = async () => {
// //         try {
// //           const { data } = await axios.get<{ data: Trainer[] }>(
// //             `${process.env.NEXT_PUBLIC_API}/api/v1/trainers?leadWeekend=true`
// //           )
// //           setLeetTrainer(data.data)
// //         } catch (err) {
// //           console.error("Error fetching Leet Trainer:", err)
// //         }
// //       }
// //       fetchLeetTrainer()
// //     }
// //   }, [courseId])

// //   const onSubmit = async (data: RegistrationForm) => {
// //     try {
// //       setSubmitting(true)
// //       setError(null)

// //       // Ensure trainerId is an integer
// //       //
// //       if (courseId !== "Leed") {
// //         // Include dates for non-Leed courses
// //         const submissionData = {
// //           fullName: data.fullName,
// //           email: data.email,
// //           jobTitle: data.jobTitle,
// //           startDate: data.startDate,
// //           endDate: data.endDate,
// //           companyName: data.companyName,
// //           cityId: parseInt(data.cityId.toString()),
// //           trainerId: parseInt(data.trainerId.toString()),
// //         }

// //         await axios.post(
// //           `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}/register`,
// //           submissionData
// //         )
// //       } else {
// //         // Exclude dates for Leed
// //         const submissionData = {
// //           fullName: data.fullName,
// //           email: data.email,
// //           jobTitle: data.jobTitle,
// //           companyName: data.companyName,
// //           cityId: parseInt(data.cityId.toString()),
// //           trainerId: parseInt(data.trainerId.toString()),
// //         }

// //         await axios.post(
// //           `${process.env.NEXT_PUBLIC_API}/api/v1/lead-weekend/apply`,
// //           submissionData
// //         )
// //       }
// //       // Handle success - redirect or show success message
// //       router.push(`/${locale}/registration-success`)
// //     } catch (err) {
// //       console.error("Error registering for course:", err)
// //       setError("Registration failed. Please try again.")
// //     } finally {
// //       setSubmitting(false)
// //     }
// //   }

// //   // if (loading) {
// //   //   return (
// //   //     <div className={styles.loadingContainer}>
// //   //       <CircularProgress />
// //   //     </div>
// //   //   )
// //   // }

// //   if (!course && courseId !== "Leed") {
// //     return (
// //       <div className={styles.errorContainer}>
// //         <Alert severity="error">Course not found</Alert>
// //       </div>
// //     )
// //   }

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <div className={styles.registrationContainer}>
// //         <div className={styles.leftPanel}>
// //           <div className={styles.header}>
// //             <button className={styles.backButton} onClick={() => router.back()}>
// //               <ArrowBack />
// //             </button>
// //           </div>

// //           <div className={styles.formContainer}>
// //             <h1 className={styles.title}>Register To Enroll</h1>
// //             <p className={styles.subtitle}>
// //               Unlock this course and start your personalized learning journey.
// //             </p>

// //             {error && (
// //               <Alert severity="error" className={styles.errorAlert}>
// //                 {error}
// //               </Alert>
// //             )}

// //             <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Full Name</label>
// //                 <Controller
// //                   name="fullName"
// //                   control={control}
// //                   rules={{ required: "Full name is required" }}
// //                   render={({ field }) => (
// //                     <TextField
// //                       {...field}
// //                       fullWidth
// //                       placeholder="Enter your full name"
// //                       error={!!errors.fullName}
// //                       helperText={errors.fullName?.message}
// //                       className={styles.input}
// //                     />
// //                   )}
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Email Address</label>
// //                 <Controller
// //                   name="email"
// //                   control={control}
// //                   rules={{
// //                     required: "Email is required",
// //                     pattern: {
// //                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                       message: "Invalid email address",
// //                     },
// //                   }}
// //                   render={({ field }) => (
// //                     <TextField
// //                       {...field}
// //                       fullWidth
// //                       type="email"
// //                       placeholder="Enter your email"
// //                       error={!!errors.email}
// //                       helperText={errors.email?.message}
// //                       className={styles.input}
// //                     />
// //                   )}
// //                 />
// //               </div>

// //               {/* Date Range Selection */}
// //               <div className={styles.dateRangeGroup}>
// //                 <div className={styles.formGroup}>
// //                   <label className={styles.label}>Start Date</label>
// //                   <Controller
// //                     name="startDate"
// //                     control={control}
// //                     rules={{ required: "Start date is required" }}
// //                     render={({ field }) => (
// //                       <DatePicker
// //                         value={field.value ? new Date(field.value) : null}
// //                         onChange={date => {
// //                           field.onChange(date ? format(date, "yyyy-MM-dd") : "")
// //                         }}
// //                         slotProps={{
// //                           textField: {
// //                             fullWidth: true,
// //                             error: !!errors.startDate,
// //                             helperText: errors.startDate?.message,
// //                             className: styles.input,
// //                             placeholder: "Select start date",
// //                           },
// //                         }}
// //                         minDate={new Date()}
// //                       />
// //                     )}
// //                   />
// //                 </div>

// //                 <div className={styles.formGroup}>
// //                   <label className={styles.label}>End Date</label>
// //                   <Controller
// //                     name="endDate"
// //                     control={control}
// //                     rules={{
// //                       required: "End date is required",
// //                       validate: value => {
// //                         if (
// //                           startDate &&
// //                           value &&
// //                           new Date(value) < new Date(startDate)
// //                         ) {
// //                           return "End date must be after start date"
// //                         }
// //                         return true
// //                       },
// //                     }}
// //                     render={({ field }) => (
// //                       <DatePicker
// //                         value={field.value ? new Date(field.value) : null}
// //                         onChange={date => {
// //                           field.onChange(date ? format(date, "yyyy-MM-dd") : "")
// //                         }}
// //                         slotProps={{
// //                           textField: {
// //                             fullWidth: true,
// //                             error: !!errors.endDate,
// //                             helperText: errors.endDate?.message,
// //                             className: styles.input,
// //                             placeholder: "Select end date",
// //                           },
// //                         }}
// //                         minDate={startDate ? new Date(startDate) : new Date()}
// //                       />
// //                     )}
// //                   />
// //                 </div>
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Select the trainer</label>
// //                 <Controller
// //                   name="trainerId"
// //                   control={control}
// //                   rules={{ required: "Please select a trainer" }}
// //                   render={({ field }) => (
// //                     <RadioGroup
// //                       {...field}
// //                       value={field.value}
// //                       sx={{
// //                         display: "flex",
// //                         flexDirection: "row",
// //                         alignItems: "center",
// //                         justifyContent: "space-between",
// //                         flexWrap: "nowrap",
// //                         //responsive
// //                         "@media (max-width: 768px)": {
// //                           flexDirection: "column",
// //                           alignItems: "flex-start",
// //                           width: "100%",
// //                         },
// //                       }}
// //                       onChange={e => field.onChange(parseInt(e.target.value))}
// //                       className={styles.trainerGrid}>
// //                       {courseId !== "Leed"
// //                         ? course &&
// //                           course.trainers.map(trainer => (
// //                             <FormControlLabel
// //                               key={trainer.id}
// //                               value={trainer.id}
// //                               sx={{
// //                                 display: "flex",
// //                                 flexDirection: "column",
// //                                 alignItems: "center",
// //                                 margin: "auto",
// //                                 "@media (max-width: 768px)": {
// //                                   width: "100%",
// //                                 },
// //                                 "& .MuiFormControlLabel-label": {
// //                                   "@media (max-width: 768px)": {
// //                                     width: "100%",
// //                                   },
// //                                 },
// //                               }}
// //                               control={
// //                                 <Radio
// //                                   sx={{ display: "none", width: "100%" }}
// //                                 />
// //                               }
// //                               label={
// //                                 <div
// //                                   style={{
// //                                     width: "100%",
// //                                   }}
// //                                   className={`${styles.trainerCard} ${
// //                                     selectedTrainerId === trainer.id
// //                                       ? styles.selected
// //                                       : ""
// //                                   }`}>
// //                                   <Image
// //                                     src={trainer.trainerPicture}
// //                                     alt={trainer.name}
// //                                     className={styles.trainerImage}
// //                                     width={100}
// //                                     height={100}
// //                                   />
// //                                   <h4 className={styles.trainerName}>
// //                                     {trainer.name}
// //                                   </h4>
// //                                   <p className={styles.trainerTitle}>
// //                                     {trainer.title}
// //                                   </p>
// //                                 </div>
// //                               }
// //                               className={styles.trainerLabel}
// //                             />
// //                           ))
// //                         : leetTrainer &&
// //                           leetTrainer.map(trainer => (
// //                             <FormControlLabel
// //                               key={trainer.id}
// //                               value={trainer.id}
// //                               sx={{
// //                                 display: "flex",
// //                                 flexDirection: "column",
// //                                 alignItems: "center",
// //                                 margin: "auto",
// //                                 "@media (max-width: 768px)": {
// //                                   width: "100%",
// //                                 },
// //                                 "& .MuiFormControlLabel-label": {
// //                                   "@media (max-width: 768px)": {
// //                                     width: "100%",
// //                                   },
// //                                 },
// //                               }}
// //                               control={
// //                                 <Radio
// //                                   sx={{ display: "none", width: "100%" }}
// //                                 />
// //                               }
// //                               label={
// //                                 <div
// //                                   className={`${styles.trainerCard} ${
// //                                     selectedTrainerId === trainer.id
// //                                       ? styles.selected
// //                                       : ""
// //                                   }`}>
// //                                   <Image
// //                                     src={trainer.trainerPicture}
// //                                     alt={trainer.name}
// //                                     className={styles.trainerImage}
// //                                     width={100}
// //                                     height={100}
// //                                   />
// //                                   <h4 className={styles.trainerName}>
// //                                     {trainer.name}
// //                                   </h4>
// //                                   <p className={styles.trainerTitle}>
// //                                     {trainer.title}
// //                                   </p>
// //                                 </div>
// //                               }
// //                               className={styles.trainerLabel}
// //                             />
// //                           ))}
// //                     </RadioGroup>
// //                   )}
// //                 />
// //                 {errors.trainerId && (
// //                   <span className={styles.errorText}>
// //                     {errors.trainerId.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Job Title</label>
// //                 <Controller
// //                   name="jobTitle"
// //                   control={control}
// //                   rules={{ required: "Job title is required" }}
// //                   render={({ field }) => (
// //                     <TextField
// //                       {...field}
// //                       fullWidth
// //                       placeholder="e.g., Marketing Manager"
// //                       error={!!errors.jobTitle}
// //                       helperText={errors.jobTitle?.message}
// //                       className={styles.input}
// //                     />
// //                   )}
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Company Name</label>
// //                 <Controller
// //                   name="companyName"
// //                   control={control}
// //                   rules={{ required: "Company name is required" }}
// //                   render={({ field }) => (
// //                     <TextField
// //                       {...field}
// //                       fullWidth
// //                       placeholder="e.g., Meta, Freelance, Self-employed"
// //                       error={!!errors.companyName}
// //                       helperText={errors.companyName?.message}
// //                       className={styles.input}
// //                     />
// //                   )}
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.label}>Select the city</label>
// //                 <Controller
// //                   name="cityId"
// //                   control={control}
// //                   rules={{
// //                     required: "Please select a city",
// //                     validate: value => value !== 0 || "Please select a city",
// //                   }}
// //                   render={({ field }) => (
// //                     <TextField
// //                       {...field}
// //                       select
// //                       fullWidth
// //                       error={!!errors.cityId}
// //                       helperText={errors.cityId?.message}
// //                       className={styles.input}
// //                       placeholder="choose the city">
// //                       <MenuItem value={0} disabled>
// //                         choose the city
// //                       </MenuItem>
// //                       {cityIdParam !== "Leed" ? (
// //                         <MenuItem
// //                           value={
// //                             course
// //                               ? course.city
// //                                 ? course.city.id
// //                                 : leetCity?.data[0]?.id
// //                               : "0"
// //                           }
// //                           key={
// //                             (cityIdParam || course) && course?.city
// //                               ? course.city?.id
// //                               : cityIdParam
// //                           }>
// //                           {course
// //                             ? course.city
// //                               ? course.city.country.name
// //                               : cityName
// //                             : "Leed"}
// //                         </MenuItem>
// //                       ) : (
// //                         leetCity?.data.map(city => (
// //                           <MenuItem value={city?.id} key={course && city.id}>
// //                             {city.name}
// //                           </MenuItem>
// //                         ))
// //                       )}
// //                     </TextField>
// //                   )}
// //                 />
// //               </div>

// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 fullWidth
// //                 sx={{
// //                   background:
// //                     "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
// //                   textTransform: "none",
// //                   boxShadow: "none",
// //                   "&:hover": {
// //                     background:
// //                       "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
// //                     boxShadow: "none",
// //                   },
// //                   "&:active": {
// //                     boxShadow: "none",
// //                   },
// //                   "&:focus": {
// //                     boxShadow: "none",
// //                   },
// //                   "&.Mui-disabled": {
// //                     background: "#ccc",
// //                     color: "rgba(0, 0, 0, 0.26)",
// //                   },
// //                 }}
// //                 disableRipple
// //                 disableElevation
// //                 disabled={submitting}
// //                 className={styles.submitButton}>
// //                 {submitting ? (
// //                   <CircularProgress size={24} sx={{ color: "#fff" }} />
// //                 ) : (
// //                   "Apply now"
// //                 )}
// //               </Button>
// //             </form>
// //           </div>
// //         </div>

// //         <div className={styles.rightPanel}>
// //           <div className={styles.decorativeBackground} />
// //         </div>
// //       </div>
// //     </LocalizationProvider>
// //   )
// // }

// "use client"

// import React, { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import { useForm, Controller } from "react-hook-form"
// import {
//   TextField,
//   Button,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   MenuItem,
//   CircularProgress,
//   Alert,
// } from "@mui/material"
// import { ArrowBack } from "@mui/icons-material"
// import { useRouter } from "next/navigation"
// import axios from "axios"
// import styles from "./RegistrationForm.module.scss"
// import Image from "next/image"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import { format } from "date-fns"
// import { useLocale, useTranslations } from "next-intl"

// // Types
// interface Trainer {
//   id: number
//   name: string
//   title: string
//   linkedIn: string
//   trainerPicture: string
// }

// interface City {
//   id: number
//   name: string
//   country?: {
//     id: number
//     name: string
//     iso: string
//   }
// }

// interface Course {
//   id: number
//   title: string
//   description: string
//   startDate: string
//   endDate?: string
//   price: number
//   trainers: Trainer[]
//   city: City | null
// }

// interface RegistrationForm {
//   fullName: string
//   email: string
//   jobTitle: string
//   startDate: string
//   endDate: string
//   companyName: string
//   cityId: number
//   trainerId: number
// }

// interface apiCity {
//   data: City[]
//   meta: {
//     page: number
//     perPage: number
//     total: number
//     totalPages: number
//     hasNext: boolean
//     hasPrev: boolean
//   }
//   lang: string
// }

// export default function CourseRegistrationForm() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const courseId = searchParams.get("courseID")
//   const cityIdParam = searchParams.get("cityId")
//   const cityName = searchParams.get("cityName")
//   const locale = useLocale()
//   const t = useTranslations("registration")

//   const [course, setCourse] = useState<Course | null>(null)
//   const [availableCities, setAvailableCities] = useState<City[]>([])
//   const [leetTrainer, setLeetTrainer] = useState<Trainer[] | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<RegistrationForm>({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       jobTitle: "",
//       startDate: "",
//       endDate: "",
//       companyName: "",
//       cityId: 0,
//       trainerId: 0,
//     },
//   })

//   const selectedTrainerId = watch("trainerId")
//   const startDate = watch("startDate")
//   const isLeedCourse = courseId === "Leed"

//   // Fetch course data
//   useEffect(() => {
//     if (courseId && !isLeedCourse) {
//       fetchCourseData()
//     } else {
//       setLoading(false)
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [courseId, isLeedCourse])

//   // Fetch cities
//   useEffect(() => {
//     const loadCities = async () => {
//       try {
//         let cities: City[] = []

//         if (isLeedCourse || cityName) {
//           // Fetch cities from API
//           const { data } = await axios.get<apiCity>(
//             `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${
//               cityName ? `search=${cityName}` : ""
//             }`,
//             {
//               headers: {
//                 "Accept-Language": locale,
//               },
//             }
//           )
//           cities = data.data || []
//         } else if (course?.city) {
//           // Use course city
//           cities = [course.city]
//         }

//         setAvailableCities(cities)

//         // Set default city if we have one
//         if (cities.length > 0) {
//           if (cityIdParam && cityIdParam !== "Leed") {
//             const matchingCity = cities.find(
//               c => c.id.toString() === cityIdParam
//             )
//             if (matchingCity) {
//               setValue("cityId", matchingCity.id)
//             } else if (cities.length === 1) {
//               setValue("cityId", cities[0].id)
//             }
//           } else if (cities.length === 1) {
//             setValue("cityId", cities[0].id)
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching cities:", err)
//       }
//     }

//     loadCities()
//   }, [course, cityName, cityIdParam, isLeedCourse, locale, setValue])

//   // Fetch Leed trainers
//   useEffect(() => {
//     if (isLeedCourse) {
//       fetchLeedTrainers()
//     }
//   }, [isLeedCourse])

//   const fetchCourseData = async () => {
//     try {
//       setLoading(true)
//       const { data } = await axios.get<Course>(
//         `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}`
//       )
//       setCourse(data)

//       // Set default dates from course
//       setValue("startDate", data.startDate)
//       if (data.endDate) {
//         setValue("endDate", data.endDate)
//       }
//     } catch (err) {
//       console.error("Error fetching course data:", err)
//       setError(t("errors.loadingFailed"))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchLeedTrainers = async () => {
//     try {
//       const { data } = await axios.get<{ data: Trainer[] }>(
//         `${process.env.NEXT_PUBLIC_API}/api/v1/trainers?leadWeekend=true`
//       )
//       setLeetTrainer(data.data)
//     } catch (err) {
//       console.error("Error fetching Leed trainers:", err)
//     }
//   }

//   const onSubmit = async (data: RegistrationForm) => {
//     try {
//       setSubmitting(true)
//       setError(null)

//       const baseData = {
//         fullName: data.fullName,
//         email: data.email,
//         jobTitle: data.jobTitle,
//         companyName: data.companyName,
//         cityId: parseInt(data.cityId.toString()),
//         trainerId: parseInt(data.trainerId.toString()),
//       }

//       if (isLeedCourse) {
//         // Leed weekend application (without dates)
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API}/api/v1/lead-weekend/apply`,
//           baseData
//         )
//       } else {
//         // Regular course registration (with dates)
//         const courseData = {
//           ...baseData,
//           startDate: data.startDate,
//           endDate: data.endDate,
//         }
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}/register`,
//           courseData
//         )
//       }

//       router.push(`/${locale}/registration-success`)
//     } catch (err) {
//       console.error("Error registering:", err)
//       setError(t("errors.registrationFailed"))
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <CircularProgress />
//       </div>
//     )
//   }

//   if (!course && !isLeedCourse) {
//     return (
//       <div className={styles.errorContainer}>
//         <Alert severity="error">{t("errors.courseNotFound")}</Alert>
//       </div>
//     )
//   }

//   const trainersToShow = isLeedCourse ? leetTrainer : course?.trainers

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div className={styles.registrationContainer}>
//         <div className={styles.leftPanel}>
//           <div className={styles.header}>
//             <button className={styles.backButton} onClick={() => router.back()}>
//               <ArrowBack />
//             </button>
//           </div>

//           <div className={styles.formContainer}>
//             <h1 className={styles.title}>{t("title")}</h1>
//             <p className={styles.subtitle}>{t("subtitle")}</p>

//             {error && (
//               <Alert severity="error" className={styles.errorAlert}>
//                 {error}
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//               <div className={styles.formGroup}>
//                 <label className={styles.label}>
//                   {t("fields.fullName.label")}
//                 </label>
//                 <Controller
//                   name="fullName"
//                   control={control}
//                   rules={{ required: t("fields.fullName.error") }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       placeholder={t("fields.fullName.placeholder")}
//                       error={!!errors.fullName}
//                       helperText={errors.fullName?.message}
//                       className={styles.input}
//                     />
//                   )}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label className={styles.label}>
//                   {t("fields.email.label")}
//                 </label>
//                 <Controller
//                   name="email"
//                   control={control}
//                   rules={{
//                     required: t("fields.email.errors.required"),
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: t("fields.email.errors.invalid"),
//                     },
//                   }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type="email"
//                       placeholder={t("fields.email.placeholder")}
//                       error={!!errors.email}
//                       helperText={errors.email?.message}
//                       className={styles.input}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Date Range Selection - Only show for non-Leed courses */}
//               {!isLeedCourse && (
//                 <div className={styles.dateRangeGroup}>
//                   <div className={styles.formGroup}>
//                     <label className={styles.label}>
//                       {t("fields.startDate.label")}
//                     </label>
//                     <Controller
//                       name="startDate"
//                       control={control}
//                       rules={{ required: t("fields.startDate.error") }}
//                       render={({ field }) => (
//                         <DatePicker
//                           value={field.value ? new Date(field.value) : null}
//                           onChange={date => {
//                             field.onChange(
//                               date ? format(date, "yyyy-MM-dd") : ""
//                             )
//                           }}
//                           slotProps={{
//                             textField: {
//                               fullWidth: true,
//                               error: !!errors.startDate,
//                               helperText: errors.startDate?.message,
//                               className: styles.input,
//                               placeholder: t("fields.startDate.placeholder"),
//                             },
//                           }}
//                           minDate={new Date()}
//                         />
//                       )}
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label className={styles.label}>
//                       {t("fields.endDate.label")}
//                     </label>
//                     <Controller
//                       name="endDate"
//                       control={control}
//                       rules={{
//                         required: t("fields.endDate.errors.required"),
//                         validate: value => {
//                           if (
//                             startDate &&
//                             value &&
//                             new Date(value) < new Date(startDate)
//                           ) {
//                             return t("fields.endDate.errors.beforeStart")
//                           }
//                           return true
//                         },
//                       }}
//                       render={({ field }) => (
//                         <DatePicker
//                           value={field.value ? new Date(field.value) : null}
//                           onChange={date => {
//                             field.onChange(
//                               date ? format(date, "yyyy-MM-dd") : ""
//                             )
//                           }}
//                           slotProps={{
//                             textField: {
//                               fullWidth: true,
//                               error: !!errors.endDate,
//                               helperText: errors.endDate?.message,
//                               className: styles.input,
//                               placeholder: t("fields.endDate.placeholder"),
//                             },
//                           }}
//                           minDate={startDate ? new Date(startDate) : new Date()}
//                         />
//                       )}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className={styles.formGroup}>
//                 <label className={styles.label}>
//                   {t("fields.trainer.label")}
//                 </label>
//                 <Controller
//                   name="trainerId"
//                   control={control}
//                   rules={{ required: t("fields.trainer.error") }}
//                   render={({ field }) => (
//                     <RadioGroup
//                       {...field}
//                       value={field.value}
//                       sx={{
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         flexWrap: "nowrap",
//                         "@media (max-width: 768px)": {
//                           flexDirection: "column",
//                           alignItems: "flex-start",
//                           width: "100%",
//                         },
//                       }}
//                       onChange={e => field.onChange(parseInt(e.target.value))}
//                       className={styles.trainerGrid}>
//                       {trainersToShow?.map(trainer => (
//                         <FormControlLabel
//                           key={trainer.id}
//                           value={trainer.id}
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             margin: "auto",
//                             "@media (max-width: 768px)": {
//                               width: "100%",
//                             },
//                             "& .MuiFormControlLabel-label": {
//                               "@media (max-width: 768px)": {
//                                 width: "100%",
//                               },
//                             },
//                           }}
//                           control={
//                             <Radio sx={{ display: "none", width: "100%" }} />
//                           }
//                           label={
//                             <div
//                               style={{
//                                 width: "100%",
//                               }}
//                               className={`${styles.trainerCard} ${
//                                 selectedTrainerId === trainer.id
//                                   ? styles.selected
//                                   : ""
//                               }`}>
//                               <Image
//                                 src={trainer.trainerPicture}
//                                 alt={trainer.name}
//                                 className={styles.trainerImage}
//                                 width={100}
//                                 height={100}
//                               />
//                               <h4 className={styles.trainerName}>
//                                 {trainer.name}
//                               </h4>
//                               <p className={styles.trainerTitle}>
//                                 {trainer.title}
//                               </p>
//                             </div>
//                           }
//                           className={styles.trainerLabel}
//                         />
//                       ))}
//                     </RadioGroup>
//                   )}
//                 />
//                 {errors.trainerId && (
//                   <span className={styles.errorText}>
//                     {errors.trainerId.message}
//                   </span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label className={styles.label}>
//                   {t("fields.jobTitle.label")}
//                 </label>
//                 <Controller
//                   name="jobTitle"
//                   control={control}
//                   rules={{ required: t("fields.jobTitle.error") }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       placeholder={t("fields.jobTitle.placeholder")}
//                       error={!!errors.jobTitle}
//                       helperText={errors.jobTitle?.message}
//                       className={styles.input}
//                     />
//                   )}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label className={styles.label}>
//                   {t("fields.company.label")}
//                 </label>
//                 <Controller
//                   name="companyName"
//                   control={control}
//                   rules={{ required: t("fields.company.error") }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       placeholder={t("fields.company.placeholder")}
//                       error={!!errors.companyName}
//                       helperText={errors.companyName?.message}
//                       className={styles.input}
//                     />
//                   )}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label className={styles.label}>{t("fields.city.label")}</label>
//                 <Controller
//                   name="cityId"
//                   control={control}
//                   rules={{
//                     required: t("fields.city.error"),
//                     validate: value => value !== 0 || t("fields.city.error"),
//                   }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       error={!!errors.cityId}
//                       helperText={errors.cityId?.message}
//                       className={styles.input}
//                       value={field.value || 0}>
//                       <MenuItem value={0} disabled>
//                         {t("fields.city.placeholder")}
//                       </MenuItem>
//                       {availableCities.map(city => (
//                         <MenuItem value={city.id} key={city.id}>
//                           {city.name}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   )}
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   background:
//                     "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
//                   textTransform: "none",
//                   boxShadow: "none",
//                   "&:hover": {
//                     background:
//                       "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
//                     boxShadow: "none",
//                   },
//                   "&:active": {
//                     boxShadow: "none",
//                   },
//                   "&:focus": {
//                     boxShadow: "none",
//                   },
//                   "&.Mui-disabled": {
//                     background: "#ccc",
//                     color: "rgba(0, 0, 0, 0.26)",
//                   },
//                 }}
//                 disableRipple
//                 disableElevation
//                 disabled={submitting}
//                 className={styles.submitButton}>
//                 {submitting ? (
//                   <CircularProgress size={24} sx={{ color: "#fff" }} />
//                 ) : (
//                   t("submit")
//                 )}
//               </Button>
//             </form>
//           </div>
//         </div>

//         <div className={styles.rightPanel}>
//           <div className={styles.decorativeBackground} />
//         </div>
//       </div>
//     </LocalizationProvider>
//   )
// }
"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import axios from "axios"
import styles from "./RegistrationForm.module.scss"
import Image from "next/image"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker"
// import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField"
import { format } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { DateRangePicker } from "./date/DatePicker"

// Types
interface Trainer {
  id: number
  name: string
  title: string
  linkedIn: string
  trainerPicture: string
}

interface City {
  id: number
  name: string
  country?: {
    id: number
    name: string
    iso: string
  }
}

interface Course {
  id: number
  title: string
  description: string
  startDate: string
  endDate?: string
  price: number
  trainers: Trainer[]
  city: City | null
}

interface RegistrationForm {
  fullName: string
  email: string
  jobTitle: string
  phoneNumber: number
  dateRange: [Date | null, Date | null]
  companyName: string
  cityId: number
  trainerId: number
}

interface apiCity {
  data: City[]
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  lang: string
}

export default function CourseRegistrationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseID")
  const cityIdParam = searchParams.get("cityId")
  const cityName = searchParams.get("cityName")
  const locale = useLocale()
  const t = useTranslations("registration")

  const [course, setCourse] = useState<Course | null>(null)
  const [availableCities, setAvailableCities] = useState<City[]>([])
  const [leetTrainer, setLeetTrainer] = useState<Trainer[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationForm>({
    defaultValues: {
      fullName: "",
      email: "",
      jobTitle: "",
      phoneNumber: 0,
      dateRange: [null, null],
      companyName: "",
      cityId: 0,
      trainerId: 0,
    },
  })

  const selectedTrainerId = watch("trainerId")
  const isLeedCourse = courseId === "Leed"

  // Fetch course data
  useEffect(() => {
    if (courseId && !isLeedCourse) {
      fetchCourseData()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, isLeedCourse])

  // Fetch cities
  useEffect(() => {
    const loadCities = async () => {
      try {
        let cities: City[] = []

        if (isLeedCourse || cityName) {
          // Fetch cities from API
          const { data } = await axios.get<apiCity>(
            `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities?${
              cityName ? `search=${cityName}` : ""
            }`,
            {
              headers: {
                "Accept-Language": locale,
              },
            }
          )
          cities = data.data || []
        } else {
          // Use course city

          const { data } = await axios.get<apiCity>(
            `${process.env.NEXT_PUBLIC_API}/api/v1/globe/cities`,
            {
              headers: {
                "Accept-Language": locale,
              },
            }
          )
          cities = data.data
        }

        setAvailableCities(cities)

        // Set default city if we have one
        if (cities.length > 0) {
          if (cityIdParam && cityIdParam !== "Leed") {
            const matchingCity = cities.find(
              c => c.id.toString() === cityIdParam
            )
            if (matchingCity) {
              setValue("cityId", matchingCity.id)
            } else if (cities.length === 1) {
              setValue("cityId", cities[0].id)
            }
          } else if (cities.length === 1) {
            setValue("cityId", cities[0].id)
          }
        }
      } catch (err) {
        console.error("Error fetching cities:", err)
      }
    }

    loadCities()
  }, [course, cityName, cityIdParam, isLeedCourse, locale, setValue])

  // Fetch Leed trainers
  useEffect(() => {
    if (isLeedCourse) {
      fetchLeedTrainers()
    }
  }, [isLeedCourse])

  const fetchCourseData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get<Course>(
        `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}`
      )
      setCourse(data)

      // Set default date range from course
      const startDate = data.startDate ? new Date(data.startDate) : null
      const endDate = data.endDate ? new Date(data.endDate) : null
      setValue("dateRange", [startDate, endDate])
    } catch (err) {
      console.error("Error fetching course data:", err)
      setError(t("errors.loadingFailed"))
    } finally {
      setLoading(false)
    }
  }

  const fetchLeedTrainers = async () => {
    try {
      const { data } = await axios.get<{ data: Trainer[] }>(
        `${process.env.NEXT_PUBLIC_API}/api/v1/trainers?leadWeekend=true`
      )
      setLeetTrainer(data.data)
    } catch (err) {
      console.error("Error fetching Leed trainers:", err)
    }
  }

  const onSubmit = async (data: RegistrationForm) => {
    try {
      setSubmitting(true)
      setError(null)

      const baseData = {
        fullName: data.fullName,
        email: data.email,
        jobTitle: data.jobTitle,
        phoneNumber: data.phoneNumber,
        companyName: data.companyName,
        cityId: parseInt(data.cityId.toString()),
        trainerId: parseInt(data.trainerId.toString()),
      }

      if (isLeedCourse) {
        // Leed weekend application (without dates)
        await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v1/lead-weekend/apply`,
          baseData
        )
      } else {
        // Regular course registration (with dates)
        const [startDate, endDate] = data.dateRange
        const courseData = {
          ...baseData,
          startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
          endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v1/courses/${courseId}/register`,
          courseData
        )
      }

      router.push(`/${locale}/registration-success`)
    } catch (err) {
      console.error("Error registering:", err)
      setError(t("errors.registrationFailed"))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }

  if (!course && !isLeedCourse) {
    return (
      <div className={styles.errorContainer}>
        <Alert severity="error">{t("errors.courseNotFound")}</Alert>
      </div>
    )
  }

  const trainersToShow = isLeedCourse ? leetTrainer : course?.trainers

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.registrationContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => router.back()}>
              <ArrowBack />
            </button>
          </div>

          <div className={styles.formContainer}>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.subtitle}>{t("subtitle")}</p>

            {error && (
              <Alert severity="error" className={styles.errorAlert}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.fullName.label")}
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: t("fields.fullName.error") }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("fields.fullName.placeholder")}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      className={styles.input}
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.email.label")}
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: t("fields.email.errors.required"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("fields.email.errors.invalid"),
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      placeholder={t("fields.email.placeholder")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      className={styles.input}
                    />
                  )}
                />
              </div>

              {/* Date Range Selection - Only show for non-Leed courses */}
              {!isLeedCourse && (
                <div className={styles.formGroup}>
                  <Controller
                    name="dateRange"
                    control={control}
                    rules={{
                      required: t("fields.dateRange.error"),
                      validate: value => {
                        const [start, end] = value
                        if (!start || !end) return t("fields.dateRange.error")
                        return true
                      },
                    }}
                    render={({ field }) => (
                      <DateRangePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t("fields.dateRange.placeholder")}
                        error={!!errors.dateRange}
                        helperText={errors.dateRange?.message}
                        minDate={new Date()}
                        label={t("fields.dateRange.label")}
                        className={styles.dateRangeField}
                      />
                    )}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.trainer.label")}
                </label>
                <Controller
                  name="trainerId"
                  control={control}
                  rules={{ required: t("fields.trainer.error") }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      value={field.value}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                        "@media (max-width: 768px)": {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        },
                      }}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                      className={styles.trainerGrid}>
                      {trainersToShow?.map(trainer => (
                        <FormControlLabel
                          key={trainer.id}
                          value={trainer.id}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "auto",
                            "@media (max-width: 768px)": {
                              width: "100%",
                            },
                            "& .MuiFormControlLabel-label": {
                              "@media (max-width: 768px)": {
                                width: "100%",
                              },
                            },
                          }}
                          control={
                            <Radio sx={{ display: "none", width: "100%" }} />
                          }
                          label={
                            <div
                              style={{
                                width: "100%",
                              }}
                              className={`${styles.trainerCard} ${
                                selectedTrainerId === trainer.id
                                  ? styles.selected
                                  : ""
                              }`}>
                              <Image
                                src={trainer.trainerPicture}
                                alt={trainer.name}
                                className={styles.trainerImage}
                                width={100}
                                height={100}
                              />
                              <h4 className={styles.trainerName}>
                                {trainer.name}
                              </h4>
                              <p className={styles.trainerTitle}>
                                {trainer.title}
                              </p>
                            </div>
                          }
                          className={styles.trainerLabel}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.trainerId && (
                  <span className={styles.errorText}>
                    {errors.trainerId.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.jobTitle.label")}
                </label>
                <Controller
                  name="jobTitle"
                  control={control}
                  rules={{ required: t("fields.jobTitle.error") }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("fields.jobTitle.placeholder")}
                      error={!!errors.jobTitle}
                      helperText={errors.jobTitle?.message}
                      className={styles.input}
                    />
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.phoneNumber.label")}
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: t("fields.phoneNumber.error") }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="tel"
                      placeholder={t("fields.phoneNumber.placeholder")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      className={styles.input}
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.company.label")}
                </label>
                <Controller
                  name="companyName"
                  control={control}
                  rules={{ required: t("fields.company.error") }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("fields.company.placeholder")}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                      className={styles.input}
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t("fields.city.label")}</label>
                <Controller
                  name="cityId"
                  control={control}
                  rules={{
                    required: t("fields.city.error"),
                    validate: value => value !== 0 || t("fields.city.error"),
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.cityId}
                      helperText={errors.cityId?.message}
                      className={styles.input}
                      value={field.value || 0}>
                      <MenuItem value={0} disabled>
                        {t("fields.city.placeholder")}
                      </MenuItem>
                      {availableCities.map(city => (
                        <MenuItem value={city.id} key={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background:
                    "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(85deg,#141414 1.59%,rgba(20, 20, 20, 0) 121.45%)",
                    boxShadow: "none",
                  },
                  "&:active": {
                    boxShadow: "none",
                  },
                  "&:focus": {
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    background: "#ccc",
                    color: "rgba(0, 0, 0, 0.26)",
                  },
                }}
                disableRipple
                disableElevation
                disabled={submitting}
                className={styles.submitButton}>
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.decorativeBackground} />
        </div>
      </div>
    </LocalizationProvider>
  )
}
