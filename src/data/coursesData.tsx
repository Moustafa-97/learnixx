// import { CoursesApiResponse } from "../types/courses"

// export const courses: CoursesApiResponse = {
//   data: [
//     {
//       id: 1,
//       title: "React.js Bootcamp",
//       description:
//         "A hands-on course to build web apps using modern technologies.",
//       startDate: "2025-10-20",
//       price: 374,
//       categories: [
//         {
//           id: 1,
//           name: "Web Development",
//         },
//       ],
//       country: {
//         id: 2,
//         name: "Germany",
//         iso: "DE",
//       },
//       city: {
//         id: 4,
//         name: "Munich",
//       },
//     },
//     {
//       id: 2,
//       title: "Mastering HTML & CSS",
//       description:
//         "A hands-on course to build web apps using modern technologies.",
//       startDate: "2025-08-25",
//       price: 310,
//       categories: [
//         {
//           id: 1,
//           name: "Web Development",
//         },
//       ],
//       country: {
//         id: 3,
//         name: "Japan",
//         iso: "JP",
//       },
//       city: {
//         id: 5,
//         name: "Tokyo",
//       },
//     },
//     {
//       id: 3,
//       title: "Fullstack with NestJS",
//       description:
//         "A hands-on course to build web apps using modern technologies.",
//       startDate: "2025-10-03",
//       price: 359,
//       categories: [
//         {
//           id: 1,
//           name: "Web Development",
//         },
//       ],
//       country: {
//         id: 1,
//         name: "Egypt",
//         iso: "EG",
//       },
//       city: {
//         id: 2,
//         name: "Alexandria",
//       },
//     },
//     {
//       id: 4,
//       title: "Intro to Python & Pandas",
//       description:
//         "Dive into data analysis, modeling, and visualization techniques.",
//       startDate: "2025-09-02",
//       price: 628,
//       categories: [
//         {
//           id: 2,
//           name: "Data Science",
//         },
//       ],
//       country: {
//         id: 1,
//         name: "Egypt",
//         iso: "EG",
//       },
//       city: {
//         id: 1,
//         name: "Cairo",
//       },
//     },
//     {
//       id: 5,
//       title: "Machine Learning Basics",
//       description:
//         "Dive into data analysis, modeling, and visualization techniques.",
//       startDate: "2025-11-07",
//       price: 772,
//       categories: [
//         {
//           id: 2,
//           name: "Data Science",
//         },
//       ],
//       country: {
//         id: 1,
//         name: "Egypt",
//         iso: "EG",
//       },
//       city: {
//         id: 2,
//         name: "Alexandria",
//       },
//     },
//     {
//       id: 6,
//       title: "Deep Learning with TensorFlow",
//       description:
//         "Dive into data analysis, modeling, and visualization techniques.",
//       startDate: "2025-10-07",
//       price: 438,
//       categories: [
//         {
//           id: 2,
//           name: "Data Science",
//         },
//       ],
//       country: {
//         id: 3,
//         name: "Japan",
//         iso: "JP",
//       },
//       city: {
//         id: 6,
//         name: "Osaka",
//       },
//     },
//     {
//       id: 7,
//       title: "SEO Fundamentals",
//       description: "Learn digital channels, analytics, and growth strategies.",
//       startDate: "2025-09-11",
//       price: 296,
//       categories: [
//         {
//           id: 3,
//           name: "Digital Marketing",
//         },
//       ],
//       country: {
//         id: 2,
//         name: "Germany",
//         iso: "DE",
//       },
//       city: {
//         id: 3,
//         name: "Berlin",
//       },
//     },
//     {
//       id: 8,
//       title: "Google Ads Mastery",
//       description: "Learn digital channels, analytics, and growth strategies.",
//       startDate: "2025-10-03",
//       price: 405,
//       categories: [
//         {
//           id: 3,
//           name: "Digital Marketing",
//         },
//       ],
//       country: {
//         id: 2,
//         name: "Germany",
//         iso: "DE",
//       },
//       city: {
//         id: 4,
//         name: "Munich",
//       },
//     },
//     {
//       id: 9,
//       title: "Social Media Marketing",
//       description: "Learn digital channels, analytics, and growth strategies.",
//       startDate: "2025-09-01",
//       price: 381,
//       categories: [
//         {
//           id: 3,
//           name: "Digital Marketing",
//         },
//       ],
//       country: {
//         id: 1,
//         name: "Egypt",
//         iso: "EG",
//       },
//       city: {
//         id: 1,
//         name: "Cairo",
//       },
//     },
//     {
//       id: 10,
//       title: "Photoshop for Beginners",
//       description: "Develop design thinking and technical skills with tools.",
//       startDate: "2025-09-17",
//       price: 347,
//       categories: [
//         {
//           id: 4,
//           name: "Graphic Design",
//         },
//       ],
//       country: {
//         id: 1,
//         name: "Egypt",
//         iso: "EG",
//       },
//       city: {
//         id: 2,
//         name: "Alexandria",
//       },
//     },
//   ],
//   meta: {
//     page: 1,
//     perPage: 10,
//     total: 1,
//     totalPages: 1,
//     hasNext: false,
//     hasPrev: false,
//   },
//   lang: "en",
// }

// // Utility functions with TypeScript
// export const getCourseById = (id: string): CoursesApiResponse | undefined => {
//   return courses.data.find(course => course.id === id)
// }

// export const getCoursesByCategory = (category: string): Course[] => {
//   return courses.filter(course => course.category === category)
// }

// export const searchCoursesByKeyword = (keyword: string): Course[] => {
//   const lowercaseKeyword = keyword.toLowerCase()
//   return courses.filter(
//     course =>
//       course.title.toLowerCase().includes(lowercaseKeyword) ||
//       course.description.toLowerCase().includes(lowercaseKeyword) ||
//       course.tags.some((tag: string) =>
//         tag.toLowerCase().includes(lowercaseKeyword)
//       )
//   )
// }
