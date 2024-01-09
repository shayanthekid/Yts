import React from 'react';
import constructionImage from '../assets/images/construction.png';

const ConstructionRoute = () => {
    return (
        <div className="container mx-auto p-8">
            {/* Desktop layout */}
            <div className="hidden md:flex flex-row">
                <div className="w-1/2 pr-4 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-left">
                        This Website is currently under construction!
                    </h1>
                </div>
                <div className="w-1/2">
                    <img
                        src={constructionImage}
                        alt="Under Construction"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden flex flex-col">
                <h1 className="text-4xl font-bold mb-4">This Website is currently under construction!</h1>
                <img
                    src={constructionImage}
                    alt="Under Construction"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default ConstructionRoute;