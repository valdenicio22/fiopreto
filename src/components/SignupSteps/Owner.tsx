import React from 'react'

import { TextField } from '@material-ui/core'

import { useFormik } from 'formik'
import * as yup from 'yup'

import styles from './styles.module.scss'
import { SignUpContext } from '../../contexts/SignUpContext'
import { api } from '../../services/api'

import Router from 'next/router'
import { LeftButton, RightButton } from '../Buttons'

// const mockedApi = {
//   post: (route: string, data: any) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve({
//           data: {
//             id: 15,
//           },
//         })
//       }, 1000)
//     })
//   },
// }

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Nome deve conter no mínimo 3 letras')
    .required('Nome é um campo obrigatório'),
  email: yup
    .string()
    .email('Email Inválido')
    .required('Email é um campo obrigatório'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/,
      '*Senhas devem conter 8 caracteres e no mínimo 1 letra maíuscula, número e caracter especial (Ex: *, &, $,)'
    )
    .required('Senha é um campo obrigatório'),
  dob: yup
    .string()
    .required('Data de Nascimento é um campo obrigatório (MM/DD/YYYY)'),
})

type UserData = {
  name: string
  email: string
  password: string
  dob: string
}

export const Owner = () => {
  const [loading, setLoading] = React.useState(false)

  const { handleNext, setSalonData } = React.useContext(SignUpContext)

  function saveUserData(userData: UserData) {
    setLoading(true)
    api
      .post('auth/register', {
        ...userData,
        isHairdresser: true,
      })
      .then((response) => {
        setLoading(false)
        setSalonData((prevSalonData) => ({
          ...prevSalonData,
          user_id: response.data.id,
        }))
        handleNext()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      dob: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveUserData(values)
      //handleNext();
    },
  })

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="name"
          className={styles.textField}
          name="name"
          label="Nome*"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="email"
          className={styles.textField}
          name="email"
          label="E-mail*"
          type="email"
          variant="outlined"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="dob" // day of birthday
          className={styles.textField}
          label="Data de Nascimento*"
          variant="outlined"
          type="date"
          // defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
        <TextField
          id="password"
          className={styles.textField}
          name="password"
          label="Senha*"
          type="password"
          variant="outlined"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <span>*Mínimo de 8 caracteres</span>
      </div>

      <footer className={styles.buttons}>
        <LeftButton onClick={() => Router.push('/login')}>Sign In</LeftButton>

        <RightButton loading={loading}>Salvar</RightButton>
      </footer>
    </form>
  )
}
