import React from 'react';

const EnlargedImage = ({ imageUrl, onClose }) => {
    const popupStyle = {
        top: `${window.innerHeight / 3600 + window.scrollY}px`, // Set the top position based on the middle of the viewport
        // ... other styles
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[100] transition-opacity duration-300" onClick={onClose} >
            
            <div className="max-w-screen-lg w-full h-[800px] bg-white rounded-lg shadow-lg p-4">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Enlarged image */}
                <img src={imageUrl} alt="imageUrl" className="h-full w-full object-contain " />
            </div>
            <button
                onClick={onClose}
                className="absolute top-0 right-0 m-4 text-white  text-6xl focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};

export default EnlargedImage;
