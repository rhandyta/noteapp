import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { toastError, toastSuccess } from "../components/Toast";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Edit() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useLocation();
    const initialValues = {
        title: state.title,
        body: state.body,
        visible: state.visible,
        archive: state.archive,
        slug: state.slug,
    };

    const validationSchema = yup.object({
        title: yup.string().min(5).max(150).required().trim(),
    });

    const onSubmit = async (values, props) => {
        try {
            const data = {
                slug: state.slug,
                title: values.title,
                body: values.body,
                visible: parseInt(values.visible),
                archive: parseInt(values.archive),
            };
            setIsLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}notes/${state.slug}`, {
                method: "PATCH",
                headers: {
                    Authorization: `${auth.type} ${auth.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "http://noteapp.test/",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(data),
            })
                .then(async (res) => {
                    let resp = await res.json();
                    toastSuccess(resp.message);
                    setIsLoading(false);
                    return navigate("/archive", { replace: true });
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
            <div>
                <div className="space-y-6 p-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(props) => {
                            return (
                                <Form>
                                    <>
                                        <div className="grid md:grid-cols-1 md:gap-6">
                                            <div className="group relative z-0 mb-6 w-full">
                                                <Input
                                                    name="title"
                                                    id="title"
                                                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                                    placeholder=" "
                                                    required
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                                >
                                                    Title{" "}
                                                    <span className="text-xs font-thin text-red-600">
                                                        *
                                                    </span>
                                                </label>
                                                <ErrorMessage name="title">
                                                    {(error) => (
                                                        <span className="text-xs text-red-600">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="grid h-64 md:grid-cols-1 md:gap-6">
                                            <div className="group relative z-0 mx-auto mb-6 w-11/12 md:w-full">
                                                <CKEditor
                                                    onReady={(editor) => {
                                                        // You can store the "editor" and use when it is needed.
                                                        // console.log("Editor is ready to use!", editor);
                                                        editor.editing.view.change(
                                                            (writer) => {
                                                                writer.setStyle(
                                                                    "height",
                                                                    "200px",
                                                                    editor.editing.view.document.getRoot()
                                                                );
                                                            }
                                                        );
                                                    }}
                                                    editor={ClassicEditor}
                                                    data={initialValues.body}
                                                    onChange={(
                                                        event,
                                                        editor
                                                    ) => {
                                                        const data =
                                                            editor.getData();
                                                        props.setFieldValue(
                                                            "body",
                                                            data
                                                        );
                                                        // console.log({
                                                        //     event,
                                                        //     editor,
                                                        //     data,
                                                        // });
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log(
                                                        //     "Blur.",
                                                        //     editor
                                                        // );
                                                        // console.log(event);
                                                        props.setFieldTouched(
                                                            "body",
                                                            true
                                                        );
                                                    }}
                                                    onFocus={(
                                                        event,
                                                        editor
                                                    ) => {
                                                        // console.log(
                                                        //     "Focus.",
                                                        //     editor
                                                        // );
                                                    }}
                                                    name="body"
                                                    id="body"
                                                    className="peer block min-h-full w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                                    placeholder=" "
                                                />
                                                <ErrorMessage name="body">
                                                    {(error) => (
                                                        <span className="text-xs text-red-600">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="mb-2 flex flex-row items-center gap-5">
                                            <div className="flex flex-col items-center">
                                                {/* <Input
                                                    id="visible"
                                                    type="radio"
                                                    name="visible"
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                /> */}

                                                {/* <label
                                                    htmlFor="visible"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Invisible
                                                </label> */}
                                                {/* 
                                                <label
                                                    for="visible"
                                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Invisible
                                                </label> */}
                                                <Input
                                                    as="select"
                                                    id="visible"
                                                    name="visible"
                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                >
                                                    <option
                                                        defaultValue=""
                                                        disabled
                                                    >
                                                        Choose a visible
                                                    </option>
                                                    <option
                                                        value="0"
                                                        selected={
                                                            initialValues.visible ==
                                                            0
                                                                ? "selected"
                                                                : null
                                                        }
                                                    >
                                                        Visible
                                                    </option>
                                                    <option
                                                        value="1"
                                                        selected={
                                                            initialValues.visible ==
                                                            0
                                                                ? "selected"
                                                                : null
                                                        }
                                                    >
                                                        Invisible
                                                    </option>
                                                </Input>
                                            </div>
                                            <div className="flex items-center">
                                                {/* <Input
                                                    id="archive"
                                                    type="radio"
                                                    name="archive"
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                /> */}
                                                {/* <label
                                                    htmlFor="archive"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Archive
                                                </label> */}
                                                <Input
                                                    as="select"
                                                    id="archive"
                                                    name="archive"
                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                >
                                                    <option
                                                        defaultValue=""
                                                        disabled
                                                    >
                                                        Choose a archive
                                                    </option>
                                                    <option
                                                        value="0"
                                                        selected={
                                                            initialValues.archive ==
                                                            0
                                                                ? "selected"
                                                                : null
                                                        }
                                                    >
                                                        Publish
                                                    </option>
                                                    <option
                                                        value="1"
                                                        selected={
                                                            initialValues.archive ==
                                                            0
                                                                ? "selected"
                                                                : null
                                                        }
                                                    >
                                                        Archive
                                                    </option>
                                                </Input>
                                            </div>
                                        </div>
                                    </>
                                    <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 py-3 dark:border-gray-600">
                                        {isLoading ? (
                                            <Spinner />
                                        ) : (
                                            <Button
                                                data-modal-hide="defaultModal"
                                                type="submit"
                                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                disabled={
                                                    !props.isValid ||
                                                    props.isSubmitting ||
                                                    !props.dirty
                                                }
                                            >
                                                Update
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => navigate(-1)}
                                            data-modal-hide="defaultModal"
                                            type="button"
                                            className="rounded-lg border border-gray-200 bg-yellow-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-700 hover:text-white focus:z-10 focus:outline-none  active:bg-white active:text-black dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Edit;
