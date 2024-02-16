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
import EnlargedImage from './enlargedimage';

/****************Extra property icons************** */
import bathroom from '../../assets/images/featureicons/bathroom.svg';
import kitchen from '../../assets/images/featureicons/kitchen.svg';
import chef from '../../assets/images/featureicons/chef.svg';
import dining from '../../assets/images/featureicons/dining.svg';
import garden from '../../assets/images/featureicons/garden.svg';
import living from '../../assets/images/featureicons/livingroom.svg';
import washer from '../../assets/images/featureicons/washingmachine.svg';
import bbq from '../../assets/images/featureicons/bbq.svg';
import carrom from '../../assets/images/featureicons/carrom.svg';
import badminton from '../../assets/images/featureicons/badminton.svg';


/****************Extra car icons************** */
import insurance from '../../assets/images/featureicons/insurance.png';
import CCIcon from '../../assets/images/featureicons/engine.png';
import calendaricon from '../../assets/images/featureicons/calander.png';
import kms from '../../assets/images/featureicons/kms.png';



/********************************************* */

const Popup = ({ onClose, data }) => {
    const [loadingPopup, setLoadingPopup] = useState(true);

    const [activeTab, setActiveTab] = useState('overview');
    const [reserved, setReserved] = useState([]);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState(null); // State for the enlarged image URL
    const [isEnlargedImageOpen, setIsEnlargedImageOpen] = useState(false); // State for controlling the modal

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

    // Function to handle opening the modal and setting the enlarged image URL
    const openEnlargedImageModal = (imageUrl) => {
        setEnlargedImageUrl(imageUrl);
        setIsEnlargedImageOpen(true);
    };

    // Function to handle closing the modal
    const closeEnlargedImageModal = () => {
        setIsEnlargedImageOpen(false);
    };

    const imageUrlsArray = data.image_urls ? data.image_urls.split(',') : [];

    return (
            <>
            {/* Check if the EnlargedImage modal should be open */}
            {isEnlargedImageOpen && (
                <EnlargedImage 
                imageUrl={enlargedImageUrl} // Optional: Pass initial image for centered opening
                 imageUrlsArray={imageUrlsArray} // Pass the image data array
                 onClose={closeEnlargedImageModal} />
            )}
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-50" onClick={onClose}></div>
            <button onClick={onClose} className="absolute top-0 -mt-52 right-72 text-white text-6xl z-50" style={popupStyle}>&times;</button>

            <div className="popup z-50 absolute top-0 -mt-40 left-1/2 transform -translate-x-1/2" style={popupStyle}>
             

                <div className="popup-content max-w-screen-lg mx-auto p-4 bg-white rounded-md shadow-md overflow-y-auto  h-[500px] grid grid-cols-2 gap-4">
                {/* Left Column */}
                    <div style={{ overflowY: 'auto', whiteSpace: 'nowrap', maxHeight: '700px' }}>
                        {imageUrlsArray.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                                alt={`Image ${index}`}
                                className='w-full h-auto cursor-pointer' // Adjust the height as needed
                                style={{ marginBottom: '8px' }} // Add some space between images
                                onClick={() => openEnlargedImageModal(`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`)} // Open the modal when clicked
                           
                           
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
                            <button
                                className={`flex-1 p-3 text-center ${activeTab === 'Terms&Conditions' ? 'border-b-2 border-[#2E3192]' : ''}`}
                                onClick={() => setActiveTab('Terms&Conditions')}
                            >
                                T&C
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

                               

                                <div className="mt-8 max-h-full">
                                 


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
                                                    {data.Car_Insurance && (
                                                        <div className="p-1 w-full ">
                                                            <div className="flex items-center">
                                                                <img src={insurance} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                                <span className="text-sm font-bold text-gray-800">Car Insurance</span>
                                                                <span className="ml-2">Yes</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {data.CC && (
                                                        <div className="p-1 w-full ">
                                                            <div className="flex items-center">
                                                                <img src={CCIcon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                                <span className="text-sm font-bold text-gray-800">CC</span>
                                                                <span className="ml-2">{data.CC}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {data.Minimum_Days && (
                                                        <div className="p-1 w-full ">
                                                            <div className="flex items-center">
                                                                <img src={calendaricon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                                <span className="text-sm font-bold text-gray-800">Minimum Number of Days: </span>
                                                                <span className="ml-2">{data.Minimum_Days}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {data.Kms_Day && (
                                                        <div className="p-1 w-full ">
                                                            <div className="flex items-center">
                                                                <img src={kms} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                                <span className="text-sm font-bold text-gray-800">Kms per day: </span>
                                                                <span className="ml-2">{data.Kms_Day}</span>
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
                                                {data.bathrooms && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={bathroom} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">No. Of Bathrooms: </span>
                                                            <span className="ml-2">{data.bathrooms}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.kitchen && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={kitchen} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">No. Of Kitchens: </span>
                                                            <span className="ml-2">{data.kitchen}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.in_house_chef && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={chef} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">In-House Chef </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.dinning_room && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={dining} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Dining Room </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.garden && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={garden} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Garden </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.living_room && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={living} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Living Room </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.washer_dryer && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={washer} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Washer & Dryer </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.bbq_grill && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={bbq} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">BBQ & Grill </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.carrom_board && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={carrom} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Carrom Board </span>
                                                            <span className="ml-2">Yes</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.badminton_net && (
                                                    <div className="p-1 w-full ">
                                                        <div className="flex items-center">
                                                            <img src={badminton} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                            <span className="text-sm font-bold text-gray-800">Badminton Net </span>
                                                            <span className="ml-2">Yes</span>
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
                                                    {data.extraFeatures && JSON.parse(data.extraFeatures).map((feature, index) => (
                                                        <div key={index} className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                            <p className="text-sm font-bold text-gray-800">{feature.value}</p>
                                                        </div>
                                                    ))}
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
                                                    {data.extraFeatures && JSON.parse(data.extraFeatures).map((feature, index) => (
                                                        <div key={index} className="p-1 w-full bg-[#B8B9E0] rounded-md">
                                                            <p className="text-sm font-bold text-gray-800">{feature.value}</p>
                                                        </div>
                                                    ))}
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
                            {activeTab === 'Terms&Conditions' && (
                                <div>
                                    {data.type === 1 && <>
                                    
                                        <div className="max-w-screen-lg mx-auto px-4 py-8">
                                            <h2 className="text-2xl font-bold mb-4">Terms and Conditions:</h2>
                                            <ol className="list-decimal list-inside">
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter agrees to place a REFUNDABLE security deposit a sum agreed between the owner
                                                            and Renter.</strong>
                                                    </div>
                                                    <li className="mb-4">
                                                    <div className="mb-2">
                                                        The renter shall place with the owner the security deposit at the time of signing this
                                                        Agreement and both parties agree that the deposit is refundable within 5 days after the vehicle
                                                        has been returned to the Owner.
                                                    </div>
                                                    </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter shall pay the agreed monthly rental value to the owner upfront on the day of signing
                                                            this agreement.</strong>
                                                    </div>
                                                <li>
                                                    The Renter shall bear responsibility of the said vehicle in case of any theft or unforeseen
                                                    incident occurred during the rental period. Strictly no insurance can be claimed by the renter.
                                                    The Renter must inform the owner of the incident immediately.
                                                </li>
                                        </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Parties agree that the maximum distance the vehicle shall be used per day is 80 Kms (Eighty
                                                            Kilometers) and the Renter shall pay Rs.80 (Eighty Rupees) to the Owner for every additional
                                                            kilometer used by the Renter exceeding the maximum number of distance (Eighty Kilometers)
                                                            allocated per day.</strong>
                                                    </div>
                                                    <li>
                                                    In the event if the vehicle is returned after the expiry or cessation of the Agreement, the Renter
                                                    agrees to keep the Owner informed of such delay and pay a daily charge to the Owner till the
                                                    Vehicle is returned to the Owner.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The parties agree that the quantity of fuel in the fuel tank at the time of this Agreement is
                                                            signed is gauged/ascertained at 50% and the Renter agrees to return the vehicle with 50% of
                                                            fuel tank to the Owner.</strong>
                                                    </div>
<li>
                                                    The Renter shall hold the fullest responsibility of the vehicle described in the Schedule hereto
                                                    during the subsistence of the Agreement and to maintain the vehicle in good condition at all
                                                    material times.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter further agrees to pay the Owner an agreed amount in the event of an accident,
                                                            theft, riot, or any unforeseen incident which may cause damages to the vehicle as compensation
                                                            and the Renter further agrees to indemnify the Owner pertaining to all cost of repairs and/or
                                                            bear all expenses pertaining to such repairs which may be incurred when attending such repairs
                                                            at a reputed repair center nominated by the Owner.</strong>
                                                    </div>
                                                    <li>
                                                    The Renter agrees to pay the market value of the vehicle to the owner in the event the vehicle is
                                                    stolen or gone missing during the subsistence of this Agreement.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Owner agrees to provide a full insurance cover for the vehicle more fully described in the
                                                            Schedule hereto and the Renter shall have no right to claim any compensation from the
                                                            Insurance Company for events described in Clauses 7 and 8.</strong>
                                                    </div>
                                                    <li>
                                                    It is agreed between the parties that the annual premium pertaining to the vehicle described in
                                                    the Schedule hereto shall be paid by the owner to the Insurance Company during the
                                                    subsistence of this Agreement when such amount becomes due.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter shall not employ a person who is under the age of 18 years of age to drive the
                                                            vehicle or employ any person who does not possess a valid driving license or employ any person
                                                            who is under the influence of alcohol or use the vehicle for any illegal or unlawful activities.</strong>
                                                    </div>
                                                    <li>
                                                    The Renter shall take good care of the vehicle more fully described in the Schedule hereto and
                                                    maintain it periodically by effecting periodic services and other incidental repairs/mechanical
                                                    repairs which may occur at the expense of the Renter.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter agrees that in the event if the vehicle described in the Schedule is subjected to any
                                                            legal prosecution or court proceedings the Renter shall take the fullest responsibility and liability
                                                            of the same and defend and absolve the Owner from any legal prosecution/legal proceedings/
                                                            liabilities and pay the Owner an amount fixed at Rs. 30,000 per day till the Owner is discharged
                                                            from any legal proceedings and/or till the vehicle described in the Schedule hereto is discharged
                                                            from the Court in the event if the Vehicle is subjected as a court production.</strong>
                                                    </div>
<li>
                                                    The Renter is prohibited from further hiring or giving the rented vehicle to another party on
                                                    rent. Such act will be considered an offence and a fine will be charged decided by the owner.
                                                </li>
                                                </li>
                                                <li className="mb-4">
                                                    <div className="mb-2">
                                                        <strong>The Renter agrees to pay a monthly rental on a fixed date every month as per the period of
                                                            contract. The owner reserves the right to claim and collect the said vehicle within 7 days if the
                                                            payment has been defaulted by the Renter.</strong>
                                                    </div>
                                                    {/* You can add more terms here if needed */}
                                                </li>
                                            </ol>
                                        </div>
                                    </>}

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
