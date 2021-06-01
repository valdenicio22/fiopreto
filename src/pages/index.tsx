import { Button } from '@material-ui/core'
import Link from 'next/link'

import styles from '../styles/home.module.scss'

import {
  FullLogoIcon,
  CharacterLovingIcon,
  OrganizeIcon,
  FeedIcon,
  CharacterReadingIcon,
  IllustrationsLaying,
} from '../components/Icons'
import { AuthContext } from '../contexts/AuthContext'
import React from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {
  const { user } = React.useContext(AuthContext)

  return (
    <div className={styles.container}>
      <div className={`${styles.characterLoving} ${styles.flex}`}>
        <header>
          <FullLogoIcon />
        </header>
        <main>
          <CharacterLovingIcon />

          <h1>
            Cabelo bom é cabelo <br />
            bem cuidado
          </h1>

          <Link href="/login">
            <Button
              className={styles.btn}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Fazer login
            </Button>
          </Link>

          <p>
            Quero{' '}
            <Link href="/signup">
              <a>cadastrar</a>
            </Link>{' '}
            meu estabelecimento
          </p>
        </main>

        <footer>
          <h2>Como funciona?</h2>
          <p>Arreste para baixo para saber mais!</p>
        </footer>
      </div>
      <div className={`${styles.organize} ${styles.flex}`}>
        <h2>Na web</h2>

        <div className={styles.svgIcons}>
          <OrganizeIcon />
        </div>
        <span>Agenda</span>

        <p>
          Organize e receba novos <br />
          agendamentos
        </p>
      </div>
      <div className={`${styles.feed} ${styles.flex}`}>
        <h2>No Aplicativo</h2>

        <div className={styles.svgIcons}>
          <FeedIcon />
        </div>

        <span>Feed</span>

        <p>
          Inspire pessoas que buscam alcançar <br />a{' '}
          <span>autonomia estética</span>.
        </p>
      </div>
      <div className={`${styles.characterReading} ${styles.flex}`}>
        <div className={styles.svgIcons}>
          <CharacterReadingIcon />
        </div>
        <span>Dicas</span>

        <p>
          Compartilhe e receba dicas para <br />
          <span>cuidados</span> com seu cabelo.
        </p>
      </div>
      <div className={`${styles.illustrationsLaying} ${styles.flex}`}>
        <div className={styles.svgIcons}>
          <IllustrationsLaying />
        </div>

        <span>Agendamento</span>

        <p>
          Faça agendamentos em salões <br />
          focados em cabelos crespos e <br />
          cacheados.
        </p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    }
  }
)
