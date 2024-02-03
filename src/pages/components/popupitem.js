import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Calendar from "@demark-pro/react-booking-calendar";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import phoneicon from '../../assets/images/featureicons/phone.png';
import coloricon from '../../assets/images/featureicons/bx-palette.png';
import brandicon from '../../assets/images/featureicons/bxs-badge-check.png';
import makeicon from '../../assets/images/featureicons/bxs-car-wash.png';
import petfriendlyicon from '../../assets/images/featureicons/bxs-cat.png';
import gasicon from '../../assets/images/featureicons/bxs-gas-pump.png';
import parkingicon from '../../assets/images/featureicons/bxs-parking.png';
import transmissionicon from '../../assets/images/featureicons/bx-transfer.png';
import swimmingicon from '../../assets/images/featureicons/swimming.png';
import bedicon from '../../assets/images/featureicons/bed.png';
import lottieloadinganimation from '../../assets/images/featureicons/lottie.gif'


const Popup = ({ onClose, data }) => {
    const [loadingPopup, setLoadingPopup] = useState(true);

    const [activeTab, setActiveTab] = useState('overview');
    const [reserved, setReserved] = useState([]);
    const popupStyle = {
        top: `${window.innerHeight / 3600 + window.scrollY}px`, // Set the top position based on the middle of the viewport
        // ... other styles
    };

    const [selectedDates, setSelectedDates] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = data.id;
                const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getitembooking?itemId=${id}`);

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
    }, []);

    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

    // useEffect(() => {
    //     // Scroll to the top of the page when the Popup mounts
    //     setTimeout(() => {
    //         window.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: 'smooth',
    //         });
    //     }, 50);
    // }, []); 
    const imageUrlsArray = data.image_urls ? data.image_urls.split(',') : [];

    return (
            <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-50" onClick={onClose}></div>
            <button onClick={onClose} className="absolute top-0 -mt-52 right-80 text-white text-6xl z-50" style={popupStyle}>&times;</button>

            <div className="popup z-50 absolute top-0 -mt-40 left-1/2 transform -translate-x-1/2" style={popupStyle}>
             

                <div className="popup-content max-w-screen-lg mx-auto p-4 bg-white rounded-md shadow-md overflow-y-auto h-[500px] grid grid-cols-2 gap-4">
                {/* Left Column */}
                    <div style={{ overflowY: 'auto', whiteSpace: 'nowrap', maxHeight: '500px' }}>
                        {imageUrlsArray.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                                alt={`Image ${index}`}
                                className='w-full h-auto' // Adjust the height as needed
                                style={{ marginBottom: '8px' }} // Add some space between images
                            />
                        ))}
                    </div>



                {/* Right Column */}
                <div>
                    {/* Item Details */}
                    <div className="mt-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-left">{data.title}</h2>
                        <div className="flex items-center bg-[#2E3192] p-2 rounded-full">
                            <span className="">
                                {/* Replace the following line with your desired phone icon */}
                                <Link to="/contactus">
                                    <img src={phoneicon} alt="Phone Icon" className="w-5 h-5" />
                                </Link>
                            </span>
                        </div>
                       
                     
                    </div>
                  
                    {/* Tabs */}
                    <div className="mt-4 flex">
                        <button
                            className={`flex-1 p-3 text-center ${activeTab === 'overview' ? 'border-b-2 border-[#2E3192]' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`flex-1 p-3 text-center ${activeTab === 'features' ? 'border-b-2 border-[#2E3192]' : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Features
                        </button>

                        <button
                            className={`flex-1 p-3 text-center ${activeTab === 'Availability' ? 'border-b-2 border-[#2E3192]' : ''}`}
                            onClick={() => setActiveTab('Availability')}
                        >
                            Availability
                        </button>
                    </div>
                    {/* Display content based on active tab */}
                    {/* Display content based on active tab */}
                    <div className="mt-8">
                        {activeTab === 'overview' && (
                            <div>
                                {/* Overview content */}
                                <h3 className="text-lg font-bold text-left">
                                    {data.type === 1 && 'Vehicle Overview'}
                                    {data.type === 2 && 'Building Overview'}
                                    {data.type === 3 && 'Rental Overview'}
                                </h3>
                                <p className='text-left'>{data.description}</p>

                                {/* Colored Boxes Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
                                    {data.type === 1 && (
                                        <>
                                            {data.economic === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Economic</p>
                                                </div>
                                            )}


                                            {data.sporty === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Sporty</p>
                                                </div>
                                            )}

                                            {data.brand && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">{data.brand}</p>
                                                </div>
                                            )}

                                            {data.transmission && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">{data.transmission}</p>
                                                </div>
                                            )}

                                        </>
                                    )}

                                    {(data.type === 2 || data.type === 3) && (
                                        <>
                                            {data.swimming_pool === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Swimming Pool</p>
                                                </div>
                                            )}

                                            {data.modern_style === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Modern Style</p>
                                                </div>
                                            )}

                                            {data.patio_space === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Patio Space</p>
                                                </div>
                                            )}

                                            {data.pet_friendly === 1 && (
                                                <div className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                    <p className="text-sm font-bold text-gray-800">Pet Friendly</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-8 max-h-full">
                                    <h3 className="text-lg font-bold text-left">
                                        Features
                                    </h3>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 mt-8">
                                        {data.type === 1 && (
                                            <>
                                                {data.economic === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={makeicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Make:</span>
                                                            <span className="ml-2">{data.make}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.fuel === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={gasicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Fuel:</span>
                                                            <span className="ml-2">{data.fuel}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.color === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={coloricon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Color:</span>
                                                            <span className="ml-2">{data.color}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.sporty === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={brandicon} alt="Brand Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Brand:</span>
                                                            <span className="ml-2">{data.brand}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.brand && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={transmissionicon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Transmission:</span>
                                                            <span className="ml-2">{data.transmission}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                            {(data.type === 2 || data.type === 3) && (                                            <>
                                                {data.pet_friendly === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={petfriendlyicon} alt="Pet Friendly Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Pet Friendly:</span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.parking && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={parkingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Parking:</span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.swimming_pool && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={swimmingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Swimming Pool</span>
                                                            <span className="ml-2">{data.swimming_pool}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.room_no && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={bedicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">No. Of Bedrooms: </span>
                                                            <span className="ml-2">{data.room_no}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                       
                                    </div>


                                </div>


                            </div>
                        )}
                        {activeTab === 'features' && (
                            <div>
                                {/* Features content */}

                                <div className="mt-8">
                                    <h3 className="text-lg font-bold text-left">
                                        Features
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-1 mt-8">
                                        {data.type === 1 && (
                                            <>
                                                {data.economic === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={makeicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Make:</span>
                                                            <span className="ml-2">{data.make}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.fuel === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={gasicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Fuel:</span>
                                                            <span className="ml-2">{data.fuel}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.color === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={coloricon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Color:</span>
                                                            <span className="ml-2">{data.color}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.sporty === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={brandicon} alt="Brand Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Brand:</span>
                                                            <span className="ml-2">{data.brand}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.brand && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={transmissionicon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Transmission:</span>
                                                            <span className="ml-2">{data.transmission}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                            {(data.type === 2 || data.type === 3) && (
                                            <>
                                                {data.pet_friendly === 1 && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={petfriendlyicon} alt="Pet Friendly Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Pet Friendly:</span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.parking && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={parkingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Parking:</span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.swimming_pool && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={swimmingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Swimming Pool</span>
                                                            <span className="ml-2">{data.swimming_pool}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.room_no && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={bedicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">No. Of Bedrooms: </span>
                                                            <span className="ml-2">{data.room_no}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                    </div>



                                </div>
                            </div>
                        )}

                        {activeTab === 'Availability' && (
                            <div>
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Popup;
