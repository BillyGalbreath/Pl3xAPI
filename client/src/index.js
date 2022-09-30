import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AddonsContextProvider} from "./context/AddonsContext";
import './index.css';
import {AuthContextProvider} from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <AddonsContextProvider>
                <App/>
            </AddonsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
