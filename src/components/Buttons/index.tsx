import styles from './styles.module.scss'

import { Button } from '@material-ui/core'
import React from 'react'
import { AdornedButton } from '../AdornedButton'

export const LeftButton = (props) => {
  return (
    <Button
      className={styles.btn}
      size="large"
      variant="outlined"
      color="primary"
      {...props}
    >
      {props.children}
    </Button>
  )
}

export const RightButton = (props) => {
  return (
    <AdornedButton
      className={styles.btn}
      size="large"
      variant="contained"
      color="primary"
      type="submit"
      {...props}
    >
      {props.children}
    </AdornedButton>
  )
}
