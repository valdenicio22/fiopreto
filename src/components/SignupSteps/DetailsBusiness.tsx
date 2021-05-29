import React from 'react';
import { TextField } from '@material-ui/core';

import { SignUpContext } from '../../contexts/SignUpContext';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { maskJs } from 'mask-js';

import Dropzone from '../Dropzone';

import styles from './styles.module.scss';
import { Buttons } from './Buttons';
import Router from 'next/router';

const handleTimerMask = (value) => {
  return maskJs('99:99', value.replace(/[^0-9]/g, ''));
};

const validationSchema = yup.object({
  opening: yup.string().required('Hora de Abertura é um campo obrigatório'),
  closure: yup.string().required('Hora de Fechamento é um campo obrigatório'),
});

export const DetailsBusiness = () => {
  const { signUpData, setSignUpData, setProgress, setSelectedFile } =
    React.useContext(SignUpContext);

  const [imgInfo, setImgInfo] = React.useState({
    img: '',
    key_img: '',
  });

  const formik = useFormik({
    initialValues: {
      opening: signUpData.opening,
      closure: signUpData.closure,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSignUpData({ ...signUpData, ...values, ...imgInfo });
      handleFinish();
    },
  });

  const handleFinish = () => {
    console.log(signUpData);

    // let unmask = (value) => {
    //   return value.replace(/[.]/g, '').replace(/[-]/g, '').replace(/[/]/g, '');
    // }

    // const formData = new FormData();

    // formData.append('document', {
    //   name: selectedFile.name,
    //   path: selectedFile.path,
    //   size: selectedFile.size,
    //   type: selectedFile.type,
    // });
    // formData.append('signUpData', signUpData);

    Router.push('/login');

    setProgress(0);
    // setSignUpData({
    //   userName: '',
    //   email: '',
    //   password: '',
    //   businessName: '',
    //   cnpj: '',
    //   phoneNumber: '',
    //   website: '',
    //   img: '',
    //   key_img: '',
    //   address: {
    //     zipCode: '',
    //     street: '',
    //     number: '',
    //     complement: '',
    //     city: '',
    //   },
    // });
  };

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
              id="opening"
              className={styles.small}
              name="opening"
              label="Abertura*"
              variant="outlined"
              value={formik.values.opening}
              onChange={(e) =>
                formik.handleChange('opening')(handleTimerMask(e.target.value))
              }
              error={formik.touched.opening && Boolean(formik.errors.opening)}
              helperText={formik.touched.opening && formik.errors.opening}
            />
            <TextField
              id="closure"
              className={styles.small}
              name="closure"
              label="Fechamento*"
              variant="outlined"
              value={formik.values.closure}
              onChange={(e) =>
                formik.handleChange('closure')(handleTimerMask(e.target.value))
              }
              error={formik.touched.closure && Boolean(formik.errors.closure)}
              helperText={formik.touched.closure && formik.errors.closure}
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
