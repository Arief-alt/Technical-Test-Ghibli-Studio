import React from 'react'

const Navbar = () => {
    return (
        <nav className="w-full top-0 z-50 sticky glassmorphism border-b border-gray-500 p-6 backdrop-blur-sm">
            <header className="wrapper justify-center flex">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 shadow-md">
                        <span className="font-serif text-white text-2xl font-bold">G</span>
                    </div>

                    <h1 className="title-gradient-text text-2xl font-bold">
                        Ghibli Studio
                    </h1>
                </div>
            </header>
        </nav>
    )
}
export default Navbar
