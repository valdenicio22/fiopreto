import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TemporaryDrawer from '../components/Drawer';
import { FullLogoIcon } from '../components/Icons';
import styles from '../styles/perfil.module.scss';

export default function Perfil() {
  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilHeader}>
        <FullLogoIcon />
      </div>
      <div className={styles.perfilDrawer}>
        <h2>Maria da Silva</h2>
        <TemporaryDrawer />
      </div>
      <div className={styles.perfilInformations}>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Dados pessoais
        </Button>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Dados da empresa
        </Button>
        <Button
          className={styles.perfilBtn}
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Foto e horários
        </Button>
      </div>
    </div>
  );
}
