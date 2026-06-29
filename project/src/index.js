import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import App from "./App";

import { UserProvider } from "./context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

const root =
    ReactDOM.createRoot(
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