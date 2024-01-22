
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1>React + Typescript ToDo - <span>@FW2B</span></h1>
    </header>
  );
}

export default Header