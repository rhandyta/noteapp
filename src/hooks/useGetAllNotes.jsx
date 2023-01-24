import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../components/Toast";

function useGetAllNotes({ setIsLoading }) {
    const auth = useSelector((state) => state.user);
    const [notes, setNotes] = useState([]);
    const getAllNote = async () => {
        try {
            await setIsLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}notes?page=1`, {
                method: "GET",
                headers: {
                    Authorization: `${auth.type} ${auth.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "http://127.0.0.1:5173/",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": true,
                },
            }).then(async (res) => {
                let tmpNotes = [];
                let { notes } = await res.json();
                if (notes.data.length > 0) {
                    tmpNotes = notes.data.map((note) => note);
                    setNotes(tmpNotes);
                    return await setIsLoading(false);
                }
                await setIsLoading(false);
                return toastSuccess("Note not yet available");
            });
        } catch (error) {
            await setIsLoading(false);
            return toastError("Something went wrong");
        }
    };

    useEffect(() => {
        getAllNote();
    }, []);
    return notes;
}

export default useGetAllNotes;
