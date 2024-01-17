import React, { useState, useEffect } from 'react';
import bookingimg from '../../assets/images/bookingimg.png';
;


const MapSection = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

<div>
            {isDesktop ? (
                //Desktop
                <div className="relative w-20vw mx-16 my-10 overflow-hidden rounded-md">
                    {/* Image */}
                    <img src={bookingimg} alt="Search Image" className="w-full h-full object-cover rounded-md" />

                    {/* Overlay Text */}
                    <div className="absolute top-0 left-0 p-8 text-white">
                        <p className="text-6xl font-bold">Search in</p>
                        <div className="flex items-center mt-4">
                            <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                        </div>
                    </div>
                </div>


            ) : (
                //Mobile
                    <div className = "bg-[#CCE28D] p-4 rounded-md text-center">
                {/* Map Section Content */ }
                <p className="text-6xl font-bold">Search in</p>
            <div className="flex items-center justify-around mt-4">
                <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                <button className="bg-[#2E3192] text-white px-8 py-2 rounded-full">View on map</button>
            </div>
        </div>

            )}

        
</div>

        
        
    );
};

export default MapSection;