import React from 'react';
import './App.css';
import {store, persistor} from "container/store"; // ✅ Import store from container
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ManagePermissionPage from "./Components/ManagePermissionPage";

function App() {
    const {token, role} = useSelector(state => state.auth) || {}; // Add fallback to prevent undefined
    console.log("store-app", token)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ManagePermissionPage/>
            </PersistGate>{" "}
        </Provider>
        // <BrowserRouter>
        //   <Routes>
        //       <Route path="/" element={<ManagePermissionPage/>}></Route>
        //   </Routes>
        // </BrowserRouter>
    );
}

export default App;
