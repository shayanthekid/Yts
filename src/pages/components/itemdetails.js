import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import phoneicon from '../../assets/images/featureicons/phone.png';
import coloricon from '../../assets/images/featureicons/bx-palette.png';
import brandicon from '../../assets/images/featureicons/bxs-badge-check.png';
import makeicon from '../../assets/images/featureicons/bxs-car-wash.png';
import petfriendlyicon from '../../assets/images/featureicons/bxs-cat.png';
import gasicon from '../../assets/images/featureicons/bxs-gas-pump.png';
import parkingicon from '../../assets/images/featureicons/bxs-parking.png';
import transmissionicon from '../../assets/images/featureicons/bx-transfer.png';
import swimmingicon from '../../assets/images/featureicons/swimming.png';

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




import bedicon from '../../assets/images/featureicons/bed.png';
import Calendar from "@demark-pro/react-booking-calendar";
import lottieloadinganimation from '../../assets/images/featureicons/lottie.gif'
import Lottie from 'react-lottie';
import animationData from '../../assets/images/featureicons/loadinganim.json';
import GoogleMapReact from 'google-map-react';
import mapicon from '../../assets/images/featureicons/mapicon.png';


const ItemDetails = () => {
    const location = useLocation();
    const { itemId } = location.state || {};
    const [item, setItem] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [reserved, setReserved] = useState([]);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const [selectedDates, setSelectedDates] = useState([]);
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getitemapi/`, {
                    params: {
                        itemId: itemId,
                    },
                });

                // Assuming the API response contains the item details
                setItem(response.data);
                console.log("item data:", response.data );
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getitembooking?itemId=${itemId}`);

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
    }, [itemId]);
 

    if (!item) {
        return <div className='flex justify-center items-center'>
            <Lottie options={defaultOptions} />
        </div>
    }
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    // <h2>{item[0].title}</h2>
    const imageUrlsArray = item[0].image_urls ? item[0].image_urls.split(',') : [];


    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

    return (
        <div className="max-w-screen-md mx-auto p-4">
            {/* Image Carousel */}
            <Carousel className='h-auto' showThumbs={false}>
                {imageUrlsArray.map((imageUrl, index) => (
                    <div key={index}>
                        <img
                            src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                            alt={`Image ${index}`}
                            className='w-32 h-auto' // Adjust the height as needed
                        />
                    </div>
                ))}
            </Carousel>

            

            {/* Item Details */}
            <div className="mt-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-left">{item[0].title}</h2>
                <div className="flex items-center bg-[#2E3192] p-2 rounded-full">
                    <span className="">
                        {/* Replace the following line with your desired phone icon */}
                        <Link to="/contactus">
                        <img src={phoneicon} alt="Phone Icon" className="w-5 h-5" />
                        </Link>
                    </span>
                </div>
                {/* Phone Icon */}
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
                    T & C
                </button>
            </div>

            {/* Display content based on active tab */}
            <div className="mt-8">
                {activeTab === 'overview' && (
                    <div>
                        {/* Overview content */}
                        <h3 className="text-lg font-bold text-left">
                            {item[0].type === 1 && 'Vehicle Overview'}
                            {item[0].type === 2 && 'Building Overview'}
                            {item[0].type === 3 && 'Rental Overview'}
                        </h3>
                        <p className='text-left'>{item[0].description}</p>

                      

                        <div className="mt-8">
                           


                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                                {item[0].type === 1 && (
                                    <>
                                        {item[0].economic === 1 && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={makeicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Make:</span>
                                                    <span className="ml-2">{item[0].make}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].fuel === 1 && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={gasicon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Fuel:</span>
                                                    <span className="ml-2">{item[0].fuel}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].color === 1 && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={coloricon} alt="Make Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Color:</span>
                                                    <span className="ml-2">{item[0].color}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].sporty === 1 && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={brandicon} alt="Brand Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Brand:</span>
                                                    <span className="ml-2">{item[0].brand}</span>
                                                </div>
                                            </div>
                                        )}

                                        {item[0].brand && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={transmissionicon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Transmission:</span>
                                                    <span className="ml-2">{item[0].transmission}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].Car_Insurance && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={insurance} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Car Insurance</span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].CC && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={CCIcon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">CC</span>
                                                    <span className="ml-2">{item[0].CC}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].Minimum_Days && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={calendaricon} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Minimum Number of Days: </span>
                                                    <span className="ml-2">{item[0].Minimum_Days}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].Kms_Day && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={kms} alt="Transmission Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Kms per day: </span>
                                                    <span className="ml-2">{item[0].Kms_Day}</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {(item[0].type === 2 || item[0].type === 3) && (
                                    <>
                                        {item[0].pet_friendly === 1 && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={petfriendlyicon} alt="Pet Friendly Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Pet Friendly:</span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}

                                        {item[0].parking && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={parkingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Parking:</span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].swimming_pool && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={swimmingicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Swimming Pool</span>
                                                    <span className="ml-2">{item[0].swimming_pool}</span>
                                                </div>
                                            </div>
                                        )}

                                        {item[0].room_no && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={bedicon} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">No. Of Bedrooms: </span>
                                                    <span className="ml-2">{item[0].room_no}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].bathrooms && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={bathroom} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">No. Of Bathrooms: </span>
                                                    <span className="ml-2">{item[0].bathrooms}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].kitchen && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={kitchen} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">No. Of Kitchens: </span>
                                                    <span className="ml-2">{item[0].kitchen}</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].in_house_chef && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={chef} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">In-House Chef </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].dinning_room && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={dining} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Dining Room </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].garden && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={garden} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Garden </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].living_room && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={living} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Living Room </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].washer_dryer && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={washer} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Washer & Dryer </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].bbq_grill && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={bbq} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">BBQ & Grill </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].carrom_board && (
                                            <div className="p-1 w-full ">
                                                <div className="flex items-center">
                                                    <img src={carrom} alt="Parking Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-sm font-bold text-gray-800">Carrom Board </span>
                                                    <span className="ml-2">Yes</span>
                                                </div>
                                            </div>
                                        )}
                                        {item[0].badminton_net && (
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                                {item[0].type === 1 && (
                                    <>
                                        {item[0].economic === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Economic</p>
                                            </div>
                                        )}


                                        {item[0].sporty === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Sporty</p>
                                            </div>
                                        )}

                                        {item[0].brand && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">{item[0].brand}</p>
                                            </div>
                                        )}

                                        {item[0].transmission && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">{item[0].transmission}</p>
                                            </div>
                                        )}
                                        {item[0].extraFeatures && JSON.parse(item[0].extraFeatures).map((feature, index) => (
                                            <div key={index} className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">{feature.value}</p>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {(item[0].type === 2 || item[0].type === 3) && (
                                    <>
                                        {item[0].swimming_pool === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Swimming Pool</p>
                                            </div>
                                        )}

                                        {item[0].modern_style === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Modern Style</p>
                                            </div>
                                        )}

                                        {item[0].patio_space === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Patio Space</p>
                                            </div>
                                        )}

                                        {item[0].pet_friendly === 1 && (
                                            <div className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
                                                <p className="text-sm font-bold text-gray-800">Pet Friendly</p>
                                            </div>
                                        )}
                                        {item[0].extraFeatures && JSON.parse(item[0].extraFeatures).map((feature, index) => (
                                            <div key={index} className="p-1 w-1/2 bg-[#B8B9E0] rounded-md">
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
                        <p>lorem upsum</p>
                    </div>
                )}
            </div>

         
        </div>
    );
};


export default ItemDetails;
