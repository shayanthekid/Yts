import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
    const location = useLocation();
    const { itemId } = location.state || {};
    const [item, setItem] = useState(null);

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
    // <h2>{item[0].title}</h2>
    const imageUrlsArray = item[0].image_urls ? item[0].image_urls.split(',') : [];
    const imageSrc = imageUrlsArray.length > 0 ? `https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrlsArray[0]}` : '';

    return (
        <div className="max-w-screen-md mx-auto p-4">
            {/* Image Carousel */}
            <div className="relative">
                {/* Left Arrow */}
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white">
                    &lt;
                </button>

                {/* Image */}
                <img src={imageSrc} alt={item[0].title} className="w-full h-auto rounded-lg" />

                {/* Right Arrow */}
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white">
                    &gt;
                </button>
            </div>

            {/* Item Details */}
            <div className="mt-4">
                <h2 className="text-2xl font-bold">{item[0].title}</h2>
                {/* Add other item details here */}
            </div>
        </div>
    );
};

export default ItemDetails;
