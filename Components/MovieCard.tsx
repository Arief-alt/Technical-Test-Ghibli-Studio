import React from 'react'
import Image from "next/image";

const MovieCard = ({image, rating, title, subtitle, description, director, producer, year, runtime}: MediaItem) => {
    return (
        <article
            className="hover-shadow-sweep hover:scale-105 mt-4 max-w-sm h-full flex flex-col rounded-lg overflow-hidden bg-dark border border-gray-600 shadow-lg fade-in-up"
        >
            <div className="relative w-full h-48 bg-cover bg-center"
                 style={{
                     backgroundImage: `url(${image || '/images/default.jpg'})`
                 }}
            >
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Image
                        src="/icons/star.png"
                        alt="star"
                        width={12}
                        height={12}
                    />
                    <p>{rating}%</p>
                </div>
            </div>

            <section className="flex flex-col gap-4 p-6 flex-grow">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-white">
                        {title}
                    </h1>

                    <span className="text-gray-400">
                        {subtitle}
                    </span>
                </div>

                <p className="text-gray-300 text-left">
                    {description}
                </p>

                <section className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h1 className="gray-gradient-text text-md">
                            Director:
                        </h1>

                        <span className="text-gray-200 text-md">
                            {(director?.split(',')[0] || '').trim()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="gray-gradient-text text-md">
                            Producer:
                        </h1>

                        <span className="text-gray-200 text-md">
                            {(producer?.split(',')[0] || '').trim()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="gray-gradient-text text-md">
                            Year:
                        </h1>

                        <span className="text-gray-200 text-md">
                            {year}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="gray-gradient-text text-md">
                            Runtime:
                        </h1>

                        <span className="text-gray-200 text-md">
                            {runtime} min
                        </span>
                    </div>
                </section>

            </section>

            <div className="px-6 pb-4">
                <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sleek-white w-full flex border border-gray-500 button-background justify-center px-4 py-2 rounded-md items-center gap-2"
                >
                    <h1 className="text-md text-white">Learn More</h1>
                </a>
            </div>
        </article>
    )
}
export default MovieCard
