import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ConstructionRoute from './constructionroute';
import ConstructionRoute from '../pages/construction';

const AppRouter = () => {
    return (
        <Router>
            
            <Routes>
                <Route path='/' element={<ConstructionRoute />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default AppRouter;