import React, { useState } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        itemName: '',
    });

    const [selectedDates, setSelectedDates] = useState([]);

    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any actions you need with the form data and selected dates here.
        console.log('Form submitted:', formData, 'Selected Dates:', selectedDates);
    };

    return (
        <div>

            <div className="container mx-auto p-8 py-4 mt-10">
                <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 text-left">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-left">
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
                        <label htmlFor="itemName" className="block text-sm font-medium text-gray-600 text-left">
                            Item Name
                        </label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={formData.itemName}
                            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-600 text-left">
                            Booking Date
                        </label>
                        <Calendar
                            selected={selectedDates}
                            onChange={handleChange}
                            onOverbook={(e, err) => alert(err)}
                            range={true}
                            dateFnsOptions={{ weekStartsOn: 1 }}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

{/* add here */}
            <div className="md:flex md:justify-center md:space-x-4 mt-20">
                {/* Office */}
                <div className="mb-4 md:w-1/3 text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Lorem Ipsum</h2>
                    <p className="text-gray-600">
                        Lorem Ipsum<br />
                        Lorem Ipsum<br />
                        Lorem Ipsum<br />
                        Lorem Ipsum
                    </p>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum<br />
                        Lorem Ipsum
                    </p>
                </div>

                {/* Production */}
                <div className="mb-4 md:w-1/3 text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Lorem Ipsum</h2>
                    <p className="text-gray-600">
                        Lorem Ipsum<br />
                        Lorem Ipsum
                    </p>
                </div>

                {/* Warehouse */}
                <div className="mb-4 md:w-1/3 text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Lorem Ipsum</h2>
                    <p className="text-gray-600">
                        Lorem Ipsum<br />
                        Lorem Ipsum
                    </p>
                </div>
            </div>

        


        </div>
        
      
    );
};

export default ContactUs;
