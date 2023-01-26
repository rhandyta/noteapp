import { Formik, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import useLogin from "../hooks/useLogin";

function Login() {
    const login = useLogin();
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object({
        email: yup.string().email().required().trim(),
        password: yup.string().required().min(3),
    });

    const onSubmit = async (values, props) => {
        setIsLoading(true);
        await login(values.email, values.password);
        setIsLoading(false);
    };
    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-slate-700">
                    Welcome to App Notes
                </h2>
                <p className="text-base font-medium text-slate-600">
                    Let's login to be continue
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
                                            Login
                                        </Button>
                                    )}

                                    <p className="mt-6 text-sm font-thin text-slate-400">
                                        Don't have account?{" "}
                                        <Link
                                            to="/register"
                                            className="font-normal text-sky-500"
                                        >
                                            Register now
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

export default Login;
