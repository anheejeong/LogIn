import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
// import AuthContext from './context/auth-context';
import { AuthContextProvider } from './context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);
