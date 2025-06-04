import { AppRouter } from '@router/router';
import '@styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

const root = document.querySelector('#app');
if (!(root instanceof HTMLElement)) {
  throw new TypeError('App element not found or is not an HTMLElement');
}

createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
