import { Field } from "formik";

const Input = ({ type = "text", className, ...props }) => {
    return (
        <Field
            className={`rounded border border-third  p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary ${className}`}
            {...props}
            type={type}
        />
    );
};
export default Input;
