import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingButton = () => {
    const [isHelpVisible, setIsHelpVisible] = useState(true);

    const closeHelpMessage = () => {
        setIsHelpVisible(false);
    };

    return (
        <div className="fixed bottom-20 right-5 flex flex-col items-center">
            {isHelpVisible && (
                <div className="mb-2 p-2 bg-blue-200 text-black rounded-md shadow-md flex items-center">
                    <span className="font-bold">Precisa de ajuda?</span>
                    <button onClick={closeHelpMessage} className="ml-2 text-sm font-bold text-red-600">x</button>
                </div>
            )}
            <button
                onClick={() => window.location.href = 'https://wa.me/your_number'} // Substitua 'your_number' pelo número do WhatsApp
                className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
            >
                <FaWhatsapp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default FloatingButton;
