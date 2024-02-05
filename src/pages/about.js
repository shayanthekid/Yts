import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { gsap } from 'gsap';
import icon1 from '../assets/images/featureicons/noun-investment-6508502.svg'; // Replace with your actual image paths
import icon2 from '../assets/images/featureicons/noun-hospitality-4863958.svg'; // Replace with your actual image paths
import icon3 from '../assets/images/featureicons/noun-car-6511431.svg'
import icon4 from '../assets/images/featureicons/noun-real-estate-5767677.svg'

const About = () => {
    const headingRef = useRef(null);
    const trendingRef = useRef(null);

    useEffect(() => {
        // Your GSAP animations here
        const tl = gsap.timeline();
        tl.to(headingRef.current, {
            opacity: 1,
            y: 20,
            duration: 1.5,
            ease: 'power2.out',
        });
        const tl2 = gsap.timeline();
        tl2.fromTo(
            trendingRef.current,
            { opacity: 0 }, // Start values
            { opacity: 1, y: 20, duration: 1.5, stagger: 0.1, ease: "power2.out" } // End values
        );

    }, []);

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section className="relative pt-16 bg-blueGray-50">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center">
                    <div ref={headingRef} className="w-5/6 md:w-5/6 lg:w-4/12 px-1 md:px-3 mr-auto ml-auto -mt-78">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#CCE28D]">
                            <img
                                alt="..."
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="w-full align-middle rounded-t-lg"
                            />
                            <blockquote className="relative p-8 mb-4">
                                <h4 className="text-xl text-center font-bold text-black">
                                    About CEO
                                </h4>
                                <div className="text-md text-left font-normal mt-2 text-black text-lg">
                                    <div className="mb-4">
                                        Nearly two decades ago, Murtaza Mansoor left home in Sri Lanka at the age of 19 to go on a quest to seek his passion. After considering migration in 3 different countries, he finally found settlement in the United States of America. He began his journey working as a delivery partner for Kristal Graphics, a printing company. Over there, he discovered his passion for printing and worked hard to earn a promotion as an official sales personnel at the same firm.
                                    </div>
                                    <div className="mb-4">
                                        Murtaza worked for 7 years in sales, through this period he also found his life partner in the US. After years of hard work in the field of printing at Kristal Graphics, Murtaza was rewarded for his unwavering spirit and dedication towards the printing business.
                                    </div>
                                    <div className="mb-4">
                                        Now, he has 50% ownership of the firm where he initially started out, along with four different businesses in the United States which are all owned by him. Success to him means being able to help others and pursue his dream, however, one very big part of his success is also his family.
                                    </div>
                                    <div className="mb-4">
                                        In the year 2021, Murtaza moved back to Sri Lanka, his home, to reunite with his family and embrace his newly started journey of fatherhood. Resuming life in Sri Lanka is an experience of immense joy and an opportunity to initiate a business which helps the people around him and the country at large, while being surrounded by his loved ones. As such, the launch of YTS investments took center stage in his life, a cherished venture which he began with the support and partnership of his sister in order to provide high quality of services, tapping into unexplored market gaps and living his dream.
                                    </div>
                                </div>
                            </blockquote>
                        </div>

                    </div>

                    <div ref={trendingRef} className="w-full md:w-6/12 px-4">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-6/12 px-4">
                                <div className="relative flex flex-col mt-4">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3  inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon1} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 text-center font-semibold">YTS Investments
</h6>
                                        <p className="mb-4 text-left text-blueGray-500">
                                            YTS investments is the brainchild of two siblings, Murtaza and Sakina who initiated a platform which offers high quality of services covering a range of different aspects of livelihood, such as car rentals, hospitality, real estate and car dealerships. This venture, fuelled by passion, is an opportunity to deliver dynamic and versatile services that have successfully carved a niche in their respective sectors.

                                            Being a family owned investment establishment, YTS is committed to delivering a top-notch experience to all our customers, ensuring that the process of choosing services is smooth and easy. Our commitment and dedication has led YTS to become a prominent name in the areas of automobile, real estate and hospitality. 
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex flex-col min-w-0">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3 inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon2} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl text-center mb-1 font-semibold">
                                            Hospitality 
                                        </h6>
                                        <p className="mb-4 text-left  text-blueGray-500">
                                            Understanding the importance of a comfortable stay, YTS Investments extends its services to the hospitality sector, with a stunning bungalow available for renting in Baddegama. The bungalow is equipped with all facilities to ensure a highly comfortable and relaxing stay for all guests. The space is decorated to exude the charm of old-school Sri Lankan interior, making it an ideal location for a weekend getaway with friends or family. 

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 mt-4">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3  inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon3} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl text-center mb-1 font-semibold">Automobile </h6>
                                        <p className="mb-4 text-left  text-blueGray-500">
                                            YTS Investments offers a diverse fleet of well-maintained vehicles to cater to the diverse needs of its clientele. Whether it's a business trip, family vacation, or a special occasion, customers can choose from a range of vehicles, including luxury cars, SUVs, and compact cars. The company prioritises customer satisfaction by providing efficient services, transparent pricing, and convenient rental options.

                                            As a trusted name in the automotive industry, YTS Investments operates a car dealership, offering a wide range of new and pre-owned vehicles. Whether customers are looking for the latest models or budget-friendly options, the dealership provides a diverse inventory along with financing options to suit various needs.

                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex flex-col min-w-0">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3  inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon4} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 text-center font-semibold">Real Estate</h6>
                                        <p className="mb-4 text-left  text-blueGray-500">
                                            YTS Investments has expanded its portfolio to include real estate services, catering to individuals and businesses seeking properties for investment or personal use. The company's real estate division specializes in identifying lucrative opportunities, facilitating property transactions, and providing comprehensive assistance throughout the buying, selling, or leasing process.

                                            Overall, YTS Investments stands out in the market due to its commitment to quality, customer satisfaction, and a diversified business approach. By seamlessly integrating car rentals, hospitality, car dealership, and real estate services, the company offers a unique and comprehensive solution for individuals and businesses alike. With a focus on innovation and adaptability, YTS Investments continues to thrive in the competitive business landscape.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;