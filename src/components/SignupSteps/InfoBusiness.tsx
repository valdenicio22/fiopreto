import { TextField } from '@material-ui/core';

import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { SignUpContext } from '../../contexts/SignUpContext';
import { maskJs } from 'mask-js';

import styles from './styles.module.scss';
import { Buttons } from './Buttons';

const handlePhoneMask = (value) => {
  // console.log(value);
  // if (value.length < 15) {
  //   return maskJs('(99) 9999-9999', value.replace(/[^0-9]/g, ''));
  // }
  return maskJs('(99) 9 9999-9999', value.replace(/[^0-9]/g, ''));
};

const handleCnpjMask = (value) => {
  return maskJs('99.999.999/9999-99', value.replace(/[^0-9]/g, ''));
};

const validationSchema = yup.object({
  businessName: yup
    .string()
    .min(3, 'Nome da empresa deve conter no mínimo 3 letras!')
    .required('Nome da empresa é um campo obrigatório'),
  cnpj: yup.string(),
  // .matches(
  //   /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/g,
  //   'CNPJ deve conter 14 digitos'
  // ),
  phoneNumber: yup.string().required('Telefone é um campo obrigatório'),
  // .matches('^\\(\\d{2}\\)\\d{4,5}\\-\\d{4}$')
  site: yup.string(),
});

export const InfoBusiness = () => {
  const { signUpData, setSignUpData, handleNext } = useContext(SignUpContext);

  const formik = useFormik({
    initialValues: {
      businessName: signUpData.businessName,
      cnpj: signUpData.cnpj,
      phoneNumber: signUpData.phoneNumber,
      website: signUpData.website,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSignUpData({ ...signUpData, ...values });
      handleNext();
      // console.log(JSON.stringify(values));
    },
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="businessName"
          className={styles.textField}
          name="businessName"
          label="Nome da Empresa*"
          variant="outlined"
          fullWidth
          value={formik.values.businessName}
          onChange={formik.handleChange}
          error={
            formik.touched.businessName && Boolean(formik.errors.businessName)
          }
          helperText={formik.touched.businessName && formik.errors.businessName}
        />
        <TextField
          id="cnpj"
          className={styles.textField}
          name="cnpj"
          label="CNPJ (Opcional)"
          variant="outlined"
          fullWidth
          value={formik.values.cnpj}
          onChange={(e) =>
            formik.handleChange('cnpj')(handleCnpjMask(e.target.value))
          }
          error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
          helperText={formik.touched.cnpj && formik.errors.cnpj}
        />
        <TextField
          id="phoneNumber"
          className={styles.textField}
          name="phoneNumber"
          label="Telefone*"
          variant="outlined"
          fullWidth
          value={formik.values.phoneNumber}
          onChange={(e) =>
            formik.handleChange('phoneNumber')(handlePhoneMask(e.target.value))
          }
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          id="website"
          className={styles.textField}
          name="website"
          label="WebSite (Opcional)"
          variant="outlined"
          fullWidth
          value={formik.values.website}
          onChange={formik.handleChange}
          error={formik.touched.website && Boolean(formik.errors.website)}
          helperText={formik.touched.website && formik.errors.website}
        />
      </div>
      <footer className={styles.buttons}>
        <Buttons />
      </footer>
    </form>
  );
};
