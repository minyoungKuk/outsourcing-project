import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './context/modal.context';
import './index.css';
import QueryClientSetup from './QueryClientSetup.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientSetup>
      <ModalProvider>
        <App />
      </ModalProvider>
    </QueryClientSetup>
  </React.StrictMode>,
);
