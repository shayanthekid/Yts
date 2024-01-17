import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import bookingimg from '../../assets/images/bookingimg.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const desktopRef = useRef(null);
    const mobileRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // useEffect(() => {
    //     const t1 = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: desktopRef.current,
    //             start: 'top center',
    //             end: '80% center',
    //             scrub: false,
    //             markers: false,
    //         }
    //     });

    //     t1.fromTo(desktopRef.current, {
    //         opacity: 0,
    //     }, {
    //         duration: 0.5,
    //         opacity: 1,
    //         y: 20,
    //         stagger: 0.1,
    //         ease: "back.in"
    //     });
    // }, [location.pathname]);

    return (
        <div>
            {isDesktop ? (
                // Desktop
                <div className="relative w-20vw mx-16 my-10 overflow-hidden rounded-md" ref={desktopRef}>
                    {/* Image */}
                    <img src={bookingimg} alt="Search Image" className="w-full h-full object-cover rounded-md" />

                    {/* Overlay Text */}
                    <div className="absolute top-0 left-0 p-8 text-white">
                        <p className="text-6xl font-bold">Search in</p>
                        <div className="flex items-center mt-4">
                            <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                        </div>
                    </div>
                </div>
            ) : (
                // Mobile
                <div className="bg-[#CCE28D] p-4 rounded-md text-center" ref={mobileRef}>
                    {/* Map Section Content */}
                    <p className="text-6xl font-bold">Search in</p>
                    <div className="flex items-center justify-around mt-4">
                        <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                        <button className="bg-[#2E3192] text-white px-8 py-2 rounded-full">View on map</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapSection;
