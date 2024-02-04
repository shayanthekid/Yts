import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';
import carLogo from '../../assets/images/ytsrentacar.png';

function Footer() {
    const location = useLocation();

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

    const getLogo = () => {
        if (location.pathname === '/listingcar') {
            return carLogo;
        }
        return bookingimg;
    };
    if (location.pathname === '/') {
        // Don't render Footer for the ConstructionRoute
        return null;
    }
    return (

<>
  {isDesktop ? (
                // Desktop
              
                <div className={`bg-gray-200 p-4 text-center relative bottom-0 ${location.pathname !== '/home' ? 'mt-96' : 'mt-20'}`}>

                    <img src={getLogo()} alt="Logo" className="h-8 w-auto mx-auto mb-4" />
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
                        <Link to="/contactus" className="text-black py-2 px-4 font-light">
                           Contact Us
                        </Link>
                        <Link to="/about" className="text-black py-2 px-4 font-light">
                           About us
                        </Link>
                        </div>
                    </div >
               
            ) : (
                // Mobile
                    <div className = "bg-gray-200 p-4 text-center">
            
                        <img src={getLogo()} alt = "Logo" className = "h-8 w-auto mx-auto mb-4" />
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
                <Link to="/contactus" className="text-black py-2 px-4 font-light">
                    Contact Us
                </Link>
                <Link to="/about" className="text-black py-2 px-4 font-light">
                About us
                </Link>
            </div>
        </div >
            )}
</>

       
    );
}

export default Footer;
