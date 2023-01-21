import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Card from "../components/Card";
import useGetAllNotes from "../hooks/useGetAllNotes";
import Skeleton from "../components/Skeleton";
import { toastError, toastSuccess } from "../components/Toast";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

function Dashboard() {
    const auth = useSelector((auth) => auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const getAllNotes = useGetAllNotes({ setIsLoading });
    const [allNotes, setAllNotes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    let page = 2;

    function handleScroll() {
        const top = document.documentElement.scrollTop;
        const windowPixel = window.innerHeight;
        const height = document.documentElement.scrollHeight;

        if (top + windowPixel + 1 >= height) {
            fetch(`${import.meta.env.VITE_API_URL}notes?page=${page}`, {
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
            page += 1;
        }
    }

    useEffect(() => {
        if (allNotes.length === 0) {
            setAllNotes(getAllNotes);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [getAllNotes]);

    function handleClose() {
        setIsOpen(!isOpen);
    }

    const initialValues = {
        title: "",
        body: "",
        visible: 0,
        archive: 0,
    };

    const validationSchema = yup.object({
        title: yup.string().min(3).max(150).required().trim(),
        // body: yup.required(),
        // visible: yup.boolean().required(),
        // archive: yup.boolean().required(),
    });

    const onSubmit = async (values, props) => {
        try {
            setIsLoading(true);
            const { title, body, visible, archive } = values;
            const data = {
                title,
                body,
                visible: visible[0],
                archive: archive[0],
            };
            await fetch(`${import.meta.env.VITE_API_URL}notes`, {
                method: "POST",
                headers: {
                    Authorization: `${auth.type} ${auth.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            })
                .then(async (res) => {
                    let response = await res.json();
                    initialValues.title = "";
                    initialValues.body = "";
                    initialValues.visible = 0;
                    initialValues.archive = 0;
                    setIsOpen(!open);
                    toastSuccess(response.message);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toastError(error.message);
                    setIsLoading(false);
                });
        } catch (error) {
            toastError(error.message);
            setIsLoading(false);
        }
    };
    return (
        <>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    Input={Input}
                    isLoading={isLoading}
                />
            )}
            <div className={`flex items-center justify-between  `}>
                <Button
                    text="Add Note"
                    className=" p-2 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <Formik>
                    <Form>
                        <Input
                            name="title"
                            className="w-44 md:w-60 xl:w-96"
                            placeholder="Search by title"
                        />
                    </Form>
                </Formik>
            </div>
            <div
                className={`mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3`}
            >
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
