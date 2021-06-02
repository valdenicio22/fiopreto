import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { api } from '../services/api'
import styles from '../styles/schedule.module.scss'
import { FullLogoIcon } from '../components/Icons'
import { DailySchedule } from '../components/DailySchedule'
import { MyDrawer } from '../components/MyDrawer'
// import MyDrawer from '../components/MyDrawer'

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
        setSchedules(data.rows)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [date])

  return (
    <div className={styles.containerSchedule}>
      <div className={styles.contentSchedule}>
        <FullLogoIcon />
        <div className={styles.agendaDrawer}>
          <h2>Minha Agenda</h2>
          <MyDrawer />
        </div>
        <DatePicker
          disableToolbar
          variant="static"
          value={date}
          onChange={changeDate}
        />
        <DailySchedule
          schedules={schedules}
          opening="10:00"
          closing="17:50"
          date={date}
        />
      </div>
    </div>
  )
}

export default StaticDatePicker
