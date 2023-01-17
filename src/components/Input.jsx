import { Field } from "formik";

const Input = ({ type = "text", ...props }) => {
    return (
        <Field
            className="block w-full rounded border border-third  p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary"
            {...props}
            type={type}
        />
    );
};
export default Input;
