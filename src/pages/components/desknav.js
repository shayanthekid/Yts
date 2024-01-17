import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bookingimg from '../../assets/images/ytslogo.png';
import carLogo from '../../assets/images/ytsrentacar.png'; // Replace with the path to your car logo
import icon1 from '../../assets/images/featureicons/car.png'; // Replace with your icon images
import icon2 from '../../assets/images/featureicons/property.png';
import icon3 from '../../assets/images/featureicons/bunglow.png';
import icon4 from '../../assets/images/featureicons/home.png';

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
                return isActive ? icon4 : icon4;
            case 2:
                return isActive ? icon1 : icon1;
            case 3:
                return isActive ? icon2 : icon2;
            case 4:
                return isActive ? icon3 : icon3;
            default:
                return bookingimg; // Default logo if none matches
        }
    };

    const getLogo = () => {
        if (location.pathname === '/listingcar') {
            return carLogo;
        }
        return bookingimg;
    };

    return (
        <>
            <div className="fixed left-0 top-0 p-2 z-50">
                <img src={getLogo()} alt="YTS Logo" className="w-16 h-16" />
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
                </div>

                {/* Display content based on active tab */}
                <div className="mt-8 z-50">
                    {/* Content for each tab goes here */}
                </div>
            </div>
        </>
    );
};

export default DesktopNav;