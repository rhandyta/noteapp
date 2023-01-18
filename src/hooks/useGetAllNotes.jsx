import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../components/Toast";

function useGetAllNotes({ setIsLoading }) {
    const auth = useSelector((state) => state.user);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const getAllNote = async () => {
            try {
                await setIsLoading(true);
                await fetch(`${import.meta.env.VITE_API_URL}notes`, {
                    method: "GET",
                    headers: {
                        Authorization: `${auth.type} ${auth.token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }).then(async (res) => {
                    let tmpNotes = [];
                    let response = await res.json();
                    if (response.notes.length > 0) {
                        tmpNotes = response.notes.map((note) => note);
                        setNotes(tmpNotes);
                        return await setIsLoading(false);
                    }
                    await setIsLoading(false);
                    return toastSuccess("Note not yet available");
                });
            } catch (error) {
                await setIsLoading(false);
                return toastError(error.message);
            }
        };

        return () => {
            getAllNote();
        };
    }, []);
    return notes;
}

export default useGetAllNotes;
