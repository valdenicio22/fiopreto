import React from 'react'
import styles from './styles.module.scss'

type Schedule = {
  date: string
  id: number
  time: string
  user: { name: string }
}
type DailyScheduleProps = {
  opening: string
  closing: string
  schedules?: Schedule[]
  date: Date
}

type CompleteDailySchedule = {
  time: string
  isOpen: boolean
  userName?: string
}

function formattedTimeToMinutes(formattedTime: string) {
  const [hour, minutes] = formattedTime.split(':').map((time) => Number(time))
  return hour * 60 + minutes
}

function minutesToFormattedTime(minutes: number) {
  const hour = Math.floor(minutes / 60)
  const leftMinutes = minutes % 60
  return `${hour.toString().padStart(2, '0')}:${leftMinutes
    .toString()
    .padStart(2, '0')}`
}

function generateCompleteDailySchedule(
  opening: string,
  closing: string,
  schedules?: Schedule[]
) {
  if (!schedules) return []
  const completedDailySchedule: CompleteDailySchedule[] = []
  const openingInMinutes = formattedTimeToMinutes(opening)
  const closingInMinutes = formattedTimeToMinutes(closing)

  for (
    let timeInMinutes = openingInMinutes;
    timeInMinutes <= closingInMinutes;
    timeInMinutes += 60
  ) {
    const formattedTime = minutesToFormattedTime(timeInMinutes)

    const targetSchedule = schedules.find((schedule) => {
      const scheduledTime = schedule.time.slice(0, 5)
      return scheduledTime === formattedTime
    })

    if (targetSchedule) {
      completedDailySchedule.push({
        isOpen: false,
        userName: targetSchedule.user.name,
        time: formattedTime,
      })
    } else {
      completedDailySchedule.push({
        isOpen: true,
        time: formattedTime,
      })
    }
  }

  return completedDailySchedule
}

export function DailySchedule({
  opening,
  closing,
  schedules,
  date,
}: DailyScheduleProps) {
  const completedDailySchedule = generateCompleteDailySchedule(
    opening,
    closing,
    schedules
  )
  const days = [
    'Segunda',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ]
  const data = date.getDay()
  console.log(data)

  return (
    <div className={styles.containerDaily}>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>
              {days.map((day, idx) => (idx === data - 1 ? days[idx] : ''))}
            </th>
          </tr>
          <tr>
            <th>Horarios</th>
            <th>Clientes</th>
          </tr>
        </thead>
        <tbody>
          {completedDailySchedule.map((schedule) => (
            <tr key={schedule.time}>
              <td>{schedule.time}</td>
              <td>{schedule.isOpen ? 'Aberto' : schedule.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
