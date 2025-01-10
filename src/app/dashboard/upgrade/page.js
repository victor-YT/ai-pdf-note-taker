import React from 'react'

function UpgradePlans() {
    return (
        <div>
            <h2 className='font-medium text-2xl'>plans</h2>
            <p> Update your plan to upload multiple pdf to make notes</p>

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                    <div
                        className="rounded-2xl border border-amber-400 p-6 shadow-sm ring-1 ring-amber-400 sm:order-last sm:px-8 lg:p-12"
                    >
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Pro
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <span className="text-lg text-gray-400 line-through">20$</span>
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>

                                <span className="text-sm font-medium text-gray-700">/month</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-amber-400"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> unlimited files upload </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> unlimited AI using </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> Email support </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> Help center access </span>
                            </li>

                        </ul>

                        <a
                            href="#"
                            className="mt-8 block rounded-full border border-amber-400 bg-amber-400 px-12 py-3 text-center text-sm font-medium text-white hover:bg-amber-500 hover:ring-1 hover:ring-amber-500 focus:outline-none focus:ring active:text-amber-400"
                        >
                            Get Started
                        </a>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Starter
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>

                                <span className="text-sm font-medium text-gray-700">/month</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> 100 files upload </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> unlimited AI using </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> Email support </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                                <span className="text-gray-700"> Help center access </span>
                            </li>
                        </ul>

                        <a
                            href="#"
                            className="mt-8 block rounded-full border border-black bg-white px-12 py-3 text-center text-sm font-medium text-black hover:ring-1 hover:ring-black focus:outline-none focus:ring active:text-black"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpgradePlans
