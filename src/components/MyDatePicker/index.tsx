// import React, { useEffect, useState } from 'react'
// import { DatePicker } from '@material-ui/pickers'
// import { api } from '../services/api'
// import styles from '../styles/schedule.module.scss'
// import { FullLogoIcon } from '../components/Icons'
// import MyDrawer from '../components/MyDrawer'

// type Schedule = {
//   date: string
//   id: number
//   time: string
//   user: { name: string }
// }

// type DailyScheduleProps = {
//   opening: string
//   closing: string
//   schedules?: Schedule[]
// }

// type CompleteDailySchedule = {
//   time: string
//   isOpen: boolean
//   userName?: string
// }

// function formattedTimeToMinutes(formattedTime: string) {
//   const [hour, minutes] = formattedTime.split(':').map((time) => Number(time))
//   return hour * 60 + minutes
// }

// function minutesToFormattedTime(minutes: number) {
//   const hour = Math.floor(minutes / 60)
//   const leftMinutes = minutes % 60
//   return `${hour.toString().padStart(2, '0')}:${leftMinutes
//     .toString()
//     .padStart(2, '0')}`
// }

// function generateCompleteDailySchedule(
//   opening: string,
//   closing: string,
//   schedules?: Schedule[]
// ) {
//   if (!schedules) return []
//   const completedDailySchedule: CompleteDailySchedule[] = []
//   const openingInMinutes = formattedTimeToMinutes(opening)
//   const closingInMinutes = formattedTimeToMinutes(closing)

//   for (
//     let timeInMinutes = openingInMinutes;
//     timeInMinutes <= closingInMinutes;
//     timeInMinutes += 60
//   ) {
//     const formattedTime = minutesToFormattedTime(timeInMinutes)

//     const targetSchedule = schedules.find((schedule) => {
//       const scheduledTime = schedule.time.slice(0, 5)
//       return scheduledTime === formattedTime
//     })

//     if (targetSchedule) {
//       completedDailySchedule.push({
//         isOpen: false,
//         userName: targetSchedule.user.name,
//         time: formattedTime,
//       })
//     } else {
//       completedDailySchedule.push({
//         isOpen: true,
//         time: formattedTime,
//       })
//     }
//   }

//   return completedDailySchedule
// }

// function DailySchedule({ opening, closing, schedules }: DailyScheduleProps) {
//   const completedDailySchedule = generateCompleteDailySchedule(
//     opening,
//     closing,
//     schedules
//   )

//   const todayDate = new Date()
//   const today = todayDate.toLocaleDateString('pt-BR')
//   return (
//     <div className={styles.containerSchedule}>
//       <FullLogoIcon />
//       <div className={styles.agendaSchedule}>
//         <h2>Minha Agenda</h2>
//         <MyDrawer />
//       </div>
//       <h3>{today}</h3>
//       <ul>
//         {completedDailySchedule.map((schedule) => (
//           <li key={schedule.time}>
//             <span style={{ marginRight: '1rem' }}>{schedule.time}</span>
//             <span>{schedule.isOpen ? 'Aberto' : schedule.userName}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
