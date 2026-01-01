import React from 'react'

const Navbar = () => {
    return (
        <nav className="block  w-full px-4 py-2 mx-auto text-white bg-slate-900 shadow-md  lg:px-8 lg:py-3 ">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-gray-100">
                <div className="flex items-center select-none">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        <a href="/">
                            <span className="text-white">pass</span>
                            <span className="italic bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                Shush
                            </span>
                        </a>
                    </h1>

                    {/* shush dot */}
                    <span className="ml-2 text-purple-400 text-xl animate-pulse">•</span>
                </div>
                <div className=" lg:block">
                    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center p-1 text-l gap-x-2 text-gray-200">
                            <a href="/" className="flex items-center hover:cursor-pointer transition-all duration-200 hover:text-xl">
                                Home
                            </a>
                        </li>
                        <li className="flex items-center p-1 text-l gap-x-2 text-gray-200">
                            <a href="/about" className="flex items-center hover:cursor-pointer transition-all duration-200 hover:text-xl">
                                About
                            </a>
                        </li>
                        <li className="flex items-center p-1 text-l gap-x-2 text-gray-200">
                            <a href="/contact" className="flex items-center hover:cursor-pointer transition-all duration-200 hover:text-xl">
                                Contact
                            </a>
                        </li>
                        <li className="flex items-center p-1 text-l gap-x-2 text-gray-200">
                            <a href="https://github.com/" target='_blank' className="flex items-center ">
                                <button className='bg-purple-600 w-30 h-10 flex p-2 rounded-2xl  items-center hover:cursor-pointer transition-transform duration-200 hover:scale-120 text-black font-bold'><img className='h-8 w-8 pr-0.5' src="/github.png"></img>Github</button>
                            </a>
                        </li>
                    </ul>
                </div>
                <button
                    className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                    type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
