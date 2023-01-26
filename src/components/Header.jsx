import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from "./Button";
import Spinner from "./Spinner";
import Toast from "./Toast";

function Header() {
    const [isLoading, setIsLoading] = useState(false);
    const logout = useLogout();
    const auth = useSelector((state) => state.user);
    const url = useLocation();

    const handlerLogout = async () => {
        setIsLoading(true);
        await logout(auth.type, auth.token);
        setIsLoading(false);
    };
    return (
        <>
            <Toast />
            <header
                className="mx-auto mt-10 flex h-20 w-11/12 items-center justify-between rounded-md bg-white p-3 shadow-md md:w-9/12 
        "
            >
                <Link
                    to={"/"}
                    className="pointer flex items-center justify-center gap-1"
                >
                    <div className="h-8 w-8 rounded-md md:h-10 md:w-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </div>

                    <div className="mt-1 flex h-8 items-center">
                        <h1 className="text-xl font-semibold text-primary md:text-2xl  md:font-bold ">
                            Notes App
                        </h1>
                    </div>
                </Link>

                {URL.pathname == "/" && "/register" ? (
                    <div className="flex gap-1">
                        <NavLink
                            to={"/dashboard"}
                            className={`group rounded-md border border-slate-300 bg-slate-100 py-1 px-2 text-xs font-semibold text-sky-600 shadow-sm transition duration-300 hover:scale-95 hover:bg-slate-50 md:text-base`}
                        >
                            <p className="group-hover:text-sky-400">
                                Dashboard
                            </p>
                        </NavLink>
                        <NavLink
                            to={"/archive"}
                            className={`group rounded-md border border-slate-300 bg-slate-100 py-1 px-2 text-xs font-semibold text-sky-600 shadow-sm transition duration-300 hover:scale-95 hover:bg-slate-50 md:text-base`}
                        >
                            <p className="group-hover:text-sky-400">Archive</p>
                        </NavLink>
                    </div>
                ) : null}

                <div className="flex items-center justify-center gap-3">
                    {/* <div className="h-8 w-8 rounded-md bg-sky-400 shadow-md"></div>
                    <div className="h-8 w-8 rounded-md bg-sky-400 shadow-md"></div> */}
                    {auth.user && (
                        <div className="flex items-center gap-1">
                            <h3 className="font-base text-xl text-primary ">
                                {auth.user.name}
                            </h3>
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                <Button
                                    className="rounded"
                                    onClick={handlerLogout}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6 rotate-180 md:h-8 md:w-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
