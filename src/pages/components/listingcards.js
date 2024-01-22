import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ListingCard from './listingcard';

const ListingCards = ({ type }) => {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();
    const cardRefmobile = useRef(null);
    const cardRefdesk = useRef(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [data, setData] = useState([]);

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
                setData(parsedResult);
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

    console.log(data);
    // Check if data is an array before filtering
    const filteredData = Array.isArray(data) ? data.filter(item => item.type === type) : [];
    console.log(filteredData);
    return (
        <div>
            {isDesktop ? (
                <div className="grid grid-cols-1 gap-2 p-4" ref={cardRefdesk}>
                    {filteredData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 p-4" ref={cardRefmobile}>
                    {filteredData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListingCards;
