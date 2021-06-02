import React from 'react'
import { TextField } from '@material-ui/core'

// import { SalonData } from '../../contexts/SignUpContext'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { maskJs } from 'mask-js'

import Dropzone from '../Dropzone'

import styles from './styles.module.scss'
import { RightButton } from '../Buttons'
import { UserLoggedContext } from '../../contexts/UserLoggedContext'

const handleTimerMask = (value) => {
  return maskJs('99:99', value.replace(/[^0-9]/g, ''))
}

const validationSchema = yup.object({
  opening: yup.string().required('Hora de Abertura é um campo obrigatório'),
  closing: yup.string().required('Hora de Fechamento é um campo obrigatório'),
})

export const DetailsBusiness = () => {
  const { salonData, updateSalonData } = React.useContext(UserLoggedContext)

  const [isImgUploaded, setIsImgUploaded] = React.useState(false)
  const [imgInfo, setImgInfo] = React.useState({
    img: salonData?.img,
    key_img: salonData?.key_img,
  })
  console.log('dhkjahdkhsadkkasd')
  const formik = useFormik({
    initialValues: {
      opening: salonData?.opening,
      closing: salonData?.closing,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateSalonData({ ...salonData, ...values, ...imgInfo })
    },
  })

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
              id="closing"
              className={styles.small}
              name="closing"
              placeholder="hh:mm"
              label="Fechamento*"
              variant="outlined"
              value={formik.values.closing}
              onChange={(e) =>
                formik.handleChange('closing')(handleTimerMask(e.target.value))
              }
              error={formik.touched.closing && Boolean(formik.errors.closing)}
              helperText={formik.touched.closing && formik.errors.closing}
            />
          </div>
        </div>
        <footer className={styles.buttons}>
          <RightButton disabled={!isImgUploaded}>Finalizar</RightButton>
        </footer>
      </form>
    </>
  )
}
