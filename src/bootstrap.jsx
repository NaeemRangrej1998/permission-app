// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {SnackbarProvider} from "notistack";
// import "@fortawesome/fontawesome-free/css/all.min.css";
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     // <Provider store={store}>
//     <SnackbarProvider>
//             <App/>
//         </SnackbarProvider>
//     // </Provider>
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { SnackbarProvider } from "notistack";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { Provider } from "react-redux";
//
// // Try importing store and handle potential undefined issues
// import("container/store")
//     .then(({ default: store }) => {
//         console.log('Redux Store Loaded:', store); // ✅ Ensure the store is loaded properly
//
//         const root = ReactDOM.createRoot(document.getElementById('root'));
//         root.render(
//             <Provider store={store}>
//                 <SnackbarProvider>
//                     <App />
//                 </SnackbarProvider>
//             </Provider>
//         );
//     })
//     .catch((error) => {
//         console.error("Failed to load store from container:", error);
//     });
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SnackbarProvider} from "notistack";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Load the container's store directly before rendering
import("container/store").then(({ store, persistor }) => {
    console.log('Store loaded successfully:', store);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <SnackbarProvider>
            <App containerStore={store} containerPersistor={persistor} />
        </SnackbarProvider>
    );
}).catch(error => {
    console.error("Failed to load store:", error);

    // Render app with error message
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <div>Error loading application: {error.message}</div>
    );
});