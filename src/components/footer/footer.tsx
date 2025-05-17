import type { FC } from 'react';
import styles from './footer.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerLinks}>
          <div className={styles.footerContacts}>
            <h3 className={styles.footerHeader}>Contact us</h3>
            <div className={styles.footerItem}>
              <div>
                <a
                  href="https://www.google.ru/maps/place/8558+Greene+Ave,+Los+Angeles,+CA+90066,+%D0%A1%D0%A8%D0%90/@33.9943673,-118.4223881,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2ba6"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6663 8.33329C16.6663 12.0152 9.99967 18.3333 9.99967 18.3333C9.99967 18.3333 3.33301 12.0152 3.33301 8.33329C3.33301 4.65139 6.31778 1.66663 9.99967 1.66663C13.6816 1.66663 16.6663 4.65139 16.6663 8.33329Z"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M10.0003 9.16667C10.4606 9.16667 10.8337 8.79357 10.8337 8.33333C10.8337 7.8731 10.4606 7.5 10.0003 7.5C9.54009 7.5 9.16699 7.8731 9.16699 8.33333C9.16699 8.79357 9.54009 9.16667 10.0003 9.16667Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>

                  <span className={styles.footerText}>8558 Green Rd., LA</span>
                </a>
              </div>
              <div>
                <a href="mailto:sBd0m@example.com">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 4.16667H2.5C1.875 4.16667 1.25 4.79167 1.25 5.41667V14.5833C1.25 15.2083 1.875 15.8333 2.5 15.8333H17.5C18.125 15.8333 18.75 15.2083 18.75 14.5833V5.41667C18.75 4.79167 18.125 4.16667 17.5 4.16667Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M18.75 5L10 10L1.25 5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className={styles.footerText}>tattoostudio@example.com</span>
                </a>
              </div>
              <div>
                <a href="tel:16035550123">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15.0984 12.2516L11.6665 12.9166C9.34845 11.7531 7.91654 10.4166 7.08321 8.33329L7.72483 4.89154L6.51197 1.66663L3.72946 1.66663C2.60191 1.66663 1.71466 2.59958 1.90108 3.71161C2.29888 6.08454 3.37231 10.0391 6.24987 12.9166C9.27338 15.9401 13.5661 17.3318 16.1378 17.9288C17.299 18.1983 18.3332 17.2908 18.3332 16.0988L18.3332 13.4843L15.0984 12.2516Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className={styles.footerText}>+1 (603) 555-0123</span>
                </a>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_217_1736)">
                    <path d="M10 5L10 10L15 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path
                      d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_217_1736">
                      <rect width="20" height="20" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                Mon-Sun: 11:00 AM – 19:00 PM
              </div>
            </div>
          </div>

          <div className={styles.footerSocial}>
            <a className={styles.footerLink} href="https://t.me" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12.2488 15.7229"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className={styles.footerLink} href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className={styles.footerLink} href="https://instagramm.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
                  stroke=""
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 6.51L17.51 6.49889"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className={styles.footerLink} href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.8198 20.7684L3.75317 3.96836C3.44664 3.57425 3.72749 3 4.22678 3H6.70655C6.8917 3 7.06649 3.08548 7.18016 3.23164L20.2468 20.0316C20.5534 20.4258 20.2725 21 19.7732 21H17.2935C17.1083 21 16.9335 20.9145 16.8198 20.7684Z"
                  stroke=""
                  strokeWidth="1.5"
                />
                <path d="M20 3L4 21" stroke="" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footerInf}>
          <p className={styles.footerBottom}>© Copyright 2025, All Rights Reserved</p>
          <a className={styles.footerLink} href="https://rs.school/" target="_blank">
            Made in Rolling Scopes School
          </a>
        </div>
      </div>
    </footer>
  );
};
