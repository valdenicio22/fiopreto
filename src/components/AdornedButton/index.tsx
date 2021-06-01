import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const SpinnerAdornment = () => <CircularProgress size={20} color="secondary" />

export const AdornedButton = (props) => {
  const { children, loading, ...rest } = props
  return (
    <Button {...rest}>
      {loading ? <SpinnerAdornment {...rest} /> : children}
    </Button>
  )
}
