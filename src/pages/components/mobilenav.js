import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';
import carLogo from '../../assets/images/ytsrentacar.png'; // Replace with the path to your car logo
import axios from 'axios';

const MobileNavbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const [logo, setLogo] = useState(bookingimg); // Initial state is the default logo
    const { itemId } = useParams(); // Add this line to get the itemId from the route params

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        const getLogo = async () => {
            if (location.pathname === '/listingcar') {
                setLogo(carLogo);
            } else if (location.pathname.startsWith('/item/')) {
                const itemroute = location.pathname;
                const itemId = itemroute.split('/item/')[1];

                try {
                    const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getitemapi/`, {
                        params: {
                            itemId: itemId,
                        },
                    });

                    const item = response.data[0];

                    if (item.type === 1) {
                        setLogo(carLogo);
                    } else {
                        setLogo(bookingimg);
                    }
                } catch (error) {
                    console.error('Error fetching item details:', error);
                    // Set default logo in case of an error
                    setLogo(bookingimg);
                }
            } else {
                setLogo(bookingimg); // Default logo for other routes
            }
        };

        getLogo();
    }, [location.pathname, itemId]);
    
    // Conditionally render based on the route
    if (location.pathname === '/') {
        // Don't render MobileNavbar for the ConstructionRoute
        return null;
    }

    return (
        <div className={`${location.pathname !== '/home' ? 'relative bg-[#CCE28D]' : 'absolute'} p-4 z-50`}>
            <div className="flex items-center justify-between z-10">
                {/* Hamburger Icon */}
                <div className="cursor-pointer z-10" onClick={toggleDrawer}>
                    <div className="bg-[#2E3192] rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-white z-10"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                </div>


                {/* Logo (Centered) */}
                <Link to="/" className="flex-grow text-center" onClick={closeDrawer}>
                    <img src={logo} alt="Your Logo" className="h-auto w-24 mx-auto ml-24" />
                </Link>
            </div>

            {/* Drawer Menu */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-200 p-4 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300`}
            >
                <Link to="/home" className="block text-black py-2 text-left mt-12" onClick={closeDrawer}>
                    Home
                </Link>
                <Link to="/listingcar" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
                    Cars
                </Link>
                <Link to="/listingproperty" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
                    Property
                </Link>
                <Link to="/listingvacation" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
                    Vacation Rentals
                </Link>
                <Link to="/about" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
                    About Us
                </Link>
                <Link to="/contactus" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
                    Contact Us
                </Link>
            </div>
        </div>
    );
};

export default MobileNavbar;
