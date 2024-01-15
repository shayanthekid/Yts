import React, { useState } from 'react';
import BackgroundSVG from '../assets/images/homele.svg'; // Adjust the path based on your project structure
import BackgroundSVG2 from '../assets/images/homele.png'; // Adjust the path based on your project structure
import trendingimage from '../assets/images/trending.png';
import property from '../assets/images/property.png';
import car from '../assets/images/car.png';
import vacation from '../assets/images/home.png';
import icon1 from '../assets/images/car.svg'; // Replace with your actual image paths
import icon2 from '../assets/images/building.svg';
import icon3 from '../assets/images/vacation.svg';
import hwicar from '../assets/images/hiwcar.png';
import aboutUsImage from '../assets/images/aboutusmobile.png';

const Home = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

  return (
      <div className="min-h-screen bg-[#F7F7F7]">
          {/* Add the SVG background here */}
          <img src={BackgroundSVG2} alt="Background" className="absolute bottom-0 w-full h-full " />

{/* Hero section */}
          <div className="container mx-auto p-4 z-50">
              <div className="grid grid-rows-2 md:grid-cols-1 gap-4">
                  {/* First Row - Card */}
                  <div className=" p-4 h-[350px] z-10"> {/* Set a fixed height */}
                      {/* Section 1 - Trending Property Heading */}
                      <div className="bg-blue-800 text-white p-2 rounded-t-md text-center">
                          <h2 className="text-lg font-bold">Trending Property</h2>
                      </div>

                      {/* Section 2 - Image, Title, Price, Button */}
                      <div className="relative overflow-hidden h-full bg-white rounded shadow-md"> {/* Make it take up the full height */}
                          {/* Image */}
                          <img src={trendingimage} alt="Property" className="w-full h-auto" />

                          {/* Title */}
                          <p className="text-sm font-light mt-2 text-left p-4">1st Gabrial View</p>

                          {/* Price */}
                          <p className="text-xl text-black text-left p-4 font-bold">$500,000</p>

                          {/* Button */}
                         
                          <div className="absolute bottom-10 left-0 right-0 text-center">
                              <button className="bg-[#A6CE39] text-white p-2 rounded-md w-5/6 mt-5">Inquire</button>
                          </div>
                      </div>
                  </div>

                  {/* Second Row - Heading */}
                  <div className="flex flex-col items-center justify-center z-10 "> {/* Adjusted height and margin-bottom */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mt-20">
                          Discover Rentals, Properties, and Vehicles
                      </h1>
                      <div className="relative bottom-0 left-0 right-0 text-center mt-auto"> {/* mt-auto to push the button to the bottom */}
                          <button className="bg-[#2E3192] text-white p-2 rounded-md  w-32 font-bold -mt-10">Inquire Now</button>
                      </div>
                  </div>

                  
              </div>
          </div>
      
      {/* icons section */}
          <div className="container mx-auto p-4">
              <div className="flex flex-col md:flex-row">
                  {/* Item 1 */}
                  <div className="flex flex-col items-center mb-4 md:mr-4">
                      <img src={property} alt="Property Icon" className="mb-2 w-8 h-8 mx-auto" />
                      <h2 className="text-lg font-bold mb-2">Properties</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col items-center mb-4 md:mr-4">
                      <img src={car} alt="Car Icon" className="mb-2 w-8 h-8 mx-auto" />
                      <h2 className="text-lg font-bold mb-2">Car Rentals</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col items-center">
                      <img src={vacation} alt="Home Icon" className="mb-2 w-8 h-8 mx-auto" />
                      <h2 className="text-lg font-bold mb-2">Holiday Homes</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit test.</p>
                  </div>
              </div>
          </div>

      
      {/* How does it work section */}
          <div className="container mx-auto p-8 text-center">
              <h2 className="text-3xl font-bold mb-8">How does it work?</h2>

              <div className="flex justify-between bg-white rounded-full shadow-md p-1 ">
                  {/* Tab 1 */}
                  <button
                      className={`rounded-full p-2 mx-2 ${activeTab === 1 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                          }`}
                      onClick={() => handleTabClick(1)}
                  >
                      <img src={icon1} alt="Icon 1" className="w-8 h-8" />
                  </button>

                  {/* Tab 2 */}
                  <button
                      className={`rounded-full p-2 mx-2 ${activeTab === 2 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                          }`}
                      onClick={() => handleTabClick(2)}
                  >
                      <img src={icon2} alt="Icon 2" className="w-8 h-8" />
                  </button>

                  {/* Tab 3 */}
                  <button
                      className={`rounded-full p-2 mx-2 ${activeTab === 3 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                          }`}
                      onClick={() => handleTabClick(3)}
                  >
                      <img src={icon3} alt="Icon 3" className="w-8 h-8" />
                  </button>
              </div>

              {/* Display content based on active tab */}
              <div className="mt-8">
                  {activeTab === 1 && <img src={hwicar} alt="Content 1" className="mx-auto" />}
                  {/* replace hwicar with the rest of the creatives */}
                  {activeTab === 2 && <img src={hwicar} alt="Content 2" className="mx-auto" />}
                  {activeTab === 3 && <img src={hwicar} alt="Content 3" className="mx-auto" />}
              </div>
          </div>


          <div className="container mx-auto p-8 text-center">
              {/* Image */}
              <img src={aboutUsImage} alt="About Us" className="w-full h-auto mb-8 rounded-lg" />

              {/* Heading */}
              <h2 className="text-3xl font-bold mb-4">About Us</h2>

              {/* Paragraph */}
              <p className="text-sm text-gray-700 mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Learn More Button */}
              <button className="bg-[#CCE28D] text-white py-2 px-4 rounded-full font-bold">
                  Learn More
              </button>
          </div>

      </div>

  )
}

export default Home