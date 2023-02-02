import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import DataNotFound from "../components/DataNotFound";
import Skeleton from "../components/Skeleton";
import { toastError, toastSuccess } from "../components/Toast";
import useGetAllArchive from "../hooks/useGetAllArchive";

function Archive() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const { archiveNotes, error } = useGetAllArchive({ setIsLoading });

    const handleDelete = async (slug) => {
        try {
            setIsLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}notes/${slug}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${auth.type} ${auth.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then(async (res) => {
                    console.log("OKOKOK");
                    let response = await res.json();
                    toastSuccess(response.message);
                    setIsLoading(false);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    setIsLoading(false);
                    return toastError(error.message);
                });
        } catch (error) {
            setIsLoading(false);
            return toastError(error.message);
        }
    };
    return (
        <>
            {
                <div>
                    {isLoading ? (
                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </div>
                    ) : archiveNotes.length === 0 ? (
                        <DataNotFound />
                    ) : (
                        <div
                            className={`mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3`}
                        >
                            {archiveNotes.map((note) => (
                                <Card
                                    {...note}
                                    key={note.id}
                                    auth={auth}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            }
        </>
    );
}

export default Archive;
