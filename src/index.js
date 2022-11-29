import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App/App';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
);
