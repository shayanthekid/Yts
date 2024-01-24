import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ConstructionRoute from './constructionroute';
import _createItem from '../pages/createitem';
import _createBooking from '../pages/createbooking';
import _manageBooking from '../pages/managebookings';
import ConstructionRoute from '../pages/construction';
import _home from '../pages/home';
import _listingcar from '../pages/listingcar';
import _listingprop from '../pages/listingprop';
import _listingvacation from '../pages/listingvacation';
import _itemdetails from '../pages/components/itemdetails';
import _manageItems from '../pages/manageitems';
import _login from '../pages/login';
import _contactus from '../pages/contactus';
import MobileNavbar from '../pages/components/mobilenav';
import DesktopNav from '../pages/components/desknav';
import Footer from '../pages/components/footer';



const AppRouter = () => {
    const [activeTab, setActiveTab] = useState(1);
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
        <Router>
            {isDesktop ? (
              //Desktop
                <DesktopNav />

            ) : (
                //Mobile
                    <MobileNavbar />
            )}

            
            <Routes>
                <Route path='/' element={<ConstructionRoute />} />
                <Route path='/login' element={<_login />} />
                <Route path='/admin/createItem' element={<_createItem />} />
                <Route path='/admin/manageItems' element={<_manageItems />} />
                <Route path='/admin/createBooking' element={<_createBooking />} />
                <Route path='/admin/manageBookings' element={<_manageBooking />} />
                <Route path='/home' element={<_home />} />
                <Route path='/listingcar' element={<_listingcar />} />
                <Route path='/listingproperty' element={<_listingprop />} />
                <Route path='/listingvacation' element={<_listingvacation />} />
                <Route path='/contactus' element={<_contactus />} />
                {/* New route for ItemDetails */}
                <Route path="/item/:itemId" element={<_itemdetails />} />

                {/* Add more routes as needed */}
            </Routes>


            <Footer />

        </Router>
    );
};

export default AppRouter;