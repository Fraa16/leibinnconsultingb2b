import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Fonts are self-hosted, so no visitor IP reaches Google.
import '@fontsource-variable/instrument-sans';
import '@fontsource/alex-brush';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
