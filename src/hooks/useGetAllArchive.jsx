import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toastError } from "../components/Toast";

function useGetAllArchive({ setIsLoading }) {
    const auth = useSelector((state) => state.user);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [error, setError] = useState("");
    const getArchives = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}notes/archive`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Credentials": true,
                        Authorization: `${auth.type} ${auth.token}`,
                    },
                }
            );
            let resp = await res.json();
            setArchiveNotes(resp.notes);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return toastError(error.message);
        }
    };

    useEffect(() => {
        getArchives();
    }, []);

    return { archiveNotes, error };
}

export default useGetAllArchive;
