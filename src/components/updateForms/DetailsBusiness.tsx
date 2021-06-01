import React from 'react'
import { TextField } from '@material-ui/core'

import { SalonData, SignUpContext } from '../../contexts/SignUpContext'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { maskJs } from 'mask-js'

import Dropzone from '../Dropzone'

import styles from './styles.module.scss'
import { LeftButton, RightButton } from '../Buttons'
import Router from 'next/router'
import { api } from '../../services/api'

type SalonDataPost = {
  salon: {
    name: string
    phone: string
    site: string
    cnpj: string
    img: string
    key_img: string
    opening: string
    closing: string
    user_id: number
  }
  address: {
    zip: number
    street: string
    street1: string
    number: number
    district: string
    city: string
    state: string
    ibge: number
  }
}

function unmask(value: string) {
  return value.replace(/[.]/g, '').replace(/[-]/g, '').replace(/[/]/g, '')
}

function convertToSalonDataPost(salonData: SalonData): SalonDataPost {
  const { address } = salonData
  return {
    salon: {
      name: salonData.businessName,
      phone: salonData.phoneNumber,
      site: salonData.website,
      cnpj: unmask(salonData.cnpj),
      img: salonData.img,
      key_img: salonData.key_img,
      opening: salonData.opening,
      closing: salonData.closure,
      user_id: salonData.user_id,
    },
    address: {
      zip: Number(unmask(address.zipCode)),
      street: address.street,
      street1: '',
      number: Number(address.number),
      district: address.city,
      city: address.city,
      state: address.state,
      ibge: Number(address.ibge),
    },
  }
}

const handleTimerMask = (value) => {
  return maskJs('99:99', value.replace(/[^0-9]/g, ''))
}

const validationSchema = yup.object({
  opening: yup.string().required('Hora de Abertura é um campo obrigatório'),
  closure: yup.string().required('Hora de Fechamento é um campo obrigatório'),
})

export const DetailsBusiness = () => {
  const { salonData, setSalonData, setProgress, handleBack } =
    React.useContext(SignUpContext)
  const [isImgUploaded, setIsImgUploaded] = React.useState(false)
  const [imgInfo, setImgInfo] = React.useState({
    img: '',
    key_img: '',
  })

  const formik = useFormik({
    initialValues: {
      opening: salonData.opening,
      closure: salonData.closure,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFinish({ ...salonData, ...values, ...imgInfo })
    },
  })

  const handleFinish = (completedSalonData: SalonData) => {
    const salonDataPost = convertToSalonDataPost(completedSalonData)
    api
      .post('salon/', salonDataPost)
      .then((response) => {
        console.log(response)
        Router.push('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.inputFields}>
          <Dropzone
            onFileUploaded={setImgInfo}
            setIsImgUploaded={setIsImgUploaded}
          />
          <div className={styles.smallTextField}>
            <TextField
              id="opening"
              className={styles.small}
              name="opening"
              label="Abertura*"
              variant="outlined"
              placeholder="hh:mm"
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
              placeholder="hh:mm"
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
          <LeftButton onClick={() => handleBack()}>Anterior</LeftButton>

          <RightButton disabled={!isImgUploaded}>Finalizar</RightButton>
        </footer>
      </form>
    </>
  )
}
