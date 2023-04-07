import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link'
 

const Header = () => {

  function renderLogo() {
    return (
      <Link href={`https://easyexpresssoft.com`}>
        <div
          className={styles.logo}
        >
          <Image src="/static/logo.png"  alt="logo" width={48} height={48} />
          <div className={styles.company}>
            <h4>Easy Express</h4>
            <h4>Solutions Inc.</h4>
          </div>        
       </div>
      </Link>
    );
  }

  return (
    <nav id="nav" className={styles.nav}>
      <div className={styles.container}>
        <div className={styles['nav-content']}>
          {renderLogo()}
          <h3 className={styles.title}>Open AI</h3>
        </div>
      </div>
     
    </nav>
  );
};

export default Header;