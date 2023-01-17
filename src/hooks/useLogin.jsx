import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../features/userSlice";

function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (email, password) => {
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            let data = await response.json();
            if (data.success) {
                dispatch(userLogin(data));
                toast.success(`🦄 ${data.message}!`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return navigate("dashboard");
            }
            return toast.error(`🦄 Upss, ${data.messages}!`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error("🦄 Upss, Something went wrong!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    return login;
}

export default useLogin;
