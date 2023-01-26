import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { toastError, toastSuccess } from "../components/Toast";

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required().min(5).max(40).uppercase().trim(),
        email: yup.string().required().email(),
        password: yup.string().required().min(3),
        confirmPassword: yup
            .string()
            .required("confirm password is a required field")
            .min(3, "confirm password must be at least 3 characters")
            .oneOf([yup.ref("password"), null], "Password must match"),
    });

    const onSubmit = async (values, props) => {
        try {
            setIsLoading(true);
            const { name, email, password } = values;
            await fetch(`${import.meta.env.VITE_API_URL}register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })
                .then(async (res) => {
                    let response = await res.json();
                    toastSuccess(response.message);
                    setIsLoading(false);
                    return navigate("/");
                })
                .catch((error) => {
                    setIsLoading(false);
                    toastError(error.messages);
                });
        } catch (error) {
            setIsLoading(false);
            toastError(error.messages);
        }
    };
    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-slate-700">
                    Register to App Notes
                </h2>
                <p className="text-md text-lg font-medium text-slate-600">
                    Let's register to be login
                </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => {
                        return (
                            <Form
                                autoComplete="off"
                                className="flex flex-col gap-3"
                            >
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="text-base text-slate-600"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="trasition block w-full rounded border border-third p-1 outline-none duration-300 focus:ring-1 focus:ring-secondary"
                                    />
                                    <ErrorMessage name="name">
                                        {(error) => (
                                            <span className="text-xs text-red-600">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="email"
                                        className="text-base text-slate-600"
                                    >
                                        E-mail
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="trasition block w-full rounded border border-third p-1 outline-none duration-300 focus:ring-1 focus:ring-secondary"
                                    />
                                    <ErrorMessage name="email">
                                        {(error) => (
                                            <span className="text-xs text-red-600">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="password"
                                        className="text-base text-slate-600"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="block w-full rounded border border-third  p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary"
                                    />
                                    <ErrorMessage name="password">
                                        {(error) => (
                                            <span className="text-xs text-red-600">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="text-base text-slate-600"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="block w-full rounded border border-third  p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary"
                                    />
                                    <ErrorMessage name="confirmPassword">
                                        {(error) => (
                                            <span className="text-xs text-red-600">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="mt-3">
                                    {isLoading ? (
                                        <Spinner className="flex items-center justify-center" />
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="w-full bg-sky-400 py-2 text-white shadow-sm active:bg-sky-600"
                                            disabled={
                                                !props.isValid ||
                                                props.isSubmitting ||
                                                !props.dirty
                                            }
                                        >
                                            Register
                                        </Button>
                                    )}

                                    <p className="mt-6 text-sm font-thin text-slate-400">
                                        Have account?{" "}
                                        <Link
                                            to="/"
                                            className="font-normal text-sky-500"
                                        >
                                            Log in now
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
}

export default Register;
