import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//this component will be responsible for rendering the cards based on the fetched data.
import ListingCard from './listingcard';

const ListingCards = () => {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();

    const cardRefmobile = useRef(null);
    const cardRefdesk = useRef(null);



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

    useEffect(() => {
        const tl1 = gsap.timeline();
        tl1.fromTo(
            cardRefmobile.current,
            { opacity: 0 }, // Start values
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power3.out" } // End values
        );

    }, [location.pathname]);

    // Fetch data from the database and map it to individual card components
    const fetchedData = [
        {
            id: 1,
            title: 'Luxury Car Rental',
            imageURL:
             'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg'
         ,
            address: '123 Main St, Cityville',
            price: '$100/day',
        },
        {
            id: 2,
            title: 'Modern Apartment',
            imageURL: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU',
            address: '456 Oak St, Townsville',
            price: '$200/night',
        },
        // Add more dummy data items as needed
    ];

    return (

        <div>

      {isDesktop ? (
        //Desktop    
                <div className="grid grid-cols-1 gap-2 p-4" ref={cardRefdesk}>
                    {/* Map the fetched data to ListingCard components */}
                    {fetchedData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>

      ) : (
        //Mobile
                    <div className="flex flex-wrap gap-4 p-4" ref={cardRefmobile}>
                        {/* Map the fetched data to ListingCard components */}
                        {fetchedData.map((item) => (
                            <ListingCard key={item.id} {...item} />
                        ))}

                    </div>
      )}


        </div>
     
    );
};

export default ListingCards;