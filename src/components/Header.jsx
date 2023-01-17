import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header
            className="mx-auto mt-10 flex h-20 w-9/12 items-center justify-between rounded-md bg-white p-3 shadow-md 
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

                <h1 className="mt-1 h-8 text-xl font-semibold text-primary md:text-2xl md:font-bold ">
                    Notes App
                </h1>
            </Link>
            <div className="flex items-center justify-center gap-3">
                <div className="h-8 w-8 rounded-md bg-sky-400 shadow-md"></div>
                <div className="h-8 w-8 rounded-md bg-sky-400 shadow-md"></div>
            </div>
        </header>
    );
}

export default Header;
