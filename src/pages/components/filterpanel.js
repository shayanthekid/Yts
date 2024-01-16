import React from 'react';

const FilterPanel = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            {/* Filter Panel Content */}
            {/* Include Search bar, Date picker, Price range picker, and More button */}
           

            {/* Search Bar */}
            <div className="flex items-center mb-4">
                <div className="relative flex items-center w-full">
                    <span className="absolute left-4 text-gray-500">
                        {/* You can replace the following line with your desired icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {/* Icon code goes here */}
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search Vehicles, Locations"
                        className="rounded-full w-full pl-12 pr-4 py-2 focus:outline-none focus:shadow-outline-blue border border-gray-300 shadow-lg"
                    />
                </div>
            </div>

            {/* Date Picker, Price Range Picker, More Button */}
            <div className="flex items-center">
                {/* Date Picker */}
                <div className="flex items-center mr-4">
                    <p className="mr-2">Availability</p>
                    <span className="text-gray-500">
                        {/* You can replace the following line with your desired icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {/* Icon code goes here */}
                        </svg>
                    </span>
                </div>

                {/* Price Range Picker */}
                <div className="flex items-center mr-4">
                    <p className="mr-2">Price Range</p>
                    <span className="text-gray-500">
                        {/* You can replace the following line with your desired icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {/* Icon code goes here */}
                        </svg>
                    </span>
                </div>

                {/* More Button */}
                <button className="flex items-center">
                    <span className="mr-2">More</span>
                    <span className="text-gray-500">
                        {/* You can replace the following line with your desired icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {/* Icon code goes here */}
                        </svg>
                    </span>
                </button>
            </div>
            
        </div>

    );
};

export default FilterPanel;