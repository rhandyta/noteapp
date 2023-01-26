import HTMLReactParser from "html-react-parser";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import iconSvg from "../utils/constant";
import Button from "./Button";

function Card(props) {
    const {
        title,
        body,
        created_at,
        slug,
        user,
        handleDelete,
        auth,
        user_id,
        visible,
        archive,
    } = props;
    const navigate = useNavigate();
    return (
        <article className="h-75 flex flex-col justify-between divide-y-2 rounded-md border border-slate-200  p-3 antialiased shadow-md transition-all duration-300 hover:scale-105">
            <div className="mb-2 basis-1/12">
                <Link to={`/detail/${slug}`}>
                    <h1 className="whitespace break-words text-xl font-semibold text-slate-700 first-letter:uppercase hover:text-slate-500">
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </h1>
                </Link>
                <p className="text-sm font-thin text-slate-500 ">
                    {new Date(created_at).toDateString()} - {user?.name}
                </p>
            </div>
            <div className="whitespace basis-9/12 break-words bg-white text-justify font-medium text-primary">
                <div className="py-2">
                    {body.length > 100
                        ? HTMLReactParser(body.slice(0, 100) + "...")
                        : HTMLReactParser(body)}
                </div>
            </div>
            <div className="flex basis-2/12 items-center justify-evenly gap-2 px-40 pt-2 md:px-20">
                {iconSvg.map((icon, index) =>
                    user_id === auth.user.id ? (
                        <div key={index}>
                            {icon.name == "eye" ? (
                                <Link
                                    to={`/detail/${slug}`}
                                    className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                >
                                    {icon.img}
                                </Link>
                            ) : icon.name === "trash" ? (
                                <Button
                                    className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                    onClick={() => handleDelete(slug)}
                                >
                                    {icon.img}
                                </Button>
                            ) : (
                                icon.name === "edit" && (
                                    <Button
                                        className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                                        onClick={() =>
                                            navigate(`/edit/${slug}`, {
                                                state: {
                                                    title,
                                                    slug,
                                                    body,
                                                    user,
                                                    visible,
                                                    archive,
                                                },
                                            })
                                        }
                                    >
                                        {icon.img}
                                    </Button>
                                )
                            )}
                        </div>
                    ) : (
                        icon.name === "eye" && (
                            <Link
                                key={index}
                                to={`/detail/${slug}`}
                                className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                            >
                                {icon.img}
                            </Link>
                        )
                    )
                )}
            </div>
        </article>
    );
}

export default Card;
