import Header from "./components/Header";
import SetupRoutes from "./routes/SetupRoutes";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumbs from "./components/BreadCrumbs";
import { useLocation } from "react-router-dom";
function App() {
    let location = useLocation();
    return (
        <main className="flex min-h-screen  w-full flex-col bg-four">
            <Header />
            {location.pathname != "/" && location.pathname != "/register" ? (
                <BreadCrumbs />
            ) : null}
            <div className="mx-auto mt-5 w-11/12 rounded-md bg-white p-5 shadow-md md:w-9/12">
                <SetupRoutes />
            </div>
        </main>
    );
}

export default App;
