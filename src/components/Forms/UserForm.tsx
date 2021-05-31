import React from 'react'

import { TextField } from '@material-ui/core'

import { useFormik } from 'formik'
import * as yup from 'yup'

import styles from '../SignupSteps/styles.module.scss'

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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      '*Senhas devem conter 8 caracteres e no mínimo 1 letra maíuscula, número e caracter especial (Ex: *, &, $,)'
    )
    .required('Senha é um campo obrigatório'),
  dob: yup.string().required('Aniversario é um campo obrigatório'),
})

type UserData = {
  name: string
  email: string
  password: string
  dob: string
}

type UserFormProps = {
  onSubmit: (values: UserData) => void
  initialValues: UserData
  children: React.ReactNode
}

export const UserForm = (props: UserFormProps) => {
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: props.onSubmit,
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
        <TextField
          id="dob"
          className={styles.textField}
          label="Data de Nascimento"
          type="date"
          // defaultValue="2017-05-24"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
        <span>*Mínimo de 8 caracteres</span>
      </div>

      <footer className={styles.buttons}>{props.children}</footer>
    </form>
  )
}
