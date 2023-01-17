import React from "react";

function Login() {
    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-slate-700">
                    Welcome to App Notes
                </h2>
                <p className="text-md text-lg font-medium text-slate-600">
                    Let's login to be continue
                </p>
            </div>

            <div className="mt-5">
                <div className="">
                    <label htmlFor="email" className="text-base text-slate-600">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="trasition block w-full rounded border border-four p-1 outline-none duration-300 focus:ring-1 focus:ring-secondary"
                    />
                </div>
                <div className="mt-3">
                    <label
                        htmlFor="password"
                        className="text-base text-slate-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full rounded border border-four p-1 outline-none transition duration-300 focus:ring-1 focus:ring-secondary"
                    />
                </div>
                <div className="mt-3">
                    <button
                        type="submit"
                        className="block w-full rounded  bg-sky-400 py-2 text-white shadow-sm active:bg-sky-600"
                    >
                        Login
                    </button>
                    <p className="mt-2 text-sm font-thin text-slate-400">
                        Don't have account?{" "}
                        <a href="#" className="font-normal text-sky-500">
                            Register now
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
