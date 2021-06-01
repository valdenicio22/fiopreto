import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField } from '@material-ui/core'

import styles from './styles.module.scss'

import { maskJs } from 'mask-js'
import { RightButton, LeftButton } from '../Buttons'
import { UserLoggedContext } from '../../contexts/UserLoggedContext'

const handleCepMask = (value) => {
  return maskJs('99.999-999', value.replace(/[^0-9]/g, ''))
}

const validationSchema = yup.object({
  zip: yup.string().required('CEP é um campo obrigatório'),
  street: yup.string().required('Rua é um campo obrigatório'),
  number: yup.string().required('Number é um campo obrigatório'),
  complement: yup.string().required('Complemento é um campo obrigatório'),
  city: yup.string().required('Cidade é um campo obrigatório'),
})

export const AddressBusiness = () => {
  const { salonData, updateSalonData } = React.useContext(UserLoggedContext)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      zip: salonData.address.zip,
      street: salonData.address.street,
      number: salonData.address.number,
      complement: salonData.address?.complement,
      city: salonData.address.city,
      state: salonData.address.state,
      ibge: salonData.address.ibge,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateSalonData({ ...salonData, address: { ...values } })
    },
  })

  function onBlurCep(e, setFieldValue) {
    const { value } = e.target

    const cep = value?.replace(/[^0-9]/g, '')
    if (cep?.length !== 8) return
    setLoading(true)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setFieldValue('ibge', data.ibge)
        setFieldValue('state', data.uf)
        setFieldValue('street', data.logradouro)
        setFieldValue('complement', data.complemento)
        setFieldValue('city', data.localidade)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err) // criar error
      })
  }
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputFields}>
        <TextField
          id="zip"
          className={styles.textField}
          name="zip"
          label="CEP*"
          variant="outlined"
          fullWidth
          onBlur={(e) => onBlurCep(e, formik.setFieldValue)}
          value={formik.values.zip}
          onChange={(e) =>
            formik.handleChange('zip')(handleCepMask(e.target.value))
          }
          error={formik.touched.zip && Boolean(formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
        />
        <TextField
          id="street"
          className={styles.textField}
          name="street"
          label="Rua*"
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
            label="Número*"
            variant="outlined"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
          <TextField
            id="complement"
            className={styles.small}
            name="complement"
            type="text"
            label="Complemento*"
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
          label="Cidade*"
          variant="outlined"
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </div>
      <footer className={styles.buttons}>
        <RightButton disabled={loading}>Confirmar alterações</RightButton>
      </footer>
    </form>
  )
}
