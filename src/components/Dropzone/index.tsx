import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './styles.module.scss'

import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import { api } from '../../services/api'
import { SignUpContext } from '../../contexts/SignUpContext'

interface Props {
  onFileUploaded: Dispatch<SetStateAction<{ img: string; key_img: string }>>
  setIsImgUploaded: Dispatch<SetStateAction<boolean>>
}

interface ImgResponseData {
  url: string
  key: string
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, setIsImgUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(
    (acceptedFiles) => {
      const [file] = acceptedFiles

      const data = new FormData()

      const fileUrl = URL.createObjectURL(file)
      setSelectedFileUrl(fileUrl)

      if (file) {
        data.append('file', file, file.name)
      }
      api
        .post<ImgResponseData>('/image', data)
        .then((response) => {
          console.log(`A imagem ${file.name} já foi enviada para o servidor!`)
          onFileUploaded({
            img: response.data.url,
            key_img: response.data.key,
          })
          setIsImgUploaded(true)
        })
        .catch((err) => {
          setIsImgUploaded(false)
          console.error(err)
        })
    },
    [onFileUploaded]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  })

  return (
    <div className={styles.dropzone} {...getRootProps()} onChange={() => {}}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem do Estabelecimento" />
      ) : (
        <p>
          <span className={styles.iconImage}>
            <ImageSearchIcon fontSize="large" />
          </span>{' '}
          Click ou arraste uma imagem
        </p>
      )}
    </div>
  )
}

export default Dropzone
