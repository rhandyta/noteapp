import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Formik, Form, ErrorMessage } from "formik";
import Card from "../components/Card";
import useGetAllNotes from "../hooks/useGetAllNotes";
import Skeleton from "../components/Skeleton";
import { toastError } from "../components/Toast";
import { useSelector } from "react-redux";

function Dashboard() {
    const auth = useSelector((auth) => auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const getAllNotes = useGetAllNotes({ setIsLoading });
    const [allNotes, setAllNotes] = useState([]);
    let offset = 2;

    function handleScroll() {
        const top = document.documentElement.scrollTop;
        const windowPixel = window.innerHeight;
        const height = document.documentElement.scrollHeight;

        if (top + windowPixel + 1 >= height) {
            fetch(`${import.meta.env.VITE_API_URL}notes?page=${offset}`, {
                method: "GET",
                headers: {
                    Authorization: `${auth.type} ${auth.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then(async (res) => {
                    const newData = [];
                    let { notes } = await res.json();
                    notes.data.forEach((n) => newData.push(n));
                    setAllNotes((oldN) => [...oldN, ...newData]);
                })
                .catch((error) => {
                    setIsLoading(false);
                    return toastError(error.message);
                });
            offset += 1;
        }
    }

    useEffect(() => {
        if (allNotes.length === 0) {
            setAllNotes(getAllNotes);
        }
        return () => {
            window.addEventListener("scroll", handleScroll);
        };
    }, [getAllNotes]);
    return (
        <>
            <div className="flex items-center justify-between">
                <Button text="Add Note" className=" p-2 text-white" />
                <Formik>
                    <Form>
                        <Input
                            className="w-44 md:w-60 xl:w-96"
                            placeholder="Search by title"
                        />
                    </Form>
                </Formik>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    allNotes.map((note) => <Card {...note} key={note.id} />)
                )}
            </div>
        </>
    );
}

export default Dashboard;
