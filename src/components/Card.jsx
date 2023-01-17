import React from "react";

function Card() {
    let words =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam veritatis amet molestias vero dicta, debitis neque facilis quam explicabo.";
    let word =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam esse architecto rerum cum perspiciatis inventore ab, tempora perferendis illo, nisi ut. Rem maiores doloremque quas quod molestiae deleniti enim facilis.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, modi. Reiciendis officia quisquam dolorem fuga cum, voluptatem sit rerum quos est ea adipisci libero consequuntur dignissimos porro, blanditiis dolores id.";
    return (
        <article className="flex flex-col divide-y-2 rounded-md border border-slate-200 p-3 antialiased shadow-md">
            <div className="mb-2">
                <h1 className="whitespace text-xl font-semibold text-slate-700 first-letter:uppercase">
                    {words.slice(0, 25)}...
                </h1>
                <p className=" text-sm font-thin text-slate-400">
                    sunday, january 15, 23
                </p>
            </div>
            <div className="whitespace break-words text-justify font-medium text-primary">
                <p className="py-2">{word.slice(0, 250)}...</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
                <div className="h-6 w-6 rounded-sm bg-slate-400"></div>
            </div>
        </article>
    );
}

export default Card;
