import React from 'react';
import { Link } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';

function Footer() {
    return (
        <div className="bg-gray-200 p-4 text-center">
            {/* Navigation Heading */}
          

            {/* Logo */}
            <img src={bookingimg} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-4 text-left">Navigation</h2>
            {/* Links */}
            <div className="flex flex-col items-start">
                <Link to="/home" className="text-black py-2 px-4 font-light">
                    Home
                </Link>
                <Link to="/listingcar" className="text-black py-2 px-4 font-light">
                    Cars
                </Link>
                <Link to="/listingproperty" className="text-black py-2 px-4 font-light">
                    Property
                </Link>
                <Link to="/listingvacation" className="text-black py-2 px-4 font-light">
                    Vacation Rentals
                </Link>
            </div>
        </div>
    );
}

export default Footer;
