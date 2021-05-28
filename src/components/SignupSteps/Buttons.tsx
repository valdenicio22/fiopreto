import styles from './styles.module.scss';
import Router from 'next/router';

import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useContext } from 'react';
import { SignUpContext } from '../../contexts/SignUpContext';

export const Buttons = () => {
  const {
    signUpData,
    progress,
    selectedFile,
    handleBack,
    setProgress,
    setSignUpData,
  } = useContext(SignUpContext);

  const handleFinish = () => {
    console.log(selectedFile);
    console.log(signUpData);

    // const formData = new FormData();

    // formData.append('document', {
    //   name: selectedFile.name,
    //   path: selectedFile.path,
    //   size: selectedFile.size,
    //   type: selectedFile.type,
    // });
    // formData.append('signUpData', signUpData);

    Router.push('/login');

    //setProgress(0);
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
      <Button
        className={styles.btn}
        size="large"
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={
          progress === 0
            ? () => {
                Router.push('/login');
              }
            : () => handleBack()
        }
      >
        Voltar
      </Button>

      <Button
        className={styles.btn}
        size="large"
        variant="contained"
        color="primary"
        type="submit"
        endIcon={progress < 3 ? <ArrowForwardIcon /> : ''}
        onClick={progress === 3 ? () => handleFinish() : () => {}}
      >
        {progress === 3 ? 'Finalizar' : 'Proximo'}
      </Button>
    </>
  );
};
