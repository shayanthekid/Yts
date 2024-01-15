import React from 'react'
import BackgroundSVG from '../assets/images/homele.svg'; // Adjust the path based on your project structure
import BackgroundSVG2 from '../assets/images/homele.png'; // Adjust the path based on your project structure
import trendingimage from '../assets/images/trending.png';
import property from '../assets/images/property.png';
import car from '../assets/images/car.png';
import vacation from '../assets/images/home.png';


function home() {
  return (
      <div className="min-h-screen ">
          {/* Add the SVG background here */}
          <img src={BackgroundSVG2} alt="Background" className="absolute bottom-0 w-full h-full -z-10" />

{/* Hero section */}
          <div className="container mx-auto p-4">
              <div className="grid grid-rows-2 md:grid-cols-1 gap-4">
                  {/* First Row - Card */}
                  <div className=" p-4 h-[350px]"> {/* Set a fixed height */}
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
                  <div className="flex flex-col items-center justify-center "> {/* Adjusted height and margin-bottom */}
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
                      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
              </div>
          </div>

      
      
      </div>

  )
}

export default home