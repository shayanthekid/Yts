import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';
import carLogo from '../../assets/images/ytsrentacar.png';
import icon2 from '../../assets/images/featureicons/car.png';
import icon3 from '../../assets/images/featureicons/property.png';
import icon4 from '../../assets/images/featureicons/bunglow.png';
import icon1 from '../../assets/images/featureicons/home.png';
import icon5 from '../../assets/images/featureicons/abouticon.png';
import icon6 from '../../assets/images/featureicons/phoneicon.png';

const DesktopNav = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const getIcon = (tabNumber) => {
        const isActive = activeTab === tabNumber;
        switch (tabNumber) {
            case 1:
                return isActive ? icon1 : icon1;
            case 2:
                return isActive ? icon2 : icon2;
            case 3:
                return isActive ? icon3 : icon3;
            case 4:
                return isActive ? icon4 : icon4;
            case 5:
                return isActive ? icon5 : icon5;
            case 6:
                return isActive ? icon6 : icon6;
            default:
                return bookingimg;
        }
    };

    const getLogo = () => {
        if (location.pathname === '/listingcar') {
            return carLogo;
        }
        return bookingimg;
    };

    const isAdminRoute = location.pathname.includes('/admin');

    return (
        <>
            {/* Display content based on active tab or admin route */}
            <div className="mt-8 z-50">
                {isAdminRoute ? (
                    // Content for admin route
                    <div className="bg-gray-300 p-4 absolute top-0 w-full">
                        <Link to="/admin/createItem" className={`text-gray-700 font-semibold mx-2 ${location.pathname === '/admin/createItem' ? 'text-black' : ''}`}>
                            Create Item
                        </Link>
                        <Link to="/admin/manageItems" className={`text-gray-700 font-semibold mx-2 ${location.pathname === '/admin/manageItems' ? 'text-black' : ''}`}>
                            Manage Items
                        </Link>
                        <Link to="/admin/createBooking" className={`text-gray-700 font-semibold mx-2 ${location.pathname === '/admin/createBooking' ? 'text-black' : ''}`}>
                            Create Booking
                        </Link>
                        <Link to="/admin/manageBookings" className={`text-gray-700 font-semibold mx-2 ${location.pathname === '/admin/manageBookings' ? 'text-black' : ''}`}>
                            Manage Bookings
                        </Link>
                        <Link to="/login" className={`text-white font-semibold mx-2 bg-red-500 p-2 rounded-md ${location.pathname === '/' ? 'text-black' : ''}`}>
                            Log out
                        </Link>
                    </div>
                ) : (
                    // Content for non-admin route
                    <>
                        <div className="fixed left-0 top-0 p-2 z-50">
                            <img src={getLogo()} alt="YTS Logo" className="w-28 h-auto" />
                        </div>
                        <div className="fixed left-0 top-0 h-full flex flex-col items-center justify-center p-2 z-50">
                            <div className="bg-white rounded-full shadow-md p-1 flex flex-col items-center">
                                {/* Tab 1 */}
                                <Link to="/home" className={`rounded-full p-2 my-2 z-10 ${activeTab === 1 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(1)}>
                                    <img src={getIcon(1)} alt="Icon 1" className="w-8 h-8 z-10" />
                                </Link>

                                {/* Tab 2 */}
                                <Link to="/listingcar" className={`rounded-full p-2 my-2 z-10 ${activeTab === 2 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(2)}>
                                    <img src={getIcon(2)} alt="Icon 2" className="w-8 h-8 z-10" />
                                </Link>

                                {/* Tab 3 */}
                                <Link to="/listingproperty" className={`rounded-full p-2 my-2 z-10 ${activeTab === 3 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(3)}>
                                    <img src={getIcon(3)} alt="Icon 3" className="w-8 h-8 z-10" />
                                </Link>

                                {/* Tab 4 */}
                                <Link to="/listingvacation" className={`rounded-full p-2 my-2 z-10 ${activeTab === 4 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(4)}>
                                    <img src={getIcon(4)} alt="Icon 4" className="w-8 h-8 z-10" />
                                </Link>
                                 {/* Tab 5 */}
                                <Link to="/about" className={`rounded-full p-2 my-2 z-10 ${activeTab === 5 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(5)}>
                                        <img src={getIcon(5)} alt="Icon 5" className="w-8 h-8 z-10" />
                                </Link>
                                {/* Tab 6 */}
                                <Link to="/contactus" className={`rounded-full p-2 my-2 z-10 ${activeTab === 6 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleTabClick(6)}>
                                        <img src={getIcon(6)} alt="Icon 6" className="w-8 h-8 z-10" />
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DesktopNav;
