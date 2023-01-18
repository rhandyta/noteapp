import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Formik, Form, ErrorMessage } from "formik";
import Card from "../components/Card";
import useGetAllNotes from "../hooks/useGetAllNotes";
import Skeleton from "../components/Skeleton";
import { toastError } from "../components/Toast";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setModal] = useState(false);
    const getAllNotes = useGetAllNotes({ setIsLoading });
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
                    getAllNotes.map((note) => <Card {...note} />)
                )}
            </div>
        </>
    );
}

export default Dashboard;
