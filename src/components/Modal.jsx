import { Form, Formik, ErrorMessage } from "formik";

import React from "react";
import Input from "./Input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "./Button";

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    validationSchema,
}) => {
    return (
        <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className={`h-modal fixed top-0 left-0 right-0 z-50 ${
                isOpen ? "block" : "hidden"
            } flex w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full`}
        >
            <div className={`relative h-full w-full max-w-2xl md:h-auto`}>
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button
                            type="button"
                            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                            onClick={() => onClose()}
                        >
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

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
                                                        Title
                                                    </label>
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
                                                        data=""
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
                                                        onBlur={(
                                                            event,
                                                            editor
                                                        ) => {
                                                            // console.log(
                                                            //     "Blur.",
                                                            //     editor
                                                            // );
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
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-2 flex flex-row items-center gap-5">
                                                <div className="flex items-center">
                                                    <Input
                                                        id="default-checkbox"
                                                        type="checkbox"
                                                        name="visible"
                                                        value="1"
                                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                    />
                                                    <label
                                                        htmlFor="default-checkbox"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Invisible
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        id="checked-checkbox"
                                                        type="checkbox"
                                                        name="archive"
                                                        value="1"
                                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                    />
                                                    <label
                                                        htmlFor="checked-checkbox"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Archive
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                        <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                                            <Button
                                                data-modal-hide="defaultModal"
                                                type="submit"
                                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                I accept
                                            </Button>
                                            <Button
                                                onClick={() => onClose()}
                                                data-modal-hide="defaultModal"
                                                type="button"
                                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                                            >
                                                Decline
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
