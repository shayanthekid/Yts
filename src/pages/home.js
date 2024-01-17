import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import BackgroundSVG from '../assets/images/homele.svg'; 
import BackgroundSVG2 from '../assets/images/homele.png'; 
import BackgroundSVGDesk from '../assets/images/homedesk.png'; 
import trendingimage from '../assets/images/trending.png';
import property from '../assets/images/property.png';
import car from '../assets/images/car.png';
import vacation from '../assets/images/home.png';
import icon1 from '../assets/images/car.svg'; // Replace with your actual image paths
import icon2 from '../assets/images/building.svg';
import icon3 from '../assets/images/vacation.svg';
import hwicar from '../assets/images/hiwcar.png';
import aboutUsImage from '../assets/images/aboutusmobile.png';
import aboutUsdesk from '../assets/images/aboutusdesk.png';
import { gsap } from 'gsap';

const Home = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const location = useLocation();
    const headingRef = useRef(null);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    useEffect(() => {
        gsap.from(headingRef.current, {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: 'power3.out',
        });
    }, [location.pathname]);



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
      <div className="min-h-screen bg-[#F7F7F7]">

          {/* Add the SVG background here */}
          {isDesktop ? (
            //Desktop
              <img src={BackgroundSVGDesk} alt="Background" className="absolute bottom-0 w-full h-full z-0 " />

          ): (
            //Mobile
                  <img src={BackgroundSVG2} alt="Background" className="absolute bottom-0 w-full h-full " />

          )}

          {isDesktop ? (
              // Content for Desktop
              <div className="container mx-auto p-4 z-50">
                  <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
                      {/* Card - Left Column */}
                      <div className="p-4 h-[350px] z-10"> {/* Set a fixed height */}
                          {/* Section 1 - Trending Property Heading */}
                          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-left mt-20">
                              Discover Rentals, Properties, and Vehicles
                          </h1>
                          <div className="relative bottom-0 left-0 text-left mt-8">
                              {/* mt-auto to push the button to the bottom */}
                              <button className="bg-[#2E3192] text-white p-2 rounded-md w-56 font-bold -mt-2 ml-2">Inquire Now</button>
                          </div>
                      </div>

                      {/* Heading and Button - Right Column */}
                      <div className="flex flex-row items-center justify-center z-10">
                          {/* Blue Section */}
                          <div className="absolute bg-blue-800 text-white py-6 px-4 rounded-md w-2/5 overflow-hidden">
                              <h3 className="relative text-2xl font-bold mb-4 text-left overflow-ellipsis overflow-hidden">
                                  23 renters have <br /> loved this property
                              </h3>                            
                                <p className="text-sm text-gray-300 mb-1 text-left">Up To</p>
                              <p className="text-3xl font-bold mb-1 text-left" >80%</p>
                              <p className="text-sm text-gray-300 mb-0 text-left">More Views and upturns</p>
                          </div>

                          {/* Card Section */}
                          <div className="relative overflow-hidden w-3/2 h-3/2 bg-white rounded-xl shadow-md ml-56">
                              {/* Image */}
                              <img src={trendingimage} alt="Property" className="w-full h-auto" />

                              {/* Title */}
                              <p className="text-lg font-light mt-2 text-left p-4">1st Gabrial View</p>

                              {/* Price */}
                              <p className="text-5xl text-black text-left p-4 font-bold">$500,000</p>

                              {/* Button */}
                              <div className=" bottom-4 left-0 right-0 text-center p-2">
                                  <button className="bg-[#A6CE39] text-white p-2 font-bold rounded-xl w-5/6 mt-5">Inquire</button>
                              </div>
                          </div>
                          {/* Adjusted height and margin-bottom */}
                      </div>

                  </div>
              </div>
          ) : (
              // Content for Mobile
                  <div className="container mx-auto p-4 z-50">
                      <div  className="grid grid-rows-2 md:grid-cols-1 gap-4">
                          {/* First Row - Card */}
                          <div className=" p-4 h-[350px] z-10"> {/* Set a fixed height */}
                              {/* Section 1 - Trending Property Heading */}
                              <div className="bg-blue-800 text-white p-2 rounded-full text-center">
                                  <h2 className="text-lg font-bold">Trending Property</h2>
                              </div>

                              {/* Section 2 - Image, Title, Price, Button */}
                              <div className="relative overflow-hidden h-full bg-white rounded-xl shadow-md"> {/* Make it take up the full height */}
                                  {/* Image */}
                                  <img src={trendingimage} alt="Property" className="w-full h-auto" />

                                  {/* Title */}
                                  <p className="text-sm font-light mt-2 text-left p-4">1st Gabrial View</p>

                                  {/* Price */}
                                  <p className="text-xl text-black text-left p-4 font-bold">$500,000</p>

                                  {/* Button */}

                                  <div className="absolute bottom-10 left-0 right-0 text-center">
                                      <button className="bg-[#A6CE39] text-white p-2 font-bold rounded-md w-5/6 mt-5">Inquire</button>
                                  </div>
                              </div>
                          </div>

                          {/* Second Row - Heading */}
                          <div className="flex flex-col items-center justify-center z-10 "> {/* Adjusted height and margin-bottom */}
                              <h1 
                            ref={headingRef}  
                              className="text-3xl md:text-4xl lg:text-5xl font-black text-center mt-20">
                                  Discover Rentals, Properties, and Vehicles
                              </h1>
                              <div className="relative bottom-12 left-0 right-0 text-center mt-auto"> {/* mt-auto to push the button to the bottom */}
                                  <button className="bg-[#2E3192] text-white p-2 rounded-full  w-56 font-bold -mt-10">Inquire Now</button>
                              </div>
                          </div>


                      </div>
                  </div>
          )}


{/* Hero section */}
        
      
          {/* icons section */}
          <div className="container mx-auto p-4 z-50">
              <div className="flex flex-col md:flex-row justify-center">
                  {/* Item 1 */}
                  <div className="flex flex-col items-center mb-4 md:mr-4 z-10">
                      <img src={property} alt="Property Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                      <h2 className="text-lg md:text-xl font-bold mb-2">Properties</h2>
                      <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col items-center mb-4 md:mr-4 z-10">
                      <img src={car} alt="Car Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                      <h2 className="text-lg md:text-xl font-bold mb-2">Car Rentals</h2>
                      <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col items-center z-10">
                      <img src={vacation} alt="Home Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                      <h2 className="text-lg md:text-xl font-bold mb-2">Holiday Homes</h2>
                      <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit test.</p>
                  </div>
              </div>
          </div>

      
      {/* How does it work section */}
          <div className="container mx-auto p-8 text-center z-50 relative mt-20">
              <h2 className="text-3xl font-bold mb-8 z-10">How does it work?</h2>

              <div className="flex justify-center items-center">
                  <div className="bg-white rounded-full shadow-md p-1 z-50 md:w-1/2 flex  justify-between  w-full">
                      {/* Tab 1 */}
                      <button
                          className={`rounded-full p-2 mx-2 z-10 ${activeTab === 1 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                              }`}
                          onClick={() => handleTabClick(1)}
                      >
                          <img src={icon1} alt="Icon 1" className="w-8 h-8 z-10" />
                      </button>

                      {/* Tab 2 */}
                      <button
                          className={`rounded-full p-2 mx-2 z-10 ${activeTab === 2 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                              }`}
                          onClick={() => handleTabClick(2)}
                      >
                          <img src={icon2} alt="Icon 2" className="w-8 h-8 z-10" />
                      </button>

                      {/* Tab 3 */}
                      <button
                          className={`rounded-full p-2 mx-2 z-10 ${activeTab === 3 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                              }`}
                          onClick={() => handleTabClick(3)}
                      >
                          <img src={icon3} alt="Icon 3" className="w-8 h-8 z-10" />
                      </button>
                  </div>
              </div>

              {/* Display content based on active tab */}
              <div className="mt-8 z-50">
                  {activeTab === 1 && <img src={hwicar} alt="Content 1" className="mx-auto z-10" />}
                  {activeTab === 2 && <img src={hwicar} alt="Content 2" className="mx-auto z-10" />}
                  {activeTab === 3 && <img src={hwicar} alt="Content 3" className="mx-auto z-10" />}
              </div>



              <button className="bg-[#2E3192] text-white py-2 px-8 rounded-md font-bold right-0 ">
                  Get in touch
              </button>

          </div>



{/* About us section */}

          {isDesktop ? (
              //Desktop
              <div className="container mx-auto  text-center flex">
                  {/* Image */}
                  <img src={aboutUsdesk} alt="About Us" className="w-1/2 h-auto mb-8 " />

                  {/* About Us Section */}
                  <div className="w-1/2 h-auto flex flex-col items-end bg-white bg-opacity-80  p-8">
                      {/* Heading */}
                      <h2 className="text-3xl font-bold mb-4 text-right">About Us</h2>

                      {/* Paragraph */}
                      <p className="text-sm text-gray-700 mb-8 text-right pl-11">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure r
                          <br /> 
                           tempor incididunt ut labore 
                          <br /> 
                          et dolore magna aliqua.
                      </p>

                      {/* Learn More Button */}
                      <button className="bg-[#CCE28D] text-white py-2 px-4 rounded-full font-bold right-0">
                          Learn More
                      </button>
                  </div>
              </div>

          ) : (
              //Mobile
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
                      <button className="bg-[#CCE28D] text-white py-4 px-4 w-32 rounded-md font-bold">
                          Learn More
                      </button>
                  </div>

          )}

         

      </div>

  )
}

export default Home