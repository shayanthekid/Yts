import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ListingCard from './listingcard';
import lottieloadinganimation from '../../assets/images/featureicons/lottie.gif'
import Popup from './popupitem'; // Import the Popup component
import Lottie from 'react-lottie';
import animationData from '../../assets/images/featureicons/loadinganim.json';
const ListingCards = ({ type, data }) => {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();
    const cardRefmobile = useRef(null);
    const cardRefdesk = useRef(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [popupData, setPopupData] = useState(null);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const handleCardClick = (item) => {
        console.log('Before setPopupData');
        setPopupData(item);
        console.log('After setPopupData');
    };

    // useEffect(() => {
    //     console.log('Before scrolling');
    //     // Scroll to the top of the page to center the popup
    //     setTimeout(() => {
    //         window.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: 'smooth',
    //         });
    //     }, 50);
    //     console.log('After scrolling');
    // }, [popupData]);
    const handlePopupClose = () => {
        // Close the popup by resetting the data
        setPopupData(null);
    };
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getallitems/');
                const result = await response.json();

                // Parse the JSON string in the body property
                const parsedResult = JSON.parse(result.body);
                setData2(parsedResult);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const tl1 = gsap.timeline();
        tl1.fromTo(
            cardRefmobile.current,
            { opacity: 0 },
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power3.out" }
        );
    }, [location.pathname]);

    // Check if data is an array before filtering
    const filteredData2 = Array.isArray(data2) ? data2.filter(item => item.type === type) : [];
    console.log(filteredData2);
    // Apply additional filters based on the search input and selected dates
    const dynamicFilteredData = filteredData2.filter(item => {
        // Check if the search input and date range are available
        const searchData = data || [];
        const searchInput = searchData[0];
        const dateRange = searchData[1];
        const priceRange = searchData[2];
        console.log("search input", searchInput);
        console.log("price range" , priceRange);
        // If there is no search input, return true (no filtering applied)
        if (!searchInput && !dateRange && !priceRange) {
            return true;
        }

        // Check if the search input matches the title (case insensitive)
        const searchMatch = (
            !searchInput || item.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Convert priceRange to an array of one element (the object), or use an empty array if it's falsy
        const priceRangeArray = priceRange ? [priceRange] : [];

        // Check if the item's price falls within any of the specified price ranges
        const priceMatch = (
            priceRangeArray.length === 0 ||
  
            priceRangeArray.some(range => (item.price >= range.min && item.price <= range.max))
        );

    console.log("price match", priceMatch);
        // Return true if any of the conditions match
        return searchMatch && priceMatch;
    });


    return (
        <div>
            {loading ? ( // Show loading message or spinner
            <div className='flex justify-center items-center'>
            
                <Lottie options={defaultOptions}  />

                </div>
            ) : (
                <>
                    {isDesktop ? (
                            <div className="grid grid-cols-1 gap-2 p-4 overflow-y-auto" ref={cardRefdesk}>
                            {dynamicFilteredData.map((item) => (
                                <div key={item.id} onClick={() => handleCardClick(item)}>
                                    <ListingCard {...item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4 p-4" ref={cardRefmobile}>
                            {dynamicFilteredData.map((item) => (
                                <Link to={`/item/${item.id}`} state={{ itemId: item.id }}>
                                <ListingCard key={item.id} {...item} />
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
            {popupData && (
                <Popup onClose={handlePopupClose} data={popupData} />
            )}
        </div>
    );
};


export default ListingCards;
