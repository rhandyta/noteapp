import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
                toast.success(`🦄 ${data.message}!`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    dispatch(userLogout());
                    return navigate("/", { replace: true });
                }, 2500);
            });
        } catch (error) {
            toast.error("🦄 Upss, Something went wrong!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    return logout;
}

export default useLogout;
