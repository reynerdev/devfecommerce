import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContext, { UserProvider } from './contexts/UserContext';
ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
