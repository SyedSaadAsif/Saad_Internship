import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success"
    });

    const showToast = (message, variant = "success") => {

        setToast({
            show: true,
            message,
            variant
        });

    };

    const hideToast = () => {

        setToast(prev => ({
            ...prev,
            show: false
        }));

    };

    return (

        <ToastContext.Provider
            value={{
                toast,
                showToast,
                hideToast
            }}
        >

            {children}

        </ToastContext.Provider>

    );

}

export function useToast() {

    return useContext(ToastContext);

}