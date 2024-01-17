import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';

function Footer() {
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
    return (

<>
  {isDesktop ? (
                // Desktop
              
                    <div className="bg-gray-200 p-4 text-center relative bottom-0 mt-96">

                        <img src={bookingimg} alt="Logo" className="h-8 w-auto mx-auto mb-4" />
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
                    </div >
               
            ) : (
                // Mobile
                    <div className = "bg-gray-200 p-4 text-center">
            
            <img src = { bookingimg } alt = "Logo" className = "h-8 w-auto mx-auto mb-4" />
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
        </div >
            )}
</>

       
    );
}

export default Footer;
