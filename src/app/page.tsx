import React from 'react'
import Image from 'next/image'

const Page = () => {
    const generateYears = (startYear: number, endYear: number) => {
        const years = [];
        for (let year = endYear; year >= startYear; year--) {
            years.push(year);
        }
        return years;
    };
    const GHIBLI_START_YEAR = 1984;
    const CURRENT_YEAR = new Date().getFullYear();
    const availableYears = generateYears(GHIBLI_START_YEAR, CURRENT_YEAR);

    return (
        <main className="pt-40 wrapper pb-40">
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
                            >
                                <option className="bg-black text-white" value="All Years">All Years</option>

                                {availableYears.map((year) => (
                                    <option className="bg-black text-white" key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <div className="pr-2">
                                <Image
                                    src="/arrow-down.png"
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
                                    src="/arrow-down.png"
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
                        8 films found
                    </span>
                </div>
            </section>
        </main>
    )
}
export default Page
