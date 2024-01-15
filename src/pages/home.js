import React from 'react'
import BackgroundSVG from '../assets/images/homele.svg'; // Adjust the path based on your project structure
import BackgroundSVG2 from '../assets/images/homele.png'; // Adjust the path based on your project structure
import trendingimage from '../assets/images/trending.png';


function home() {
  return (
      <div className="min-h-screen flex items-center justify-center relative">
          {/* Add the SVG background here */}
          <img src={BackgroundSVG2} alt="Background" className="absolute bottom-0 w-full h-full -z-10" />

          <div className="container mx-auto p-4">
              <div className="grid grid-rows-3 md:grid-cols-1">
                  {/* First Row - Card */}
                  <div className=" p-4 h-[300px]"> {/* Set a fixed height */}
                      {/* Section 1 - Trending Property Heading */}
                      <div className="bg-blue-800 text-white p-2 rounded-t-md text-center">
                          <h2 className="text-lg font-bold">Trending Property</h2>
                      </div>

                      {/* Section 2 - Image, Title, Price, Button */}
                      <div className="relative overflow-hidden h-full bg-white rounded shadow-md"> {/* Make it take up the full height */}
                          {/* Image */}
                          <img src={trendingimage} alt="Property" className="w-full h-auto" />

                          {/* Title */}
                          <p className="text-lg font-bold mt-2">Property Title</p>

                          {/* Price */}
                          <p className="text-sm text-gray-500">Price: $500,000</p>

                          {/* Button */}
                          <div className="absolute bottom-10 left-0 right-0 text-center">
                              <button className="bg-blue-500 text-white p-2 rounded-md">View Details</button>
                          </div>
                      </div>
                  </div>

                  {/* Second Row - Heading */}
                  <div className="row-span-2 md:col-span-1 flex items-center justify-center h-[150px]"> {/* Adjusted height */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                          Discover Rentals, Properties, and Vehicles
                      </h1>
                  </div>

                  {/* Third Row - Button */}
                  <div className="md:col-span-1 bg-[#2E3192] text-white p-4 rounded-full shadow-md flex items-start justify-center">
                      <button className="text-lg font-bold w-32">Inquire Now</button>
                  </div>
              </div>
          </div>
      
      
      
      
      
      </div>

  )
}

export default home