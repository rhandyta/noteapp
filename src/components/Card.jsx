import HTMLReactParser from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";

import iconSvg from "../utils/constant";

function Card({ title, body, created_at, slug, user }) {
    return (
        <article className="h-75 flex flex-col justify-between divide-y-2 rounded-md border border-slate-200  p-3 antialiased shadow-md transition-all duration-300 hover:scale-105">
            <div className="mb-2 basis-1/12">
                <Link to="#">
                    <h1 className="whitespace break-words text-xl font-semibold text-slate-700 first-letter:uppercase hover:text-slate-500">
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </h1>
                </Link>
                <p className="text-sm font-thin text-slate-500 ">
                    {new Date(created_at).toDateString()} - {user.name}
                </p>
            </div>
            <div className="whitespace basis-9/12 break-words bg-white text-justify font-medium text-primary">
                <div className="py-2">
                    {body.length > 100
                        ? HTMLReactParser(body.slice(0, 100) + "...")
                        : HTMLReactParser(body)}
                </div>
            </div>
            <div className="basis2/12 flex items-center justify-evenly gap-2 px-20 pt-2">
                {iconSvg.map((icon) => {
                    return (
                        <div
                            className={`flex h-7 w-7 items-center justify-center rounded-md p-1 ${icon.bg} group cursor-pointer text-white transition duration-300 hover:scale-90`}
                        >
                            {icon.img}
                        </div>
                    );
                })}
            </div>
        </article>
    );
}

export default Card;
