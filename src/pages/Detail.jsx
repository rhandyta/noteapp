import HTMLReactParser from "html-react-parser";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Detail() {
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState({});
    const auth = useSelector((auth) => auth.user);
    const { id } = useParams();
    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            try {
                await fetch(`${import.meta.env.VITE_API_URL}notes/show/${id}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `${auth.type} ${auth.token}`,
                        "Access-Control-Allow-Origin": "http://127.0.0.1:5173/",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                })
                    .then(async (res) => {
                        let response = await res.json();
                        setNote(response.note);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [id]);
    return isLoading ? (
        <article className="flex h-full max-w-sm animate-pulse flex-col justify-between rounded-md p-3 antialiased transition-all duration-300 hover:scale-105">
            <div className="mb-2 flex basis-1/12 items-center justify-start">
                <h1 className="whitespace h-2.5 w-48 rounded-full bg-gray-200 text-xl font-semibold text-slate-700 first-letter:uppercase hover:text-slate-500 dark:bg-gray-700"></h1>
            </div>
            <div className="whitespace basis-9/12 break-words text-justify font-medium text-primary">
                <div className="mb-3 mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="basis2/12 flex items-center justify-end gap-2 pt-2">
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
            </div>
        </article>
    ) : (
        <div className="rounded-lg bg-white p-1">
            <h1 className="mb-2 text-2xl font-semibold">{note.title}</h1>
            <div className="text-gray-600">
                <span>
                    {`${new Date(note.created_at).toDateString("id")} -
                       ${new Date(note.created_at).toLocaleTimeString("id")}`}
                </span>
                <span className="ml-2">by {note.user?.name}</span>
            </div>
            <div className="mt-4 text-lg leading-relaxed">
                {HTMLReactParser(`${note.body}`)}
            </div>
        </div>
    );
}

export default Detail;
