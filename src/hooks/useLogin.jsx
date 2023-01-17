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
            await fetch(`${import.meta.env.VITE_API_URL}login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }).then(async (res) => {
                let data = await res.json();
                if (data.success) {
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
                    setTimeout(() => {
                        dispatch(userLogin(data));
                        return navigate("dashboard", { replace: true });
                    }, 2500);
                } else {
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
                }
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
