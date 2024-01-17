import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//this component will be responsible for rendering the cards based on the fetched data.
import ListingCard from './listingcard';

const ListingCards = ({ type }) => {
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
        // Cars
        {
            id: 1,
            title: 'Luxury Car Rental 1',
            type: 1, // Car
            imageURL: 'https://www.bmw.in/content/dam/bmw/common/topics/fascination-bmw/bmw-luxury-class/bmw-gklplus-onepager-x8-cp-xxl.jpg',
            address: '123 Main St, Cityville',
            price: '$100/day',
        },
        {
            id: 2,
            title: 'Luxury Car Rental 2',
            type: 1, // Car
            imageURL: 'https://resources.stuff.co.nz/content/dam/images/1/c/k/l/i/2/image.related.StuffLandscapeSixteenByNine.710x400.1ckl06.png/1467164599856.jpg?format=pjpg&optimize=medium',
            address: '456 Oak St, Townsville',
            price: '$120/day',
        },
        {
            id: 3,
            title: 'Economy Car Rental',
            type: 1, // Car
            imageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Suzuki_Alto_800_GL_2011.jpg',
            address: '789 Pine St, Villagetown',
            price: '$80/day',
        },

        // Properties
        {
            id: 4,
            title: 'Modern Apartment 1',
            type: 2, // Property
            imageURL: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU',
            address: '101 Elm St, Suburbia',
            price: '$200/night',
        },
        {
            id: 5,
            title: 'Cozy Cottage',
            type: 2, // Property
            imageURL: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg',
            address: '202 Cedar St, Countryside',
            price: '$150/night',
        },
        {
            id: 6,
            title: 'Luxury Condo',
            type: 2, // Property
            imageURL: 'https://www.bhg.com/thmb/dgy0b4w_W0oUJUxc7M4w3H4AyDo=/1866x0/filters:no_upscale():strip_icc()/living-room-gallery-shelves-l-shaped-couch-ELeyNpyyqpZ8hosOG3EG1X-b5a39646574544e8a75f2961332cd89a.jpg',
            address: '303 Oak St, Uptown',
            price: '$250/night',
        },

        // Vacation Rentals
        {
            id: 7,
            title: 'Beachfront Villa',
            type: 3, // Vacation Rental
            imageURL: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/31099036.jpg?k=780939816cef238c892bcbe17a64dacbfc236d6e5c0536043be9fcf122584c89&o=&hp=1',
            address: 'Ocean Drive, Seaside',
            price: '$300/night',
        },
        {
            id: 8,
            title: 'Mountain Cabin',
            type: 3, // Vacation Rental
            imageURL: 'https://www.theluxurybali.com/wp-content/uploads/2014/12/Villa-Bayu-Gita-Beachfront-Pool-and-deck-1-660x440.jpg',
            address: 'Mountain View, Summit',
            price: '$180/night',
        },
        {
            id: 9,
            title: 'Lakehouse Retreat',
            type: 3, // Vacation Rental
            imageURL: 'https://assets.cntraveller.in/photos/60ba18db8c5b530e1212763e/4:3/w_1600,h_1200,c_limit/Beach-villa-2-st-regis-maldives.jpg',
            address: 'Lakefront, Waterside',
            price: '$220/night',
        },
    ];

    const filteredData = fetchedData.filter(item => item.type === type);


    return (

        <div>

      {isDesktop ? (
        //Desktop    
                <div className="grid grid-cols-1 gap-2 p-4" ref={cardRefdesk}>
                    {/* Map the fetched data to ListingCard components */}
                    {filteredData.map((item) => (
                        <ListingCard key={item.id} {...item} />
                    ))}
                </div>

      ) : (
        //Mobile
                    <div className="flex flex-wrap gap-4 p-4" ref={cardRefmobile}>
                        {/* Map the fetched data to ListingCard components */}
                        {filteredData.map((item) => (
                            <ListingCard key={item.id} {...item} />
                        ))}

                    </div>
      )}


        </div>
     
    );
};

export default ListingCards;