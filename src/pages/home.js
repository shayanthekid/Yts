import React, { useState, useEffect, useRef } from 'react';
import { Link,useLocation } from 'react-router-dom';


import BackgroundSVG from '../assets/images/homele.svg'; 
import BackgroundSVG2 from '../assets/images/homele.png'; 
import BackgroundSVGDesk from '../assets/images/homedesk.png'; 
import backgroundaltmobile from '../assets/images/homepagealt.png'; 
import trendingimage from '../assets/images/trending2.png';
import property from '../assets/images/property.png';
import car from '../assets/images/car.png';
import vacation from '../assets/images/home.png';
import icon1 from '../assets/images/car.svg'; // Replace with your actual image paths
import icon2 from '../assets/images/building.svg';
import icon3 from '../assets/images/vacation.svg';
import hwicar from '../assets/images/hiwcar.png';
import aboutUsImage from '../assets/images/aboutusmobile.png';
import aboutUsdesk from '../assets/images/aboutusdesk.png';
import mobcarousel1 from '../assets/images/mobilehome1.png';
import mobcarousel2 from '../assets/images/mobilehome2.png';
import mobcarousel3 from '../assets/images/mobilehome3.png';
import deskcarousel1 from '../assets/images/desktophome1.png';
import deskcarousel2 from '../assets/images/desktophome2.png';
import deskcarousel3 from '../assets/images/desktophome3.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const location = useLocation();
    const headingRef = useRef(null);
    const headingRefDesk = useRef(null);
    const headingRefDesk2 = useRef(null);
    const trendingRef = useRef(null);
    const trendingRefDesk = useRef(null);
    const trendingRefDesk2 = useRef(null);
    const logosRefs = {
        property: useRef(null),
        car: useRef(null),
        vacation: useRef(null),
    };;
    const hdiwRef = useRef(null);
    const aboutRef = useRef(null);
    const [trendingItems, setTrendingItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getTrending');

                const parsedBody = JSON.parse(response.data.body);
                const trendingItemsArray = parsedBody.items || [];

                // Process each item to extract the first image URL
                const processedTrendingItems = trendingItemsArray.map((item) => {
                    const firstImageUrl = item.image_urls.split(',')[0]; // Get the first URL
                    return { ...item, image_urls: firstImageUrl };
                });

                setTrendingItems(processedTrendingItems);
            } catch (error) {
                console.error('Error fetching trending items:', error);
            }
        };

        fetchData();
    }, []);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    console.log("the trending item:",trendingItems);
    useEffect(() => {
        // Your GSAP animations here
        const tl = gsap.timeline();
        tl.fromTo(headingRef.current, {
            opacity: 0,
        }, {
            duration: 0.5,
            opacity: 1,
            y: 20,
           
            stagger: 0.1,
            ease: "power1.in"
        });


        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: trendingRef.current,
                start: 'top bottom', // Adjusted start point
                end: 'bottom center', // Adjusted end point
                scrub: false,
                markers: false, // Set to true to show markers, you can change it to false later
            },
        });

        tl2.fromTo(
            trendingRef.current,
            { opacity: 0 }, // Start values
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power2.out" } // End values
        );
        // Animation for properties, car rentals, and holiday homes
        Object.keys(logosRefs).forEach((key) => {
            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: logosRefs[key].current,
                    start: 'top bottom', // Adjusted start point
                    end: 'bottom center', // Adjusted end point
                    scrub: false,
                    markers: false,
                }
            });

            tl3.fromTo(logosRefs[key].current, {
                opacity: 0,
            }, {
                duration: 0.5,
                opacity: 1,
                y: 20,
                stagger: 0.1,
                ease: "power1.in"
            });
        });

        const t4 = gsap.timeline({
            scrollTrigger: {
                trigger: hdiwRef.current,
                start: 'top bottom', // Adjusted start point
                end: 'bottom center', // Adjusted end point
                scrub: false,
                markers: false,
            }
        });

        // Add animations to the fourth timeline
        t4.fromTo(hdiwRef.current, {
            opacity: 0,
        }, {
            duration: 0.5,
            opacity: 1,
            y: 20,
            stagger: 0.1,
            ease: "back.in"
        });

        const t5 = gsap.timeline({
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top center',
                end: '80% center',
                scrub: false,
                markers: false,
            }
        });

        // Add animations to the fourth timeline
        t5.fromTo(aboutRef.current, {
            opacity: 0,
        }, {
            duration: 0.5,
            opacity: 1,
            y: 20,
            stagger: 0.1,
            ease: "back.in"
        });


        const t6 = gsap.timeline();
        t6.to(headingRefDesk.current, {
            opacity: 1,
            y: 20,
            duration: 1.5,
            ease: 'power2.out',
        });

        const tl7 = gsap.timeline();
        tl7.fromTo(
            trendingRefDesk.current,
            { opacity: 0 }, // Start values
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power2.out" } // End values
        );

        const tl8 = gsap.timeline();
        tl8.fromTo(
            trendingRefDesk2.current,
            { opacity: 0 }, // Start values
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power2.out" } // End values
        );
        const t9 = gsap.timeline();
        t9.fromTo(headingRefDesk2.current, {
            opacity: 0,
        }, {
            duration: 0.6,
            opacity: 1,
            y: 20,
            stagger: 0.1,
            delay: 0.5,
            ease: "power1.in"
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    //imagearray
    // Replace the dynamic logic with the static images
    const staticImageUrlsArray = [mobcarousel1, mobcarousel2, mobcarousel3];
    const staticImageUrlsArray2 = [deskcarousel1, deskcarousel2, deskcarousel3];

    // Use staticImageUrlsArray instead of item[0].image_urls
    const imageUrlsArray = staticImageUrlsArray;
    const imageUrlsArray2 = staticImageUrlsArray2;

  return (
      <div className="min-h-screen bg-[#F7F7F7]">

          {/* Add the SVG background here */}
          {isDesktop ? (
            //Desktop
              <img src={BackgroundSVGDesk} alt="Background" className="absolute bottom-0 w-full h-full z-0 " />

          ): (
            //Mobile
                  <Carousel showThumbs={false} showArrows={false} swipeable={true} interval={3000} autoPlay={true} showStatus={false} infiniteLoop={true} >
                  {imageUrlsArray.map((imageUrl, index) => (
                      <div key={index}>
                          <img
                              src={imageUrl}
                              alt={`Image ${index}`}
                              className='w-32 h-auto relative bottom-0' // Adjust the height as needed
                          />
                      </div>
                  ))}
              </Carousel>
       

          )}

          {isDesktop ? (
              // Content for Desktop
              <div className='relative top-0 -mt-10'>
                   <Carousel 
                   className=''
                   showThumbs={false} showArrows={false} swipeable={true} interval={3000} autoPlay={true} showStatus={false} infiniteLoop={true} >
                      {imageUrlsArray2.map((imageUrl, index) => (
                          <div key={index}>
                              <img
                                  src={imageUrl}
                                  alt={`Image ${index}`}
                                  className='w-full h-auto relative bottom-0' // Adjust the height as needed
                              />
                          </div>
                      ))}
                  </Carousel>
              
              <div className="container mx-auto p-2 z-50">
               
                  <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
                      {/* Card - Left Column */}
                      <div className="p-4 h-[350px] z-10 ml-14  -mt-20" ref={headingRefDesk}> {/* Set a fixed height */}
                          {/* Section 1 - Trending Property Heading */}
                          <h1
                              
                        className="text-3xl md:text-5xl lg:text-3xl font-bold text-left mt-16">
                                  
                                  Discover Vehicles, Rentals <> & Vehicles</>
                              </h1>

                          <div className="relative bottom-0 left-0 text-left mt-8" >
                              {/* mt-auto to push the button to the bottom */}
                              <Link to="/contactus">
            
                              <button className="bg-[#2E3192] text-white p-2 rounded-md w-56 font-bold -mt-2 ml-2">Inquire Now</button>
                                  
                              </Link>
                          </div>
                      </div>

                      {/* Heading and Button - Right Column */}
                      <div className="flex flex-row items-center justify-center z-10 -mt-52 -mr-2" >
                          {/* Blue Section */}
                          <div ref={trendingRefDesk} className="absolute bg-blue-800 text-white py-6 px-4 rounded-md w-2/5 overflow-hidden -mt-20">
                              {trendingItems.length > 0 && (
                                  <h3 className="relative text-xl font-bold mb-4 text-left overflow-ellipsis overflow-hidden whitespace-normal w-52">
                                      {trendingItems[0].description}
                                  </h3>
                              )}                           
                                <p className="text-sm text-gray-300 mb-1 text-left">Up To</p>
                              {trendingItems.length > 0 && (
                              <p className="text-3xl font-bold mb-1 text-left" > {trendingItems[0].percentage}%</p>
                              )}   
                              <p className="text-sm text-gray-300 mb-0 text-left">More Views and upturns</p>
                          </div>

                          {/* Card Section */}
                          <div className="relative overflow-hidden w-2/5 h-3/2 bg-white rounded-xl shadow-md ml-56" ref={trendingRefDesk2}>
                              {/* Image */}
                              {trendingItems.length > 0 && (
                              <img src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${trendingItems[0].image_urls}`} alt="Property" className="w-full h-auto" />
                              )} 
                              {/* Title */}
                              {trendingItems.length > 0 && (
                              <p className="text-xl font-medium mt-2 text-left p-4">{trendingItems[0].itemName}</p>
                              )}  
                              {/* Price */}
                              {trendingItems.length > 0 && (
                                  <p className="text-3xl text-black text-left p-4 font-bold">{trendingItems[0].price} Rupees</p>
                              )} 
                              {/* Button */}
                              <div className=" bottom-4 left-0 right-0 text-center p-2">
                                  <Link to="/contactus">
                                  <button className="bg-[#A6CE39] text-white p-2 font-bold rounded-xl w-5/6 mt-5">Inquire</button>
                                  </Link>
                              </div>
                          </div>
                          {/* Adjusted height and margin-bottom */}
                      </div>

                  </div>
              </div>
              </div>
          ) : (
              // Content for Mobile
                  <div className="container absolute mx-auto p-4 z-0 -mt-96">
                      <div  className="grid grid-rows-2 md:grid-cols-1 gap-4">
                         

                          {/* Second Row - Heading */}
                          <div className="flex flex-col items-center justify-center z-10 "> {/* Adjusted height and margin-bottom */}
                              <h1 
                            ref={headingRef}  
                              className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center mt-20">
                                  Discover Vehicles, Rentals <> & Vehicles</>
                              </h1>
                              
                          </div>
                          <div className="relative bottom-12 left-0 right-0 text-center mt-auto" ref={headingRefDesk2}> {/* mt-auto to push the button to the bottom */}
                              <Link to="/contactus" >
                                  <button className="bg-[#2E3192] text-white p-2 rounded-full  w-56 font-bold -mt-10">Inquire Now</button>
                              </Link>
                          </div>

                      </div>
                  </div>
          )}


{/* Hero section */}
          {/* First Row - Card */}
        
          {isDesktop ? (
              < div className="container mx-auto p-4 z-50 mt-6">
          <div className="flex flex-col md:flex-row justify-between">
        
           

          
              <div className="flex flex-col items-center mb-4 md:mr-4 z-10" ref={logosRefs.car}>
                  <img src={car} alt="Car Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                  <h2 className="text-lg md:text-xl font-bold mb-2">Car Rentals</h2>
                          <p className="text-sm md:text-base">Explore, drive, and rent cars for unforgettable travel experiences.</p>
              </div>

            
              <div className="flex flex-col items-center z-10" ref={logosRefs.vacation}>
                  <img src={vacation} alt="Home Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                  <h2 className="text-lg md:text-xl font-bold mb-2">Holiday Homes</h2>
                          <p className="text-sm md:text-base">Charming vacation homes offering comfort, style, and memorable getaways.</p>
              </div>

                      <div className="flex flex-col items-center mb-4 md:mr-4 z-10" ref={logosRefs.property}>
                          <img src={property} alt="Property Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                          <h2 className="text-lg md:text-xl font-bold mb-2">Properties</h2>
                          <p className="text-sm md:text-base">Spacious, modern home with scenic views and luxurious amenities</p>
                      </div>
          </div>
      </div>

          ): (
            //mobile
<div>
        < div className = "container mx-auto p-4 z-30" >
            <div className="flex flex-col md:flex-row justify-center">
                {/* Item 1 */}
              

                {/* Item 2 */}
                <div className="flex flex-col items-center mb-4 md:mr-4 z-10" ref={logosRefs.car}>
                    <img src={car} alt="Car Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                    <h2 className="text-lg md:text-xl font-bold mb-2">Car Rentals</h2>
                    <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-center z-10" ref={logosRefs.vacation}>
                    <img src={vacation} alt="Home Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                    <h2 className="text-lg md:text-xl font-bold mb-2">Holiday Homes</h2>
                    <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit test.</p>
                </div>

                     <div className="flex flex-col items-center mb-4 md:mr-4 z-10" ref={logosRefs.property}>
                                  <img src={property} alt="Property Icon" className="mb-2 w-12 h-12 mx-auto md:w-16 md:h-16" />
                                  <h2 className="text-lg md:text-xl font-bold mb-2">Properties</h2>
                                  <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                              </div>
            </div>
          </div >
                      <div className="grid grid-rows-1 md:grid-cols-1 gap-4 mt-6">
            <div className=" p-4 h-auto z-10" ref={trendingRef} > {/* Set a fixed height */}
                              {/* Section 1 - Trending Property Heading */}
                              <div className="bg-blue-800 text-white p-2 rounded-full text-center">
                                  <h2 className="text-lg font-bold">Trending Listing</h2>
                              </div>

                              {/* Section 2 - Image, Title, Price, Button */}
                              <div className="relative overflow-hidden h-full bg-white rounded-xl shadow-md"> {/* Make it take up the full height */}
                                  {/* Image */}
                                
                                  {trendingItems.length > 0 && (
                                      <img src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${trendingItems[0].image_urls}`} alt="Property" className="w-full h-auto" />
                                  )} 
                                  {/* Title */}
                                  {trendingItems.length > 0 && (
                                      <p className="text-sm font-light mt-2 text-left p-4">{trendingItems[0].itemName}</p>
                                  )} 
                                  {/* Price */}
                                  {trendingItems.length > 0 && (
                                  <p className="text-xl text-black text-left p-4 font-bold">{trendingItems[0].price} Rupees</p>
                                  )} 
                                  {/* Button */}

                                  <div className="relative bottom-0 left-0 right-0 text-center">
                                      <Link to="/contactus">
                                      <button className="bg-[#A6CE39] text-white p-2 font-bold rounded-md w-5/6 mt-5">Inquire</button>
                                  </Link>
                                  
                                  </div>
                              </div>
                          </div>
                  </div>
                  </div>
              )}
         
      
      {/* How does it work section */}
          <div className="container mx-auto p-8 text-center  relative mt-20" ref={hdiwRef}>
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
                          <img src={icon3} alt="Icon 2" className="w-8 h-8 z-10" />
                      </button>

                      {/* Tab 3 */}
                      <button
                          className={`rounded-full p-2 mx-2 z-10 ${activeTab === 3 ? 'bg-[#CCE28D] text-white' : 'bg-gray-200 text-gray-800'
                              }`}
                          onClick={() => handleTabClick(3)}
                      >
                          <img src={icon2} alt="Icon 3" className="w-8 h-8 z-10" />
                      </button>
                  </div>
              </div>

              {/* Display content based on active tab */}
              <div className="mt-8 z-50">
                  {activeTab === 1 && <img src={hwicar} alt="Content 1" className="mx-auto z-10" />}
                  {activeTab === 2 && <img src={hwicar} alt="Content 2" className="mx-auto z-10" />}
                  {activeTab === 3 && <img src={hwicar} alt="Content 3" className="mx-auto z-10" />}
              </div>


              <Link to="/contactus">
              <button className="bg-[#2E3192] text-white py-2 px-8 rounded-md font-bold right-0 ">
                  Get in touch
              </button>
          </Link>
          </div>



{/* About us section */}

          {isDesktop ? (
              //Desktop
              <div className="container mx-auto  text-center flex mt-32">
                  {/* Image */}
                  <img src={aboutUsdesk} alt="About Us" className="w-1/2 h-auto mb-8 " />

                  {/* About Us Section */}
                  <div className="w-1/2 h-auto flex flex-col items-end bg-white bg-opacity-80  p-8">
                      {/* Heading */}
                      <h2 className="text-3xl font-bold mb-4 text-right">About Us</h2>

                      {/* Paragraph */}
                      <p className="text-lg text-gray-700 mb-8 text-right pl-11">
                          YTS Investments has expanded its portfolio to include real estate services, catering to individuals and businesses seeking properties for investment or personal use. The company's real estate division specializes in identifying lucrative opportunities, facilitating property transactions, and providing comprehensive assistance throughout the buying, selling, or leasing process.
                          <div className="mb-4">
                          Overall, YTS Investments stands out in the market due to its commitment to quality, customer satisfaction, and a diversified business approach. By seamlessly integrating car rentals, hospitality, car dealership, and real estate services, the company offers a unique and comprehensive solution for individuals and businesses alike. With a focus on innovation and adaptability, YTS Investments continues to thrive in the competitive business landscape.
                            </div>
                      </p>

                      {/* Learn More Button */}
                      <Link to="/about">
                      <button className="bg-[#CCE28D] text-white py-2 px-4 rounded-full font-bold right-0">
                          Learn More
                      </button>
                      </Link>
                  </div>
              </div>

          ) : (
              //Mobile
                  <div className="container mx-auto p-8 text-center" ref={aboutRef}>
                      {/* Image */}
                      <img src={aboutUsImage} alt="About Us" className="w-full h-auto mb-8 rounded-lg" />

                      {/* Heading */}
                      <h2 className="text-3xl font-bold mb-4">About Us</h2>

                      {/* Paragraph */}
                      <p className="text-md text-gray-700 mb-8">
                          YTS Investments has expanded its portfolio to include real estate services, catering to individuals and businesses seeking properties for investment or personal use. The company's real estate division specializes in identifying lucrative opportunities, facilitating property transactions, and providing comprehensive assistance throughout the buying, selling, or leasing process.
                          <div className="mb-4">
                              Overall, YTS Investments stands out in the market due to its commitment to quality, customer satisfaction, and a diversified business approach. By seamlessly integrating car rentals, hospitality, car dealership, and real estate services, the company offers a unique and comprehensive solution for individuals and businesses alike. With a focus on innovation and adaptability, YTS Investments continues to thrive in the competitive business landscape.
                          </div>                     
                           </p>

                      {/* Learn More Button */}
                      <Link to="/about">
                      <button className="bg-[#CCE28D] text-white py-4 px-4 w-32 rounded-md font-bold">
                          Learn More
                      </button>
                      </Link>
                  </div>

          )}

         

      </div>

  )
}

export default Home