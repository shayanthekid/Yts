import React from 'react'
import MapSection from './components/mapsection';
import FilterPanel from './components/filterpanel';
import ListingCards from './components/listingcards';


const listingcar = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <MapSection />
      <FilterPanel />
      <ListingCards />


      
    </div>
    
  )
}

export default listingcar