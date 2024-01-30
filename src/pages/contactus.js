import React, { useState, useEffect } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";

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

    const [originalItems, setOriginalItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

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
            ? originalItems.filter(item => item.type === parseInt(typeValue, 10)): [];       
        
        setFilteredItems(filteredData);
        // Update form data with the selected type
        setFormData({ ...formData, itemType: typeValue });
        console.log("log from handletypechange", filteredData);
        console.log("the original items", originalItems);
        console.log("this is type value", typeValue);
    };

    const handleItemSelected = (e) => {
        const selectedItemValue = e.target.value;
        console.log(selectedItemValue);
        setFormData({ ...formData, selectedItem: selectedItemValue });
    };

    const handleChange = (dates) => {
        setSelectedDates(dates);
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-left">
                            Contact Number
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
                        <label htmlFor="itemType" className="block text-sm font-medium text-gray-600 text-left">
                            Item Type
                        </label>
                        <select
                            id="itemType"
                            name="itemType"
                            value={formData.itemType}
                            onChange={handleTypeChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        >
                            <option value="" disabled>Select Item Type</option>
                            {itemTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="selectedItem" className="block text-sm font-medium text-gray-600 text-left">
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
                                    <option key={item.id} value={item.id.toString()}>{item.title}</option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-gray-500">Please select a category first</p>
                        )}
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
        </div>
    );
};

export default ContactUs;
