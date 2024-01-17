import React, { useState } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";
import settingsicon from '../../assets/images/featureicons/settings.png';
import dropdownicon from '../../assets/images/featureicons/drop.png';
import searchicon from '../../assets/images/featureicons/search.png';

const FilterPanel = () => {
    const reserved = [
        {
            startDate: new Date(2024, 0, 28),
            endDate: new Date(2024, 1, 10),
        },
    ];
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);

    const handleAvailabilityClick = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md ">
            {/* Filter Panel Content */}
            {/* Include Search bar, Date picker, Price range picker, and More button */}

            {/* Search Bar */}
            <div className="flex items-center mb-4">
                <div className="relative flex items-center w-full">
                    <span className="absolute left-4 text-gray-500">
                        {/* You can replace the following line with your desired icon */}
                      
                        <img src={searchicon} alt="Bath Icon" className="w-5 h-5" />

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
                <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between" onClick={handleAvailabilityClick}>
                    <p className="text-center font-normal">Availability</p>
                    <img src={dropdownicon} alt="Bath Icon" className="w-4 h-2 ml-2" />
                    
                </div>

                {/* Price Range Picker */}
                {/* <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between">
                    <p className="text-center font-normal">Price Range</p>
                    <img src={dropdownicon} alt="Bath Icon" className="w-4 h-2 ml-2" />

                </div> */}

                {/* More Button */}
                <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between">
                    <p className="text-center font-normal">More</p>
                    <img src={settingsicon} alt="Bath Icon" className="w-4 h-4 ml-2" />

                </div>
            </div>

            {/* Show Date Picker if Availability is clicked */}
            {isDatePickerOpen && (
                <div className="mt-4">
                    <Calendar
                        selected={selectedDates}
                        onChange={handleChange}
                        onOverbook={(e, err) => alert(err)}
                        disabled={(date, state) => !state.isSameMonth}
                        reserved={reserved}
                        range={true}
                        dateFnsOptions={{ weekStartsOn: 1 }}
                    />
                </div>
            )}
        </div>
    );
};


export default FilterPanel;