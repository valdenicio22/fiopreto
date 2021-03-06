import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import theme from '../theme'

import Head from 'next/head'

import '../styles/global.scss'
// import { AuthProvider } from '../contexts/AuthContext';
import SignUpProvider from '../contexts/SignUpContext'
import { AuthProvider } from '../contexts/AuthContext'
import UserLoggedContextProvider from '../contexts/UserLoggedContext'

export default function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>FioPreto</title>
        {/* <link rel="shortcut icon" href="/pwaImg.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/pwaImg.png" /> */}
      </Head>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AuthProvider>
          <UserLoggedContextProvider>
            <SignUpProvider>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </SignUpProvider>
          </UserLoggedContextProvider>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
