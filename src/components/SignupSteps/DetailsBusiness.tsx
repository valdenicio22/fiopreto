import React from 'react';
import { TextField } from '@material-ui/core';

import { SignUpContext } from '../../contexts/SignUpContext';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Dropzone from '../Dropzone';

import styles from './styles.module.scss';
import { Buttons } from './Buttons';

const validationSchema = yup.object({
  abertura: yup.string().required('Hora de Abertura é um campo obrigatório'),
  fechamento: yup
    .string()
    .required('Hora de Fechamento é um campo obrigatório'),
});

export const DetailsBusiness = () => {
  const { signUpData, setSignUpData, handleNext, setSelectedFile } =
    React.useContext(SignUpContext);

  const [imgInfo, setImgInfo] = React.useState({
    img: '',
    key_img: '',
  });

  const formik = useFormik({
    initialValues: {
      abertura: '',
      fechamento: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSignUpData({ ...signUpData, ...values, ...imgInfo });
      handleNext();
      // console.log(JSON.stringify(values));
    },
  });

  return (
    <>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.inputFields}>
          <Dropzone
            onFileUploaded={setSelectedFile}
            onFileUploaded2={setImgInfo}
          />
          <div className={styles.smallTextField}>
            <TextField
              id="abertura"
              className={styles.small}
              name="abertura"
              type="text"
              label="Abertura*"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.abertura && Boolean(formik.errors.abertura)}
              helperText={formik.touched.abertura && formik.errors.abertura}
            />
            <TextField
              id="fechamento"
              className={styles.small}
              name="fechamento"
              type="text"
              label="Fechamento*"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              error={
                formik.touched.fechamento && Boolean(formik.errors.fechamento)
              }
              helperText={formik.touched.fechamento && formik.errors.fechamento}
            />
          </div>
        </div>
        <footer className={styles.buttons}>
          <Buttons />
        </footer>
      </form>
    </>
  );
};
