import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'
// import MyDrawer from '../components/MyDrawer'
import { FullLogoIcon } from '../components/Icons'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/perfil.module.scss'
import { api } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'
import { GetServerSideProps } from 'next'

export default function Perfil() {
  const { user } = React.useContext(AuthContext)

  React.useEffect(() => {
    if (!user) {
      return
    }

    api
      .get(`/user/${user.id}`)
      .then((response) => {
        console.log({ response })
      })
      .catch((err) => console.log(err))
  }, [user])

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilHeader}>
        <FullLogoIcon />
      </div>
      <div className={styles.perfilDrawer}>
        <h2>{user?.name}</h2>
        {/* <MyDrawer /> */}
      </div>
      <div className={styles.perfilInformations}>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Dados pessoais
        </Button>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Dados da empresa
        </Button>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Foto e horários
        </Button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    }
  }
)
