'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import {MovieCard, NotFound} from "../../Components"
import { useQuery } from '@tanstack/react-query';

const fetchFilms = async () => {
    const res = await fetch('https://ghibliapi.vercel.app/films');
    if (!res.ok) throw new Error('Failed to fetch films');
    return res.json();
};

const generateYears = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }
    return years;
};

const Page = () => {
    const { data: films = [], isLoading, error } = useQuery({
        queryKey: ['films'],
        queryFn: fetchFilms,
    });

    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedDirector, setSelectedDirector] = useState('All');

    const filteredFilms = films.filter((film: any) => {
        const matchYear = selectedYear === 'All' || film.release_date === selectedYear;
        const matchDirector = selectedDirector === 'All' || film.director === selectedDirector;
        return matchYear && matchDirector;
    });


    const GHIBLI_START_YEAR = 1984;
    const CURRENT_YEAR = new Date().getFullYear();
    const availableYears = generateYears(GHIBLI_START_YEAR, CURRENT_YEAR);

    return (
        <main className="pt-20 wrapper pb-40">
            <header className="text-center items-center flex flex-col gap-4 fade-in-up">
                <h1 className="title-gradient-text font-bold text-4xl animate-float">
                    Studio Ghibli
                </h1>
                <span className="gray-gradient-text text-[20px]">
                    Discover the magical world of Studio Ghibli films. From spirited adventures to enchanting tales, explore the timeless masterpieces that have captured hearts around the world.
                </span>
            </header>

            <div className="pt-5 flex justify-center fade-in-up">
                <div className="w-48 h-1.5 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mt-4"/>
            </div>

            <section className="gap-3 mt-15 p-5 rounded-lg border border-gray-500 bg-dark shadow-md fade-in-up">
                <h1 className="blue-gradient-text text-2xl font-bold">
                    Filter Movies
                </h1>

                <section className="pt-5 flex-col gap-4 grid md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-gray-300 text-lg">
                            Release Year
                        </h1>

                        <div className="flex items-center w-full px-4 py-2 bg-black border border-gray-600 rounded-lg">
                            <select
                                className="text-white bg-black w-full outline-none appearance-none cursor-pointer"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option className="bg-black text-white" value="All">All Years</option>

                                {availableYears.map((year) => (
                                    <option className="bg-black text-white" key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <div className="pr-2">
                                <Image
                                    src="/icons/arrow-down.png"
                                    alt="arrow down"
                                    width={17}
                                    height={17}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col gap-2 w-full">
                        <h1 className="text-gray-300 text-lg">
                            Directors
                        </h1>

                        <div className="flex items-center w-full px-4 py-2 bg-black border border-gray-600 rounded-lg">
                            <select
                                className="text-white bg-black w-full outline-none appearance-none cursor-pointer"
                                value={selectedDirector}
                                onChange={(e) => setSelectedDirector(e.target.value)}
                            >
                                <option className="bg-black text-white" value="All">All Directors</option>
                                <option className="bg-black text-white" value="Hayao Miyazaki">Hayao Miyazaki</option>
                                <option className="bg-black text-white" value="Isao Takahata">Isao Takahata</option>
                                <option className="bg-black text-white" value="Gorō Miyazaki">Gorō Miyazaki</option>
                                <option className="bg-black text-white" value="Hiroyuki Morita">Hiroyuki Morita</option>
                                <option className="bg-black text-white" value="Hiromasa Yonebayashi">Hiromasa Yonebayashi</option>
                            </select>

                            <div className="pr-2">
                                <Image
                                    src="/icons/arrow-down.png"
                                    alt="arrow down"
                                    width={17}
                                    height={17}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => {
                            setSelectedYear("All");
                            setSelectedDirector("All");
                        }}
                        className="cursor-pointer text-sm text-gray-400 hover:text-gray-100 transition-colors duration-200"
                    >
                        Clear all filters
                    </button>

                </div>
            </section>

            <section className="pt-5 flex flex-col fade-in-up">
                <div className="flex justify-between">
                    <h1 className="blue-gradient-text text-2xl font-bold">
                        Ghibli Collection
                    </h1>

                    <span className="text-gray-300 text-md">
                      {filteredFilms.length} {filteredFilms.length === 1 ? 'film' : 'films'} found
                    </span>
                </div>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:justify-center items-stretch justify-items-center">
            {isLoading ? (
                    <p className="pt-20 col-span-full fade-in-up">Loading...</p>
                ) : error ? (
                    <p className="pt-20 col-span-full text-red-500">Failed to fetch films.</p>
                ) : filteredFilms.length === 0 ? (
                    <div className="pt-20 col-span-full">
                        <NotFound />
                    </div>
                ) : (
                    filteredFilms.map((film: any) => (
                        <MovieCard
                            key={film.id}
                            image={film.image}
                            rating={parseInt(film.rt_score)}
                            title={film.title}
                            subtitle={film.original_title}
                            description={film.description}
                            director={film.director}
                            producer={film.producer}
                            year={parseInt(film.release_date)}
                            runtime={parseInt(film.running_time)}
                        />
                    ))
                )}
            </section>
        </main>
    )
}
export default Page
