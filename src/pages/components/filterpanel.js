import React, { useState, useEffect } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";
import settingsicon from '../../assets/images/featureicons/settings.png';
import dropdownicon from '../../assets/images/featureicons/drop.png';
import searchicon from '../../assets/images/featureicons/search.png';
import ListingCards from './listingcards';
import axios from 'axios';

const FilterPanel = ({ type, onFilterChange, filteredData }) => {
    const [reserved, setReserved] = useState([]);

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [searchInput, setSearchInput] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Adjust the initial range as needed
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getallbookingtype?type=${type}`);

                // Log the response data
                console.log(response.data);

                const bookings = response.data.bookings;

                if (bookings.length > 0) {
                    // Create the reserved array directly from API response
                    const newReserved = bookings.map(booking => ({
                        startDate: new Date(booking.startdate),
                        endDate: new Date(booking.enddate),
                    }));

                    // Update the state
                    setReserved(newReserved);
                } else {
                    // No bookings, set reserved to an empty array
                    setReserved([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [type]); // Fetch data whenever the type changes


   
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleAvailabilityClick = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleChange = (dates) => {
        setSelectedDates(dates);
        onFilterChange(searchInput, dates);

    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        // Notify the parent component (Listingcar) about the filter change
        onFilterChange(e.target.value, selectedDates, priceRange);
    };

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setPriceRange({ ...priceRange, [e.target.name]: value });
        onFilterChange(searchInput, selectedDates, { ...priceRange, [e.target.name]: value });

    };
    return (
        <div>

            {isDesktop ? (
                //Desktop
                <div className="flex w-full absolute  h-screen  -mt-72">
                    <div className="bg-gray-100 p-4 rounded-xl shadow-md w-1/2 ml-32 ">
                        {/* Search Bar */}
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-gray-500">
                                <img src={searchicon} alt="Search Icon" className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search Vehicles"
                                value={searchInput}
                                onChange={handleSearchChange}
                                className="rounded-full w-full pl-12 pr-4 py-2 focus:outline-none focus:shadow-outline-blue border border-gray-300 shadow-lg"
                            />
                        </div>

                        {/* Date Picker */}
                        <div className="flex items-center mt-4">
                            <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between" onClick={handleAvailabilityClick}>
                                <p className="text-center font-normal">Availability</p>
                                <img src={dropdownicon} alt="Dropdown Icon" className="w-4 h-2 ml-2" />
                            </div>

                            {/* Price Range Picker */}
                            {/* Add your Price Range Picker here */}

                            {/* More Button */}
                            <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between">
                                <p className="text-center font-normal">Price Range</p>
                                <input
                                    type="number"
                                    name="min"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={handlePriceChange}
                                    className="w-16 h-8 ml-2 text-center rounded border border-gray-300 focus:outline-none focus:shadow-outline-blue"
                                />
                                <span className="mx-2">to</span>
                                <input
                                    type="number"
                                    name="max"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={handlePriceChange}
                                    className="w-16 h-8 ml-2 text-center rounded border border-gray-300 focus:outline-none focus:shadow-outline-blue"
                                />
                            </div>
                            {/* <div className="flex items-center mr-4 bg-white rounded-full shadow-md px-4 py-2 justify-between">
                                <p className="text-center font-normal">Type</p>
                                <img src={dropdownicon} alt="Settings Icon" className="w-4 h-2 ml-2" />
                            </div> */}

                        </div>

                        {/* Show Date Picker if Availability is clicked */}
                        {isDatePickerOpen && (
                            <div className="mt-4">
                                <Calendar
                                    selected={selectedDates}
                                    onChange={handleChange}
                                    onOverbook={(e, err) => alert(err)}
                                   
                                    reserved={reserved}
                                    range={true}
                                    dateFnsOptions={{ weekStartsOn: 1 }}
                                />
                            </div>
                        )}
                        <div>
                            {/* Listing Cards */}
                            <ListingCards type={type} data={filteredData} />
                        </div>
                    </div>

                </div>

            ) : (
                //Mobile
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
                                value={searchInput}
                                onChange={handleSearchChange}
                                placeholder="Search by name"
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
                            <p className="text-center font-normal">Price Range</p>
                            <input
                                type="number"
                                name="min"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={handlePriceChange}
                                className="w-16 h-8 ml-2 text-center rounded border border-gray-300 focus:outline-none focus:shadow-outline-blue"
                            />
                            <span className="mx-2">to</span>
                            <input
                                type="number"
                                name="max"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={handlePriceChange}
                                className="w-16 h-8 ml-2 text-center rounded border border-gray-300 focus:outline-none focus:shadow-outline-blue"
                            />
                        </div>
                    </div>

                    {/* Show Date Picker if Availability is clicked */}
                    {isDatePickerOpen && (
                        <div className="mt-4">
                            <Calendar
                                selected={selectedDates}
                                onChange={handleChange}
                                onOverbook={(e, err) => alert(err)}
                            
                                reserved={reserved}
                                range={true}
                                dateFnsOptions={{ weekStartsOn: 1 }}
                            />
                        </div>

                    )}


                </div>


            )}
        </div>
    );
};


export default FilterPanel;