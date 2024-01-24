import React, { useState, useEffect } from 'react';
import MapSection from './components/mapsection';
import FilterPanel from './components/filterpanel';
import ListingCards from './components/listingcards';


const Listingcar = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const type = 1; // Specify the type here (1, 2, or 3)
  const [filteredData, setFilteredData] = useState([]); // Lifted state for filtered data

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Callback function to update filtered data
  const handleFilterChange = (searchInput, selectedDates) => {
    // console.log('Search Input:', searchInput);
    // console.log('Selected Dates:', selectedDates);

    // Filter the data based on the search input and selected dates
    // You may adjust this filtering logic based on your requirements
    const newData = [searchInput, selectedDates]; // Implement your filtering logic here
    setFilteredData(newData);
  };

  
  return (
    <div >

      {isDesktop ? (
        //Desktop    
        <div className="min-h-screen bg-white">
          <MapSection />
          <FilterPanel type={type} onFilterChange={handleFilterChange} filteredData={filteredData} />
          
        </div>
      

      ) : (
        //Mobile
          <div className="min-h-screen bg-[#F7F7F7]">
      <MapSection />
            <FilterPanel type={type} onFilterChange={handleFilterChange} filteredData={filteredData} />
            <ListingCards type={type} data={filteredData} />
          </div>
      )}


      


      
    </div>
    
  )
}

export default Listingcar