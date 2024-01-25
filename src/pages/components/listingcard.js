import React, { useState, useEffect } from 'react';
import bedicon from '../../assets/images/featureicons/bed.png';
import bathicon from '../../assets/images/featureicons/bath.png';
import phoneicon from '../../assets/images/featureicons/phone.png';
import seatsicon from '../../assets/images/featureicons/seats.png';
import transmissionicon from '../../assets/images/featureicons/transmission.png';
import swimmingicon from '../../assets/images/featureicons/swimming.png';
import { Link } from 'react-router-dom';

const ListingCard = ({ id, image_urls, title, address, price, type, room_no, swimming_pool, transmission, seat_no, is_sold }) => {

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
    const imageUrlsArray = image_urls ? image_urls.split(',') : [];
    const imageSrc = imageUrlsArray.length > 0 ? `https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrlsArray[0]}` : '';

    return (


        <div>

{isDesktop ? (
        //Desktop    
      
                        
                    <div className={`flex gap-4 p-4 bg-white rounded-xl shadow-md ${is_sold ? 'item-sold' : ''}`}>
                    {/* Image */}

                        <img src={imageSrc} alt={imageUrlsArray[0]} className={`w-80 h-auto rounded-xl ${is_sold ? 'grayscale' : 'grayscale-0'}`} />

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                        {/* Price */}
                            {is_sold === null ? (
                                <p className="text-xl text-black text-right font-bold mb-4">{price}</p>

                            ): (
                                <></>
                            )}

                        {/* Title */}
                            {is_sold === null ? (
                                <h3 className="text-lg font-bold text-left p-4">{title}</h3>

                            ): (
                                    <h3 className="text-lg font-bold text-left p-4">This item has been sold. Copy subject to change</h3>


                            )}
                        

                        {/* Address */}
                        <p className="text-sm font-light text-left p-4">{address}</p>
                        

                        <div className="flex items-center justify-end mt-auto">
                            {/* Conditionally render the first icon based on the type */}
                            {type === 1 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with the icon for type 1 */}
                                        <img src={seatsicon} alt="Icon for Type 1" className="w-5 h-5" />
                                    </span>
                                    <span>{seat_no}</span>
                                </div>
                            ) : type === 2 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with the icon for type 2 */}
                                            <img src={swimmingicon} alt="Icon for Type 2" className="w-5 h-5" />
                                    </span>
                                        <span>{swimming_pool}</span>
                                </div>
                            ) : null}

                            {/* Conditionally render the second icon based on the type */}
                            {type === 1 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with another icon for type 1 */}
                                        <img src={transmissionicon} alt="Another Icon for Type 1" className="w-5 h-5" />
                                    </span>
                                    <span>{transmission}</span>
                                </div>
                            ) : type === 2 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with another icon for type 2 */}
                                            <img src={bedicon} alt="Another Icon for Type 2" className="w-5 h-5" />
                                    </span>
                                        <span>{room_no}</span>
                                </div>
                            ) : null}

                            {/* Always render the phone icon */}
                            <div className="flex items-center bg-[#2E3192] p-2 rounded-full">
                                <span className="">
                                    {/* Replace the following line with your desired phone icon */}
                                        <Link to="/contactus">
                                    <img src={phoneicon} alt="Phone Icon" className="w-5 h-5" />
                                    </Link>
                                </span>
                            </div>
                            {/* Add more icon rows as needed */}
                        </div>
                    </div>
                </div>
         
      

      ) : (
        //Mobile
             

                        <div className={`relative overflow-hidden bg-white rounded-xl shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 ${is_sold ? 'item-sold' : ''}`}>
                        {/* Image */}
                    

                            <img src={imageSrc} alt={imageUrlsArray[0]} className={`w-full h-auto ${is_sold ? 'grayscale' : 'grayscale-0'}`} />

                        {/* Title */}
                            {is_sold === null ? (
                                <h3 className="text-sm font-light mt-2 text-left p-4">{title}</h3>

                            ) : (
                                <h3 className="text-lg font-bold text-left p-4">This item has been sold. Copy subject to change</h3>


                            )}
                

                        {/* Address */}
                        <p className="text-sm text-left p-4">{address}</p>

                        {/* Price */}
                            {is_sold === null ? (
                                <p className="text-xl text-black text-left p-4 font-bold">{price}</p>

                            ): (
                                <></>
                                )}

                        {/* Include icons */}

                        {/* Button */}
                        {/* Icons Row */}
                    
                        <div className="flex items-center justify-start">
                            {/* Conditionally render the first icon based on the type */}
                            {type === 1 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with the icon for type 1 */}
                                        <img src={seatsicon} alt="Icon for Type 1" className="w-5 h-5" />
                                    </span>
                                    <span>{seat_no}</span>
                                </div>
                            ) : type === 2 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with the icon for type 2 */}
                                        <img src={swimmingicon} alt="Icon for Type 2" className="w-5 h-5" />
                                    </span>
                                    <span>{swimming_pool}</span>
                                </div>
                            ) : null}

                            {/* Conditionally render the second icon based on the type */}
                            {type === 1 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with another icon for type 1 */}
                                        <img src={transmissionicon} alt="Another Icon for Type 1" className="w-5 h-5" />
                                    </span>
                                    <span>{transmission}</span>
                                </div>
                            ) : type === 2 ? (
                                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                                    <span className="mr-2">
                                        {/* Replace the following line with another icon for type 2 */}
                                        <img src={bedicon} alt="Another Icon for Type 2" className="w-5 h-5" />
                                    </span>
                                    <span>{room_no}</span>
                                </div>
                            ) : null}

                            {/* Always render the phone icon */}
                            <div className="flex items-center ml-auto bg-[#2E3192] p-2 rounded-full">
                                <span className="">
                                    {/* Replace the following line with your desired phone icon */}
                                        <Link to="/contactus">
                                    <img src={phoneicon} alt="Phone Icon" className="w-5 h-5" />
                                        </Link>
                                </span>
                            </div>
                            {/* Add more icon rows as needed */}
                        </div>

                    </div>
                 
      )}

        </div>

       

    );
};

export default ListingCard;