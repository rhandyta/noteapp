import HTMLReactParser from "html-react-parser";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { toastError, toastSuccess } from "../components/Toast";
import iconSvg from "../utils/constant";

function Detail() {
    const [isLoading, setIsLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [note, setNote] = useState({});
    const auth = useSelector((auth) => auth.user);
    const { id } = useParams();
    const navigate = useNavigate();
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
                        return toastError(error.message);
                    });
            } catch (error) {
                setIsLoading(false);
                return toastError(error.message);
            }
        };

        fetchDetail();
    }, [id]);

    const handleDelete = async (slug) => {
        try {
            setDeleteLoading(true);
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
                    let response = await res.json();
                    toastSuccess(response.message);
                    setDeleteLoading(false);
                    navigate(-1);
                })
                .catch((error) => {
                    setDeleteLoading(false);
                    return toastError(error.message);
                });
        } catch (error) {
            setDeleteLoading(false);
            return toastError(error.message);
        }
    };

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
            <div className="flex basis-2/12 items-center justify-evenly gap-2 px-40 pt-2 md:justify-center md:px-20">
                {iconSvg.map((icon, index) =>
                    note.user_id == auth.user.id ? (
                        <div key={index}>
                            {icon.name == "back" ? (
                                <Link
                                    to={`/`}
                                    className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                >
                                    {icon.img}
                                </Link>
                            ) : icon.name === "trash" ? (
                                deleteLoading ? (
                                    <Spinner />
                                ) : (
                                    <Button
                                        className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                        onClick={() => handleDelete(note.slug)}
                                    >
                                        {icon.img}
                                    </Button>
                                )
                            ) : (
                                icon.name === "edit" && (
                                    <Button
                                        className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                        onClick={() =>
                                            navigate(`/edit/${note.slug}`, {
                                                state: {
                                                    title: note.title,
                                                    slug: note.slug,
                                                    body: note.body,
                                                    user: note.user,
                                                    visible: note.visible,
                                                    archive: note.archive,
                                                },
                                            })
                                        }
                                    >
                                        {icon.img}
                                    </Button>
                                )
                            )}
                        </div>
                    ) : (
                        icon.name === "back" && (
                            <Button
                                key={index}
                                onClick={() => navigate(-1)}
                                className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                            >
                                {icon.img}
                            </Button>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default Detail;
