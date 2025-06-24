import React from 'react'
import Image from "next/image";

const NotFound = () => {
    return (
        <article className="justify-center items-center flex flex-col fade-in-up gap-4">
            <div className="relative w-[100px] h-[100px]">
                <Image
                    src="/icons/search.png"
                    alt="Not Found"
                    width={100}
                    height={100}
                />
            </div>

            <h1 className="text-center text-2xl text-white">
                Movie Not Found
            </h1>
        </article>
    )
}
export default NotFound
