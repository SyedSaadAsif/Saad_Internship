import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";   // <-- ADD THIS

import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";

import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <UserProvider>
        <ToastProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToastProvider>
    </UserProvider>
);