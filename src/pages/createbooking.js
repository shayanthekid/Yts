import React, { useState } from 'react';
import Calendar from "@demark-pro/react-booking-calendar";

const Createbooking = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [bookingData, setBookingData] = useState({
        item_id: '',
        startDate: '',
        endDate: '',
        is_booked: 0,
        contactnumber: '',
        name: '',
        // Add other fields here
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (dates) => {
        setSelectedDates(dates);

        if (dates.length === 2) {
            const [startDate, endDate] = dates;
            setBookingData({
                ...bookingData,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!bookingData.item_id || !bookingData.startDate || !bookingData.endDate || !bookingData.contactnumber || !bookingData.name) {
            setError('All fields are required');
            return;
        }

        console.log(bookingData);
        try {
            const response = await fetch('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/createbooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                setSuccessMessage('Booking created successfully');
                setError(null);
            } else {
                setError('Failed to create booking');
                setSuccessMessage(null);
            }
        } catch (error) {
            setError('Error creating booking');
            setSuccessMessage(null);
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item ID:
                        <input
                            type="text"
                            name="item_id"
                            value={bookingData.item_id}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        
                        <Calendar
                            selected={selectedDates}
                            onChange={handleChange}
                            onOverbook={(e, err) => alert(err)}
                            range={true}
                            dateFnsOptions={{ weekStartsOn: 1 }}
                        />
                        Start Date:
                        {selectedDates.length > 0 && (
                            <p className="text-green-500">Selected Start Date: {selectedDates[0].toLocaleDateString()}</p>
                        )}
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date:
                        {selectedDates.length > 1 && (
                            <p className="text-green-500">Selected End Date: {selectedDates[1].toLocaleDateString()}</p>
                        )}
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Is Booked:
                        <select
                            name="is_booked"
                            value={bookingData.is_booked}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contact Number:
                        <input
                            type="number"
                            name="contactnumber"
                            value={bookingData.contactnumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </label>
                </div>

                {/* Add other input fields as needed */}

                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Createbooking;
