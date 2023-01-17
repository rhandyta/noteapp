import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Formik, Form, ErrorMessage } from "formik";
import Card from "../components/Card";

function Dashboard() {
    return (
        <>
            <div className="flex items-center justify-between">
                <Button text="Add Note" className=" text-white " />
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
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    );
}

export default Dashboard;
