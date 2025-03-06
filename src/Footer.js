import React from 'react'
import API_BASE_URL from "./config";

const Footer = () => {
    return (
        <div>
            <footer className="bg-white shadow-md dark:bg-gray-900 m-10 rounded-md">
                <div className="w-full max-w-screen-xl mx-auto p-2 md:py-8">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" className="hover:underline">Flagro Rural </a>. Todos os Direitos Reservados.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
