import React from 'react'
import Link from 'next/link'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField, Button } from '@material-ui/core'
import styles from '../styles/login.module.scss'
import { LogoIcon } from '../components/Icons'
import { AuthContext } from '../contexts/AuthContext'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Entre com um e-mail válido ')
    .required('Email é um campo obrigatório'),
  password: yup.string().required('Senha é um campo obrigatório'),
})

export default function Login() {
  const { signIn, error } = React.useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn(values)
    },
  })

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styles.flex}`}>
        <h1>Faça Login para começar</h1>
        <LogoIcon />
      </div>

      <form
        className={`${styles.main} ${styles.flex}`}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          name="email"
          label="E-mail*"
          variant="outlined"
          className={`${styles.inputField} ${styles.inputEmail}`}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={`${styles.inputField}`}
          id="password"
          name="password"
          label="Senha*"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <span>Senha ou email invalidos</span>}
        <Button
          className={styles.btnSubmit}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          Faça login
        </Button>
      </form>
      <footer className={`${styles.footer} ${styles.flex}`}>
        <Link href="/signup">
          <p>
            É novo aqui? <a>Cadastre-se</a> para começar!
          </p>
        </Link>

        <Link href="#">
          <a>Esqueceu sua senha?</a>
        </Link>
      </footer>
    </div>
  )
}
