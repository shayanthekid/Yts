import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import lefticon from '../../assets/images/featureicons/arrowleft.svg';
import righticon from '../../assets/images/featureicons/arrowright.svg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
const EnlargedImage = ({ imageUrl, onClose, imageUrlsArray }) => {
    const popupStyle = {
        top: `${window.innerHeight / 3600 + window.scrollY}px`, // Set the top position based on the middle of the viewport
        // ... other styles
    };
    const [maxHeight, setMaxHeight] = useState(600); // Initial max-height value
    useEffect(() => {
        const updateMaxHeight = () => {
            // Determine the maximum height dynamically based on the aspect ratio of the first image
            const firstImage = document.querySelector('.carousel-slider img');
            if (firstImage) {
                const aspectRatio = firstImage.width / firstImage.height;
                setMaxHeight(600 * aspectRatio); // Adjust the base height (600) as needed
            }
        };

        // Call the function initially and add event listener for window resize
        updateMaxHeight();
        window.addEventListener('resize', updateMaxHeight);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);
    const nonEmptyImageUrls = imageUrlsArray.filter((item) => !!item && item.trim() !== '');
    console.log("array:", nonEmptyImageUrls);
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[100] transition-opacity duration-300" >
                <div className="max-w-screen-lg w-full h-[800px] bg-white rounded-lg shadow-lg p-4">
                    {/* Close button */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Carousel */}
                   
                    <Carousel
                        axis="horizontal"
                        showStatus={false}
                        className="relative"
                        renderArrowPrev={(clickHandler, hasPrev) => {
                            return (
                                <div
                                    className={`${hasPrev ? "absolute" : "hidden"
                                        } top-0 bottom-0  left-0 flex justify-center items-center p-3 opacity-95 hover:opacity-100 cursor-pointer z-20`}
                                    onClick={clickHandler}
                                >
                                    <img src={lefticon} alt="Make Icon" className="w-24 h-24 mr-2" /> 

                                </div>
                            );
                        }}
                        renderArrowNext={(clickHandler, hasNext) => {
                            return (
                                <div
                                    className={`${hasNext ? "absolute" : "hidden"
                                        } top-0 bottom-0 right-0  flex justify-center items-center p-3 opacity-95 hover:opacity-100 cursor-pointer z-20`}
                                    onClick={clickHandler}
                                >
                                    <img src={righticon} alt="Make Icon" className="w-24 h-24 mr-2" /> 
                                </div>
                            );
                        }}
                    >
                        {nonEmptyImageUrls.map((imageUrl, index) => {
                            return (
                                <div key={index} style={{ maxHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/*
                Load the image first to determine its dimensions.
                Once loaded, compare width and height to determine if it's portrait or landscape.
            */}
                                    <img
                                        src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                                        alt={`carousel displayed`}
                                        style={{ display: 'none' }} // Hide the image
                                        onLoad={(e) => {
                                            const img = e.target;
                                            const isPortrait = img.naturalHeight > img.naturalWidth;

                                            if (isPortrait) {
                                                img.style.width = '40%'; // Auto-adjust width for portrait images
                                                img.style.height = '40%'; // Set height to fill the container
                                            } else {
                                                img.style.width = '100%'; // Set width to fill the container for landscape images
                                                img.style.height = 'auto'; // Auto-adjust height
                                            }
                                            img.style.display = 'block'; // Show the image after dimensions are adjusted
                                        }}
                                    />
                                </div>
                            );
                        })}

                    </Carousel>

                    {/* Close button (alternative placement) */}
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 m-4 text-white  text-6xl focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
            </div>
        );
    };

    export default EnlargedImage;