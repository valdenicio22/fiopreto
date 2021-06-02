import React, { useContext } from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { Owner } from '../components/SignupSteps/Owner'
import { InfoBusiness } from '../components/SignupSteps/InfoBusiness'
import { AddressBusiness } from '../components/SignupSteps/AddressBusiness'
import { DetailsBusiness } from '../components/SignupSteps/DetailsBusiness'
import { SignUpContext } from '../contexts/SignUpContext'

import styles from '../styles/signup.module.scss'
import { FullLogoIcon } from '../components/Icons'
import { GetServerSideProps } from 'next'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function SignUp() {
  const { progress } = useContext(SignUpContext)

  const stepsName = [
    'Cadastre um usuário',
    'Informações do salão',
    'Endereço do salão',
    'Detalhes do salão',
  ]

  const stepsForms = [
    <Owner />,
    <InfoBusiness />,
    <AddressBusiness />,
    <DetailsBusiness />,
  ]

  return (
    <div className={styles.container}>
      <FullLogoIcon />

      <div className={styles.steps}>
        <Stepper alternativeLabel activeStep={progress}>
          {stepsName.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {stepsForms[progress]}
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
