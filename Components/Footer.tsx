import React from 'react'

const Footer = () => {
    return (
        <nav className="w-full p-6 glassmorphism border-t border-gray-500">
            <header className="wrapper justify-center flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 shadow-md"/>

                    <h1 className="title-gradient-text text-2xl font-bold">
                        Studio Ghibli Collection
                    </h1>
                </div>

                <span className="text-gray-400 text-center">
                    Celebrating the magical storytelling and artistry of Hayao Miyazaki and Studio Ghibli.
                </span>

                <span className="text-gray-500 text-xs mt-2">
                    &copy; {new Date().getFullYear()} Ghibli Studio Fan App. All rights reserved.
                </span>
            </header>
        </nav>
    )
}
export default Footer
