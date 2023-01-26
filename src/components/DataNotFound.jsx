import React from "react";
import { Link } from "react-router-dom";

function DataNotFound() {
    return (
        <div className="my-10 flex flex-col items-center">
            <p className="text-2xl font-semibold leading-relaxed text-primary antialiased ">
                Data not found.
            </p>
            <Link to="/" className="text-thin text-sky-500 hover:text-sky-600">
                More
            </Link>
        </div>
    );
}

export default DataNotFound;
