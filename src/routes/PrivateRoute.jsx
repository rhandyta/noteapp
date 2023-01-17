import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const auth = useSelector((state) => state.user);
    return auth.user ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
