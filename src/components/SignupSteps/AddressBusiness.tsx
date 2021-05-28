import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField } from '@material-ui/core';

import styles from './styles.module.scss';

import { SignUpContext } from '../../contexts/SignUpContext';
import { useContext } from 'react';

import { maskJs } from 'mask-js';
import { Buttons } from './Buttons';

const handleCepMask = (value) => {
  return maskJs('99.999-999', value.replace(/[^0-9]/g, ''));
};

const validationSchema = yup.object({
  zipCode: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().required(),
  city: yup.string().required(),
});

export const AddressBusiness = () => {
  const { signUpData, setSignUpData, handleNext } = useContext(SignUpContext);

  const formik = useFormik({
    initialValues: {
      zipCode: signUpData.address.zipCode,
      street: signUpData.address.street,
      number: signUpData.address.number,
      complement: signUpData.address.complement,
      city: signUpData.address.city,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSignUpData({ ...signUpData, address: { ...values } });
      handleNext();
    },
  });

  function onBlurCep(e, setFieldValue) {
    const { value } = e.target;

    const cep = value?.replace(/[^0-9]/g, '');
    if (cep?.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setFieldValue('street', data.logradouro);
        setFieldValue('complement', data.complemento);
        setFieldValue('city', data.localidade);
      });
  }
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="zipCode"
          className={styles.textField}
          name="zipCode"
          type="text"
          label="CEP*"
          variant="outlined"
          fullWidth
          onBlur={(e) => onBlurCep(e, formik.setFieldValue)}
          value={formik.values.zipCode}
          onChange={(e) =>
            formik.handleChange('zipCode')(handleCepMask(e.target.value))
          }
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
        />
        <TextField
          id="street"
          className={styles.textField}
          name="street"
          type="text"
          label="street*"
          variant="outlined"
          fullWidth
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
        />
        <div className={`${styles.smallTextField} ${styles.textField}`}>
          <TextField
            id="number"
            className={styles.small}
            name="number"
            type="text"
            label="Número*"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
          <TextField
            id="complement"
            className={styles.small}
            name="complement"
            type="text"
            label="complement"
            variant="outlined"
            value={formik.values.complement}
            onChange={formik.handleChange}
            error={
              formik.touched.complement && Boolean(formik.errors.complement)
            }
            helperText={formik.touched.complement && formik.errors.complement}
          />
        </div>
        <TextField
          id="city"
          className={styles.textField}
          name="city"
          type="text"
          label="city*"
          variant="outlined"
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </div>
      <footer className={styles.buttons}>
        <Buttons />
      </footer>
    </form>
  );
};
