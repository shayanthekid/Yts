import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { gsap } from 'gsap';
import icon1 from '../assets/images/featureicons/safe.png'; // Replace with your actual image paths
import icon2 from '../assets/images/featureicons/integrity.png'; // Replace with your actual image paths



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

    return (
        <section className="relative pt-16 bg-blueGray-50">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center">
                    <div ref={headingRef} className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#CCE28D]">
                            <img
                                alt="..."
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="w-full align-middle rounded-t-lg"
                            />
                            <blockquote className="relative p-8 mb-4">
                                <h4 className="text-xl font-bold text-black">
                                    CEO's Message
                                </h4>
                                <p className="text-md font-light mt-2 text-black">
                                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    <div ref={trendingRef} className="w-full md:w-6/12 px-4">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-6/12 px-4">
                                <div className="relative flex flex-col mt-4">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon1} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 font-semibold">Lorem Ipsum</h6>
                                        <p className="mb-4 text-blueGray-500">
                                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex flex-col min-w-0">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon2} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 font-semibold">
                                            Lorem Ipsum
                                        </h6>
                                        <p className="mb-4 text-blueGray-500">
                                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 mt-4">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon1} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 font-semibold">Lorem Ipsum</h6>
                                        <p className="mb-4 text-blueGray-500">
                                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex flex-col min-w-0">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <img src={icon2} alt="Icon 1" className="w-8 h-auto z-10" />
                                        </div>
                                        <h6 className="text-xl mb-1 font-semibold">Lorem Ipsum</h6>
                                        <p className="mb-4 text-blueGray-500">
                                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
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