import React from 'react'
import { TextField } from '@material-ui/core'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { maskJs } from 'mask-js'
import styles from './styles.module.scss'
import { RightButton } from '../Buttons'

import { UserLoggedContext } from '../../contexts/UserLoggedContext'

const handlePhoneMask = (value) => {
  return maskJs('(99)99999-9999', value.replace(/[^0-9]/g, ''))
}

const handleCnpjMask = (value) => {
  return maskJs('99.999.999/9999-99', value.replace(/[^0-9]/g, ''))
}

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Nome da empresa deve conter no mínimo 3 letras!')
    .required('Nome da empresa é um campo obrigatório'),
  cnpj: yup.string(),
  // .matches(
  //   /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/g,
  //   'CNPJ deve conter 14 digitos'
  // ),
  phone: yup.string().required('Telefone é um campo obrigatório'),
  // .matches('^\\(\\d{2}\\)\\d{4,5}\\-\\d{4}$')
  site: yup.string(),
})

export const InfoBusiness = () => {
  const { salonData, updateSalonData } = React.useContext(UserLoggedContext)

  const formik = useFormik({
    initialValues: {
      name: salonData?.name,
      cnpj: salonData?.cnpj,
      phone: salonData?.phone,
      site: salonData?.site,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateSalonData({ ...salonData, ...values })
    },
  })

  console.log({ salonData })

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="name"
          className={styles.textField}
          name="name"
          label="Nome da Empresa*"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
          id="phone"
          className={styles.textField}
          name="phone"
          label="Telefone*"
          variant="outlined"
          fullWidth
          value={formik.values.phone}
          onChange={(e) =>
            formik.handleChange('phone')(handlePhoneMask(e.target.value))
          }
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          id="site"
          className={styles.textField}
          name="site"
          label="site (Opcional)"
          variant="outlined"
          fullWidth
          value={formik.values.site}
          onChange={formik.handleChange}
          error={formik.touched.site && Boolean(formik.errors.site)}
          helperText={formik.touched.site && formik.errors.site}
        />
      </div>
      <footer className={styles.buttons}>
        <RightButton className={styles.btnUpdate}>
          Confirmar Alterações
        </RightButton>
      </footer>
    </form>
  )
}
