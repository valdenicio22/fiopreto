import React from 'react'

import { TextField } from '@material-ui/core'

import { useFormik } from 'formik'
import * as yup from 'yup'

import styles from './styles.module.scss'

import { RightButton } from '../Buttons'
import { UserData } from '../../contexts/UserLoggedContext'

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Nome deve conter no mínimo 3 letras')
    .required('Nome é um campo obrigatório'),
  email: yup
    .string()
    .email('Email Inválido')
    .required('Email é um campo obrigatório'),
  dob: yup
    .string()
    .required('Data de Nascimento é um campo obrigatório (MM/DD/YYYY)'),
})

type OwnerProps = {
  initialValues: {
    name: string
    email: string
    dob: string
  }
  updateUser: (newUserData: UserData) => void
  userUpdateLoading: boolean
}

export const Owner = ({
  initialValues,
  updateUser,
  userUpdateLoading,
}: OwnerProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUser(values)
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
          name="dob"
          className={styles.textField}
          label="Data de Nascimento*"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
        {/* <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            className={styles.textField}
            name="password"
            label="Senha*"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            // helperText={formik.touched.password && formik.errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl> */}
        {/* <TextField
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
        /> */}
        {/* <span>*Mínimo de 8 caracteres</span> */}
      </div>

      <footer className={styles.buttons}>
        {/* <LeftButton onClick={() => Router.push('/perfil')}>Voltar</LeftButton> */}
        <RightButton loading={userUpdateLoading}>
          Confirmar Alterações
        </RightButton>
      </footer>
    </form>
  )
}
