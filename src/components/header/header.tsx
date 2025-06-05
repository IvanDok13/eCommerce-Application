import { useContext, useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from 'src/context/auth-provider';
import styles from './header.module.css';

export const Header: FC = () => {
  const { isLoginned, setLogin, setIsLoginned } = useContext(authContext);

  const [exitStyle, setExitStyle] = useState('');

  const handleLogOut = (): void => {
    localStorage.removeItem('Token');
    localStorage.removeItem('customerId');
    setLogin('');
    setIsLoginned(false);
  };

  const [userStyle, setUserStyle] = useState('');

  useEffect(() => {
    if (isLoginned) {
      setUserStyle('logined');
      setExitStyle('logined-change');
    } else {
      setUserStyle('');
      setExitStyle('');
    }
  }, [isLoginned]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerLogoWrapper}>
          <a className={styles.headerLogo} href="/">
            <img className={styles.headerLogoImg} src="/svg/logo.svg" alt="Logo" />
          </a>
        </div>

        <nav className={styles.headerNav}>
          <ul className={styles.headerList}>
            <li className={styles.headerItem}>
              <a className={styles.headerLink} href="/">
                Home
              </a>
            </li>
            <li className={styles.headerItem}>
              <a className={styles.headerLink} href="/catalog">
                Catalog
              </a>
            </li>
            <li className={styles.headerItem}>
              <a className={styles.headerLink} href="/about">
                About
              </a>
            </li>

          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#contacts">
              Contacts
            </a>
          </li>
        </ul>
      </nav>

        <div className={styles.headerButtonWrapper}>
          <a className={styles.headerButton} href="registration">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="login"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"></path>
            </svg>
          </a>
          <Link className={`styles.headerButton ${userStyle}`} to={!isLoginned ? '/login' : '/profile'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M10.5996 10C9.22461 10 8.04753 9.51042 7.06836 8.53125C6.08919 7.55208 5.59961 6.375 5.59961 5C5.59961 3.625 6.08919 2.44792 7.06836 1.46875C8.04753 0.489584 9.22461 0 10.5996 0C11.9746 0 13.1517 0.489584 14.1309 1.46875C15.11 2.44792 15.5996 3.625 15.5996 5C15.5996 6.375 15.11 7.55208 14.1309 8.53125C13.1517 9.51042 11.9746 10 10.5996 10ZM0.599609 20V16.5C0.599609 15.7917 0.78211 15.1404 1.14711 14.5463C1.51211 13.9521 1.99628 13.4992 2.59961 13.1875C3.89128 12.5417 5.20378 12.0571 6.53711 11.7338C7.87044 11.4104 9.22461 11.2492 10.5996 11.25C11.9746 11.25 13.3288 11.4117 14.6621 11.735C15.9954 12.0583 17.3079 12.5425 18.5996 13.1875C19.2038 13.5 19.6884 13.9533 20.0534 14.5475C20.4184 15.1417 20.6004 15.7925 20.5996 16.5V20H0.599609Z"></path>
            </svg>
          </Link>

          <a href="#" className={`logout ${exitStyle}`} onClick={handleLogOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M10.5996 10C9.22461 10 8.04753 9.51042 7.06836 8.53125C6.08919 7.55208 5.59961 6.375 5.59961 5C5.59961 3.625 6.08919 2.44792 7.06836 1.46875C8.04753 0.489584 9.22461 0 10.5996 0C11.9746 0 13.1517 0.489584 14.1309 1.46875C15.11 2.44792 15.5996 3.625 15.5996 5C15.5996 6.375 15.11 7.55208 14.1309 8.53125C13.1517 9.51042 11.9746 10 10.5996 10ZM0.599609 20V16.5C0.599609 15.7917 0.78211 15.1404 1.14711 14.5463C1.51211 13.9521 1.99628 13.4992 2.59961 13.1875C3.89128 12.5417 5.20378 12.0571 6.53711 11.7338C7.87044 11.4104 9.22461 11.2492 10.5996 11.25C11.9746 11.25 13.3288 11.4117 14.6621 11.735C15.9954 12.0583 17.3079 12.5425 18.5996 13.1875C19.2038 13.5 19.6884 13.9533 20.0534 14.5475C20.4184 15.1417 20.6004 15.7925 20.5996 16.5V20H0.599609ZM10.5996 1.25C9.22461 1.25 8.04753 1.73958 7.06836 2.71875C6.08919 3.69792 5.59961 4.875 5.59961 6.25C5.59961 7.625 6.08919 8.80208 7.06836 9.78125C8.04753 10.7604 9.22461 11.25 10.5996 11.25C11.9746 11.25 13.1517 10.7604 14.1309 9.78125C15.11 8.80208 15.5996 7.625 15.5996 6.25C15.5996 4.875 15.11 3.69792 14.1309 2.71875C13.1517 1.73958 11.9746 1.25 10.5996 1.25Z"></path>
            </svg>
          </a>

          <button className={styles.headerButton} type="button">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.60455 0C12.2845 0 14.4878 2.10591 14.5996 4.77432H14.5735C14.5766 4.85189 14.5617 4.92913 14.5299 5H14.6861C15.9031 5 17.1775 5.84351 17.6884 7.8798L17.744 8.12007L18.5129 14.3147C19.0662 18.2657 16.9046 19.9273 13.9558 19.9977L13.7581 20H5.46814C2.47139 20 0.162154 18.908 0.66989 14.5836L0.704514 14.3147L1.48225 8.12007C1.86575 5.92719 3.15322 5.06225 4.39373 5.00326L4.53132 5H4.6095C4.59631 4.92535 4.59631 4.84898 4.6095 4.77432C4.72133 2.10591 6.9246 0 9.60455 0ZM6.69661 8.32929C6.2085 8.32929 5.81282 8.73655 5.81282 9.23893C5.81282 9.74131 6.2085 10.1486 6.69661 10.1486C7.18471 10.1486 7.5804 9.74131 7.5804 9.23893L7.57351 9.12483C7.51897 8.67631 7.14716 8.32929 6.69661 8.32929ZM12.4854 8.32929C11.9973 8.32929 11.6016 8.73655 11.6016 9.23893C11.6016 9.74131 11.9973 10.1486 12.4854 10.1486C12.9735 10.1486 13.3692 9.74131 13.3692 9.23893C13.3692 8.73655 12.9735 8.32929 12.4854 8.32929ZM9.56536 1.30238C7.64125 1.30238 6.08145 2.85682 6.08145 4.77432C6.09463 4.84898 6.09463 4.92535 6.08145 5H13.0928C13.065 4.92794 13.0502 4.85153 13.0493 4.77432C13.0493 2.85682 11.4895 1.30238 9.56536 1.30238Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
