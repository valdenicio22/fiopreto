import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { api } from '../services/api'

type Schedule = {
  date: string
  id: number
  time: string
  user: { name: string }
}

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[] | undefined>()

  useEffect(() => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = Number(date.getMonth().toString().padStart(2, '0')) + 1
    const year = date.getFullYear()
    const query = `${day}_${month}_${year}`

    api
      .get(`scheduling/${query}`)
      .then(({ data }) => {
        console.log({ data })
        setSchedules(data.rows)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [date])

  return (
    <>
      <DatePicker
        disableToolbar
        variant="static"
        value={date}
        onChange={changeDate}
      />

      <DailySchedule schedules={schedules} opening="10:00" closing="17:50" />
    </>
  )
}

type DailyScheduleProps = {
  opening: string
  closing: string
  schedules?: Schedule[]
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

function DailySchedule({ opening, closing, schedules }: DailyScheduleProps) {
  const completedDailySchedule = generateCompleteDailySchedule(
    opening,
    closing,
    schedules
  )

  return (
    <div>
      <h2>Hoje</h2>
      <ul>
        {completedDailySchedule.map((schedule) => (
          <li key={schedule.time}>
            <span style={{ marginRight: '1rem' }}>{schedule.time}</span>
            <span>{schedule.isOpen ? 'Aberto' : schedule.userName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StaticDatePicker
