import React from 'react';
import App from './App';
import './styles/index.css';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store, persistor } from './redux/store';
import "react-datepicker/dist/react-datepicker.css";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);