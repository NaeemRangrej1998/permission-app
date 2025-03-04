//
// import ("./bootstrap");
// export {};

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SnackbarProvider} from "notistack";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>
);
