import React, { useContext } from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { Owner } from '../components/SignUpSteps/Owner'
import { InfoBusiness } from '../components/SignUpSteps/InfoBusiness'
import { AddressBusiness } from '../components/SignUpSteps/AddressBusiness'
import { DetailsBusiness } from '../components/SignUpSteps/DetailsBusiness'
import { SignUpContext } from '../contexts/SignUpContext'

import styles from '../styles/SignUp.module.scss'
import { FullLogoIcon } from '../components/Icons'
import { GetServerSideProps } from 'next'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function SignUp() {
  const { progress } = useContext(SignUpContext)

  const stepsName = [
    'Owner information',
    'Business Information',
    'Business Address',
    'Business Details',
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
