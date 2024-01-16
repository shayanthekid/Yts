import React from 'react';
import bedicon from '../../assets/images/featureicons/bed.png';
import bathicon from '../../assets/images/featureicons/bath.png';
import phoneicon from '../../assets/images/featureicons/phone.png';

const ListingCard = ({ imageURL, title, address, price }) => {
    return (
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            {/* Image */}
            <img src={imageURL} alt={title} className="w-full h-auto" />

            {/* Title */}
            <h3 className="text-sm font-light mt-2 text-left p-4">{title}</h3>

            {/* Address */}
            <p className="text-sm text-left p-4">{address}</p>

            {/* Price */}
            <p className="text-xl text-black text-left p-4 font-bold">{price}</p>

            {/* Include icons */}

            {/* Button */}
            {/* Icons Row */}
            <div className="flex items-center justify-start">
                <div className="flex items-center mr-4 bg-[#B7B8E8] p-2 rounded-xl">
                    <span className="mr-2 ">
                        {/* Replace the following line with your desired icon */}
                        <img src={bedicon} alt="Bed Icon" className="w-5 h-5" />

                    </span>
                    <span>3</span>
                </div>

                <div className="flex items-center mr-4  bg-[#B7B8E8] p-2 rounded-xl" >
                    <span className="mr-2">
                        {/* Replace the following line with your desired icon */}
                        <img src={bathicon} alt="Bath Icon" className="w-5 h-5" />

                    </span>
                    <span>4</span>
                </div>

                <div className="flex items-center ml-auto bg-[#2E3192] p-2 rounded-full">
                    <span className="">
                        {/* Replace the following line with your desired icon */}
                        <img src={phoneicon} alt="New Icon" className="w-5 h-5" />
                    </span>
                </div>
                {/* Add more icon rows as needed */}
            </div>
        </div>

    );
};

export default ListingCard;