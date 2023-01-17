import React from "react";
import { toast, ToastContainer } from "react-toastify";

function Toast() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
}

export const toastSuccess = (message) => {
    toast.success(`🦄 ${message}!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

export const toastError = (message) => {
    toast.error(
        message ? `🦄 Upss, ${message}!` : `🦄 Upss, Something went wrong!`,
        {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
    );
};
export default Toast;
