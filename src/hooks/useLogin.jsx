import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../components/Toast";
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
                    toastSuccess(data.message);
                    dispatch(userLogin(data));
                    return navigate("dashboard", { replace: true });
                } else {
                    return toastError(data.message);
                }
            });
        } catch (error) {
            toastError(error.message);
        }
    };
    return login;
}

export default useLogin;
