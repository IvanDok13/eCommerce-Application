import { AppRouter } from '@router/router';
import '@styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

const root = document.getElementById('app') as HTMLElement;
if (!root) {
  throw new Error('App element not found');
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
