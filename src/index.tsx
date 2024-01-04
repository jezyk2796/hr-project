import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto';

import { AppProviders } from './appProviders/AppProviders';
import { App } from './App';
import { Toast } from './components/toast/Toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
      <Toast />
    </AppProviders>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
