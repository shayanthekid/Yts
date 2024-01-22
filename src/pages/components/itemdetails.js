import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import bedicon from '../../assets/images/featureicons/bed.png';

const ItemDetails = () => {
    const location = useLocation();
    const { itemId } = location.state || {};
    const [item, setItem] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

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
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    // ...

    if (!item) {
        return <p>Loading...</p>;
    }
    console.log(item);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    // <h2>{item[0].title}</h2>
    const imageUrlsArray = item[0].image_urls ? item[0].image_urls.split(',') : [];

    return (
        <div className="max-w-screen-md mx-auto p-4">
            {/* Image Carousel */}
            <Carousel showThumbs={false}>
                {imageUrlsArray.map((imageUrl, index) => (
                    <div key={index}>
                        <img
                            src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                            alt={`Image ${index}`}
                            style={{ height: '300px' }} // Adjust the height as needed
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
                        <img src={phoneicon} alt="Phone Icon" className="w-5 h-5" />
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
                    className={`flex-1 p-3 text-center ${activeTab === 'location' ? 'border-b-2 border-[#2E3192]' : ''}`}
                    onClick={() => setActiveTab('location')}
                >
                    Location
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
                                </>
                            )}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-left">
                                Features
                            </h3>


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
                                    </>
                                )}

                                {item[0].type === 2 && (
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
                                    </>
                                )}

                                {item[0].type === 3 && (
                                    <>
                                        {/* Add features for type 3 if needed */}
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
                                    </>
                                )}

                                {item[0].type === 2 && (
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
                                    </>
                                )}

                                {item[0].type === 3 && (
                                    <>
                                        {/* Add features for type 3 if needed */}
                                    </>
                                )}
                            </div>



                        </div>
                    </div>
                )}
                {activeTab === 'location' && (
                    <div>
                        {/* Location content */}
                        <p>Location content goes here.</p>
                    </div>
                )}
            </div>

         
        </div>
    );
};


export default ItemDetails;
