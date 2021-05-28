import { TesteMaterial } from '../components/materialTest';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <p className={styles.teste}>Teste</p>
      <TesteMaterial />
    </>
  );
}
