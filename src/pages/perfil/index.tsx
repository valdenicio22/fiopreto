import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'
// import MyDrawer from '../components/MyDrawer'
import { FullLogoIcon } from '../../components/Icons'

import styles from '../../styles/perfil.module.scss'
import { api } from '../../services/api'
import Link from 'next/link'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { GetServerSideProps } from 'next'
import { UserLoggedContext } from '../../contexts/UserLoggedContext'

export default function Perfil() {
  const { userData } = React.useContext(UserLoggedContext)

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilHeader}>
        <FullLogoIcon />
      </div>
      <div className={styles.perfilDrawer}>
        <h2>{userData?.name}</h2>
        {/* <MyDrawer /> */}
      </div>
      <div className={styles.perfilInformations}>
        <Link href="perfil/owner_update">
          <Button
            className={styles.perfilBtn}
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Dados pessoais
          </Button>
        </Link>
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
