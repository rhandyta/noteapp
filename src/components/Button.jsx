import React from "react";

function Button({ type = "button", text, className, children, ...props }) {
    return (
        <button
            type={type}
            className={`rounded  bg-sky-400 p-2 text-white shadow-sm active:bg-sky-600 ${className}`}
            {...props}
        >
            {children || text}
        </button>
    );
}

export default Button;
