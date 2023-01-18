import React from "react";

function Skeleton() {
    return (
        <article className="flex h-full max-w-sm animate-pulse flex-col justify-between divide-y-2 rounded-md border border-slate-200 p-3 antialiased shadow-md transition-all duration-300 hover:scale-105">
            <div className="mb-2 flex basis-1/12 items-center justify-start">
                <h1 className="whitespace h-2.5 w-48 rounded-full bg-gray-200 text-xl font-semibold text-slate-700 first-letter:uppercase hover:text-slate-500 dark:bg-gray-700"></h1>
            </div>
            <div className="whitespace basis-9/12 break-words text-justify font-medium text-primary">
                <div className="mb-3 mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="basis2/12 flex items-center justify-end gap-2 pt-2">
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
            </div>
        </article>
    );
}

export default Skeleton;
