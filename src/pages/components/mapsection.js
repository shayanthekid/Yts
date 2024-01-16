import React from 'react';

const MapSection = () => {
    return (
        <div className="bg-[#CCE28D] p-4 rounded-md text-center">
            {/* Map Section Content */}
            <p className="text-6xl font-bold">Search in</p>
            <div className="flex items-center justify-around mt-4">
                <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                <button className="bg-[#2E3192] text-white px-8 py-2 rounded-full">View on map</button>
            </div>
        </div>
    );
};

export default MapSection;