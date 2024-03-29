import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import bookingimg1 from '../../assets/images/bookingimg1.png';
import bookingimg2 from '../../assets/images/bookingimg.png';
import bookingimg3 from '../../assets/images/bookingimg3.jpg';
import mapicon from '../../assets/images/featureicons/mapicon.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoogleMapReact from 'google-map-react';

gsap.registerPlugin(ScrollTrigger);

const MapSection = ({ type }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const desktopRef = useRef(null);
    const mobileRef = useRef(null);
    const location = useLocation();

    const imageSources = {
        1: bookingimg1,
        2: bookingimg2,
        3: bookingimg3,
    };
    const AnyReactComponent = ({ text }) => <div className='mt-12 z-50'>{text}</div>;

    // Select the appropriate image source based on the type
    const selectedImage = imageSources[type] || bookingimg2;

    // Move the declaration of locationCoordinates above its usage
    const locationCoordinates = useMemo(() => ({
        lat: 6.89471282586257, // Replace with the latitude
        lng: 79.85412688572308, // Replace with the longitude
    }), []);

    // Store marker coordinates in state
    const [markerCoordinates, setMarkerCoordinates] = useState(locationCoordinates);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Update marker coordinates when location changes
    useEffect(() => {
        setMarkerCoordinates(locationCoordinates);
    }, [locationCoordinates]);

    const openGoogleMaps = () => {
        const { lat, lng } = markerCoordinates;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;

        // Open Google Maps in a new window or tab
        window.open(url, '_blank');
    };


    const defaultProps = {
        center: locationCoordinates,
        zoom: 20,
    };
    const CustomMarker = ({ imageUrl }) => (
        <div style={{
             width: '30px', height: '30px', backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', position: 'absolute'
             }} />
    );


    return (
        <div>
            {isDesktop ? (
                // Desktop
                <div>
                <div className="relative w-20vw mx-16 my-10 overflow-hidden rounded-md" ref={desktopRef}>
                    {/* Image */}
                        <img src={selectedImage} alt="Search Image" className="w-full h-full object-cover rounded-md" />

                    {/* Overlay Text */}
                    <div className="absolute top-0 left-0 p-8 text-white">
                        <p className="text-6xl font-bold">Search in</p>
                        <div className="flex items-center mt-4">
                            <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                        </div>
                    </div>

                  
                </div>
                    <div className='w-80 h-screen absolute  mr-10 -mt-72  right-0 z-50' >
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyCRyy37ixokPYy8M9zk31n6GONnQlBp3Bg' }}
                            defaultCenter={defaultProps.center}
                            draggable={false} // Disable scrolling
                            defaultZoom={defaultProps.zoom}
                            className="relative"
                        >
                            <CustomMarker draggable={true} text="My Marker" lat={locationCoordinates.lat} lng={locationCoordinates.lng} imageUrl={mapicon} />
                            <AnyReactComponent lat={locationCoordinates.lat} lng={locationCoordinates.lng} text="YTS Enterprise" />
                        </GoogleMapReact>
                    </div>
                </div>
            ) : (
                // Mobile
                <div className="bg-[#CCE28D] p-4 rounded-md text-center" ref={mobileRef}>
                    {/* Map Section Content */}
                    <p className="text-6xl font-bold">Search in</p>
                    <div className="flex items-center justify-around mt-4">
                        <p className="mr-2 font-normal text-lg">Sri Lanka</p>
                            <button className="bg-[#2E3192] text-white px-8 py-2 rounded-full" onClick={openGoogleMaps}>
                                View on map
                            </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapSection;
