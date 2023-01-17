import React from "react";

function Button({ type = "button", children, ...props }) {
    return (
        <button
            type={type}
            className={`w-full rounded  bg-sky-400 py-2 text-white shadow-sm active:bg-sky-600`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
