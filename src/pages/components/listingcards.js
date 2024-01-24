import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ListingCard from './listingcard';

const ListingCards = ({ type, data }) => {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();
    const cardRefmobile = useRef(null);
    const cardRefdesk = useRef(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [data2, setData2] = useState([]);

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
            } catch (error) {
                console.error('Error fetching data:', error);
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

        // If there is no search input, return true (no filtering applied)
        if (!searchInput && !dateRange && !priceRange) {
            return true;
        }

        // Check if the search input matches the title (case insensitive)
        const searchMatch = (
            !searchInput || item.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Check if the item's date falls within the specified date range
        // ... (you can add date filtering logic here if needed)

        // Check if the item's price falls within the specified price range
        const priceMatch = (
            !priceRange || (item.price >= priceRange.min && item.price <= priceRange.max)
        );

        // Return true if any of the conditions match
        return searchMatch || priceMatch;
    });


    return (
        <div>
            {isDesktop ? (
                <div className="grid grid-cols-1 gap-2 p-4" ref={cardRefdesk}>
                    {dynamicFilteredData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 p-4" ref={cardRefmobile}>
                        {dynamicFilteredData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default ListingCards;
