import { Link, useLocation } from "react-router-dom";

function BreadCrumbs() {
    const url = useLocation();
    return (
        <nav
            className="bpx-5 mx-auto flex w-11/12 items-center rounded-lg pt-5 text-gray-700 md:w-9/12"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
                    >
                        <svg
                            aria-hidden="true"
                            className="mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        Dashboard
                    </Link>
                </li>
                <li>
                    {url.pathname == "/dashboard" ? (
                        <div className="flex items-center">
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <Link
                                href="#"
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600  md:ml-2"
                            >
                                Active Notes
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <Link
                                href="#"
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600  md:ml-2"
                            >
                                Archive Notes
                            </Link>
                        </div>
                    )}
                </li>
            </ol>
        </nav>
    );
}

export default BreadCrumbs;
