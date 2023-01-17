import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../components/Toast";
import { userLogout } from "../features/userSlice";

function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async (type, token) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}logout`, {
                method: "POST",
                headers: {
                    Accept: "Application/json",
                    "Content-Type": "application/json",
                    Authorization: `${type} ${token}`,
                },
            }).then(async (res) => {
                let data = await res.json();
                toastSuccess(data.message);
                dispatch(userLogout());
                return navigate("/", { replace: true });
            });
        } catch (error) {
            toastError();
        }
    };
    return logout;
}

export default useLogout;
