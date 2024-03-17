import React, { useState, useEffect } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";
import axios from 'axios';
import location from '../assets/images/featureicons/bx-current-location.svg';
import email from '../assets/images/featureicons/bx-envelope.svg';
import phone from '../assets/images/featureicons/bx-phone.svg';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        itemName: '',
        itemType: '',
        selectedItem: '',
    });

    const [selectedDates, setSelectedDates] = useState([]);
    const [itemTypes, setItemTypes] = useState([
        { value: '1', label: 'Cars' },
        { value: '2', label: 'Properties' },
        { value: '3', label: 'Holiday Homes' },
    ]);
    const [reserved, setReserved] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getallitems/');
                const result = await response.json();

                if (result.body && typeof result.body === 'string') {
                    const parsedResult = JSON.parse(result.body);
                    setOriginalItems(parsedResult);
                    setFilteredItems(parsedResult); // Initialize filtered items with the original data
                 
                } else {
                    console.error('Invalid or missing data in response body');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, []);
    const handleTypeChange = (e) => {
        const typeValue = e.target.value;

        // Filter items based on selected type
        const filteredData = Array.isArray(originalItems)
            ? originalItems.filter(item => item.type === parseInt(typeValue, 10))
            : [];

        setFilteredItems(filteredData);
        // Update form data with the selected type
        setFormData({ ...formData, itemType: typeValue });
            // Set the selected item to the first item id if available
            if (filteredData.length > 0) {
                const firstItemId = filteredData[0].id;
                setSelectedItemId(firstItemId);
            } else {
                // If no items are available, reset the selectedItemId
                setSelectedItemId(null);
            }
        // Call fetchData with the selectedItemId
        if (selectedItemId) {
            fetchBooking(selectedItemId);
        }
    };

    const handleItemSelected = (e) => {
        const selectedItemValue = e.target.value;
        setSelectedItemId(selectedItemValue);
        setFormData({ ...formData, selectedItem: selectedItemValue });

        // Call fetchData with the selectedItemId
        if (selectedItemValue) {
            fetchBooking(selectedItemValue);
        }
    };

    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData, 'Selected Dates:', selectedDates);
    };

    // Move the fetchData function outside of useEffect
    const fetchBooking = async (itemId) => {
        try {
            const response = await axios.get(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getitembooking?itemId=${itemId}`);

            // Log the response data
            console.log(response.data);

            const bookings = response.data.bookings;

            if (bookings.length > 0) {
                // Create the reserved array directly from API response
                const newReserved = bookings.map(booking => ({
                    startDate: new Date(booking.startdate),
                    endDate: new Date(booking.enddate),
                }));

                // Update the state
                setReserved(newReserved);
                console.log(reserved);
            } else {
                // No bookings, set reserved to an empty array
                setReserved([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    useEffect(() => {
        // Call the fetchData function with the initial selectedItemId
        if (selectedItemId) {
            fetchBooking(selectedItemId);
        }
    }, [selectedItemId]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <div className="container mx-auto p-8 py-4 mt-10">
                <h2 className="text-3xl font-bold mb-8">Reservation Request</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold text-black text-left">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold text-black text-left">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold text-black text-left">
                            Whatsapp Number
                        </label>
                        <input
                            type="number"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                  

                    <div className="mb-4">
                        <label htmlFor="itemType" className="block text-sm font-bold text-black text-left">
                            Item Type
                        </label>
                        <select
                            id="itemType"
                            name="itemType"
                            value={formData.itemType}
                            onChange={handleTypeChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            style={{
                                // Apply light font weight only to the default option
                                fontWeight: formData.itemType ? 'normal' : 'light',
                                color: formData.itemType ? 'inherit' : '#999' // Change color for better contrast
                            }}
                        >
                            <option value="" className="font-light" disabled>
                                Select Item Type
                            </option>
                            {itemTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>



                    <div className="mb-4">
                        <label htmlFor="selectedItem" className="block text-sm font-bold text-black text-left">
                            Select Item
                        </label>
                        {formData.itemType ? (
                            <select
                                id="selectedItem"
                                name="selectedItem"
                                value={formData.selectedItem}
                                onChange={handleItemSelected}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            >
                                {filteredItems.map(item => (
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                ))}
                            </select>
                        ) : (
                            <p className="font-light">Please select a category first</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bookingDate" className="block text-sm font-bold text-black text-left">
                            Booking Date
                        </label>
                        <Calendar
                            selected={selectedDates}
                            onChange={handleChange}
                            onOverbook={(e, err) => alert(err)}
                            range={true}
                            reserved={reserved}
                            dateFnsOptions={{ weekStartsOn: 1 }}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="md:flex md:justify-center md:space-x-4 mt-20">
                    {/* Office */}
                    <div className="mb-4 md:w-1/3 text-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Address</h2>
                        <img src={location} alt="" className="mx-auto" />
                        <p className="text-gray-600">
                            Adamaly Pl<br />
                            Colombo<br />
                            00400<br />
                      
                        </p>
                     
                    </div>

                    {/* Production */}
                    <div className="mb-4 md:w-1/3 text-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
                        <img src={email} alt="" className="mx-auto" />

                        <p className="text-gray-600">
                            ytsenterpriseltd@gmail.com<br />
                           
                        </p>
                    </div>

                    {/* Warehouse */}
                    <div className="mb-4 md:w-1/3 text-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Phone Number</h2>
                        <img src={phone} alt="" className="mx-auto" />

                        <p className="text-gray-600">
                            +94 74 208 1318<br />
                            <a className='text-blue-400' aria-label="Chat on WhatsApp" href="https://wa.me/94742081318" target="_blank" rel="noopener noreferrer">
                                Available on WhatsApp
                            </a>
                          
                        
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
