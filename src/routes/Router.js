import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ConstructionRoute from './constructionroute';
import _createItem from '../pages/createitem';
import ConstructionRoute from '../pages/construction';
import _home from '../pages/home';
import _listingcar from '../pages/listingcar';
import MobileNavbar from '../pages/components/mobilenav';
import DesktopNav from '../pages/components/desknav';



const AppRouter = () => {
    return (
        <Router>
            <DesktopNav />
            <Routes>
                <Route path='/' element={<ConstructionRoute />} />
                <Route path='/admin/createItem' element={<_createItem />} />
                <Route path='/home' element={<_home />} />
                <Route path='/listingcar' element={<_listingcar />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default AppRouter;