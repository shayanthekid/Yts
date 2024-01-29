import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';
import carLogo from '../../assets/images/ytsrentacar.png'; // Replace with the path to your car logo

const MobileNavbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const getLogo = () => {
        // Check if the current route is /listingcar
        if (location.pathname === '/listingcar') {
            return carLogo;
        }
        // Default logo for other routes
        return bookingimg;
    };

    return (
        <div className={`${location.pathname !== '/home' ? 'relative bg-[#CCE28D]' : 'absolute'} p-4 z-50`}>
            <div className="flex items-center justify-between z-10">
                {/* Hamburger Icon */}
                <div className="cursor-pointer z-10" onClick={toggleDrawer}>
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

                {/* Logo (Centered) */}
                <Link to="/" className="flex-grow text-center" onClick={closeDrawer}>
                    <img src={getLogo()} alt="Your Logo" className="h-auto w-24 mx-auto ml-24" />
                </Link>
            </div>

            {/* Drawer Menu */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-200 p-4 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300`}
            >
                <Link to="/home" className="block text-black py-2 text-left mt-6" onClick={closeDrawer}>
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
