import React, { useState, useEffect } from 'react';
import MapSection from './components/mapsection';
import FilterPanel from './components/filterpanel';
import ListingCards from './components/listingcards';


const Listingcar = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const type = 1; // Specify the type here (1, 2, or 3)

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
    <div >

      {isDesktop ? (
        //Desktop    
        <div className="min-h-screen bg-white">
          <MapSection />
          <FilterPanel type={type} />
        </div>
      

      ) : (
        //Mobile
          <div className="min-h-screen bg-[#F7F7F7]">
      <MapSection />
            <FilterPanel type={type} />
            <ListingCards type={type} />
          </div>
      )}


      


      
    </div>
    
  )
}

export default Listingcar