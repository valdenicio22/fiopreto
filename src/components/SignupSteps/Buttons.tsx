import styles from './styles.module.scss';
import Router from 'next/router';

import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { SignUpContext } from '../../contexts/SignUpContext';

export const Buttons = () => {
  const { progress, loading, handleBack } = useContext(SignUpContext);

  return (
    <>
      <Button
        className={styles.btn}
        size="large"
        variant="outlined"
        color="primary"
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
        disabled={loading}
      >
        {progress === 3 ? 'Finalizar' : 'Proximo'}
      </Button>
    </>
  );
};
