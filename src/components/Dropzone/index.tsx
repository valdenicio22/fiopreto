import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { api } from '../../services/api';
import { SignUpContext } from '../../contexts/SignUpContext';

interface Props {
  onFileUploaded: (file: File) => void;
  onFileUploaded2: Dispatch<SetStateAction<{ img: string; key_img: string }>>;
}

interface imgResponseData {
  url: string;
  key: string;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, onFileUploaded2 }) => {
  const { setLoading } = React.useContext(SignUpContext);

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const data = new FormData();
      if (file) {
        data.append('file', file, file.name);
      }
      setLoading(true);
      api
        .post<imgResponseData>('/image', data)
        .then((response) => {
          console.log(`A imagem ${file.name} já foi enviada para o servidor!`);
          onFileUploaded2({
            img: response.data.url,
            key_img: response.data.key,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
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
