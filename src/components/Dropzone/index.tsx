import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { api } from '../../services/api';

interface Props {
  onFileUploaded: (file: File) => void;
  onFileUploaded2: Dispatch<SetStateAction<{ img: string; key_img: string }>>;
}

interface imgResponseData {
  url: string;
  key: string;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, onFileUploaded2 }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const data = new FormData();
      if (file) {
        data.append('file', file, file.name);
      }
      api
        .post<imgResponseData>('/image', data)
        .then((response) => {
          console.log(`A imagem ${file.name} j foi enviada para o servidor!`);
          onFileUploaded2({
            img: response.data.url,
            key_img: response.data.key,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);

      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  console.log(selectedFileUrl);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

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
  );
};

export default Dropzone;
