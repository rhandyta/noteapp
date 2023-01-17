import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import useLogin from "../hooks/useLogin";

function Login() {
    const login = useLogin();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object({
        email: yup.string().email().required().trim(),
        password: yup.string().required().min(3),
    });

    const onSubmit = async (values, props) => {
        await login(values.email, values.password);
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-slate-700">
                    Welcome to App Notes
                </h2>
                <p className="text-md text-lg font-medium text-slate-600">
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
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="trasition block w-full rounded border border-four p-1 outline-none duration-300 focus:ring-1 focus:ring-secondary"
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
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="block w-full rounded border border-four p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary"
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
                                    <button
                                        type="submit"
                                        className="block w-full rounded  bg-sky-400 py-2 text-white shadow-sm active:bg-sky-600"
                                    >
                                        Login
                                    </button>
                                    <p className="mt-2 text-sm font-thin text-slate-400">
                                        Don't have account?{" "}
                                        <a
                                            href="#"
                                            className="font-normal text-sky-500"
                                        >
                                            Register now
                                        </a>
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
