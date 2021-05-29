import React from 'react';
import { Buttons } from './Buttons';

import { TextField } from '@material-ui/core';

import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from './styles.module.scss';
import { SignUpContext } from '../../contexts/SignUpContext';

const validationSchema = yup.object({
  userName: yup
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
  date: yup.string().required('Aniversario é um campo obrigatório'),
});

export const Owner = () => {
  const { signUpData, setSignUpData, handleNext } =
    React.useContext(SignUpContext);

  const formik = useFormik({
    initialValues: {
      userName: signUpData.userName,
      email: signUpData.email,
      password: signUpData.password,
      date: signUpData.date,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setSignUpData({ ...signUpData, ...values });
      handleNext();
    },
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="userName"
          className={styles.textField}
          name="userName"
          label="Nome*"
          variant="outlined"
          fullWidth
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
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
          id="date"
          className={styles.textField}
          label="Data de Nascimento"
          type="date"
          // defaultValue="2017-05-24"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          value={formik.values.date}
          onChange={formik.handleChange}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />
        <span>*Mínimo de 8 caracteres</span>
      </div>

      <footer className={styles.buttons}>
        <Buttons />
      </footer>
    </form>
  );
};
