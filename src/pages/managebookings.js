import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from "@demark-pro/react-booking-calendar";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [editModeBookingId, setEditModeBookingId] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);


    const [isStartDateSelected, setIsStartDateSelected] = useState(true); // New state to track which date is selected

    useEffect(() => {
        // Fetch data from the API endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/viewbookings');
                const parsedBody = JSON.parse(response.data.body);
                setBookings(parsedBody.bookings || []); // Ensure bookings is an array or set to an empty array
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData();
    }, []); // Run the effect only once on component mount

    const handleUpdateClick = (bookingId) => {
        // Handle logic for updating booking with ID bookingId
        console.log(`Update booking with ID: ${bookingId}`);
        // Set the booking ID to enable the "Edit" mode for that row
        setEditModeBookingId(bookingId);

        // Set the selected start and end dates for the calendar
        const booking = bookings.find((booking) => booking.id === bookingId);
        setSelectedDates([new Date(booking.startdate), new Date(booking.enddate)]);

    };


    const handleSaveClick = async (bookingId) => {
        // Get the booking data for the updated booking
        const updatedBooking = bookings.find((booking) => booking.id === bookingId);

        try {
            // Send a PUT request to update the booking
            const response = await axios.put(
                'YOUR_UPDATE_BOOKING_ENDPOINT', // Replace with your actual endpoint
                {
                    bookingId: bookingId,
                    bookingData: updatedBooking,
                }
            );

            alert('Booking updated successfully! Please reload page');

            console.log('Response from updatebooking endpoint:', response.data);

            // Set the booking ID to disable the "Edit" mode for that row
            setEditModeBookingId(null);
        } catch (error) {
            alert('Booking was not updated');

            console.error('Error updating booking:', error);
        }
    };
    const handleChange = (dates) => {
        setSelectedDates(dates);

        if (dates.length === 2) {
            const [startDate, endDate] = dates;
           
        }
       
    };


    // Function to make text fields editable
    const makeEditable = (fieldName, bookingId, value) => {
        // Implement your logic to make the field editable
        if (editModeBookingId === bookingId) {
            if (fieldName === 'date') {
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date:
                            <Calendar
                                selected={selectedDates}
                                onChange={handleChange}
                                onOverbook={(e, err) => alert(err)}
                                disabled={(date, state) => !state.isSameMonth}
                                range={true}
                                dateFnsOptions={{ weekStartsOn: 1 }}
                            />
                        </label>
                    </div>
                );
            } else {
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleFieldChange(fieldName, bookingId, e.target.value)}
                                className="w-full border p-1"
                            />
                        </label>
                    </div>
                );
            }
        } else {
            return (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {fieldName === 'date'
                            ? 'Click update to make changes to the booking date'
                            : `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${value}`}
                    </label>
                </div>
            );
        }
    };

    // Function to handle changes in the editable fields
    const handleFieldChange = (fieldName, bookingId, updatedValue) => {
        // Update the state of the booking being edited with the new value
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === bookingId ? { ...booking, [fieldName]: updatedValue } : booking
            )
        );
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8">Manage Bookings</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Item ID</th>
                        <th className="border p-2">Is Booked</th>
                        <th className="border p-2">Contact Number</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="border p-2">{booking.id}</td>
                            <td className="border p-2">{makeEditable('item_id', booking.id, booking.item_id)}</td>
                            <td className="border p-2">{makeEditable('is_booked', booking.id, booking.is_booked)}</td>
                            <td className="border p-2">{makeEditable('contactnumber', booking.id, booking.contactnumber)}</td>
                            <td className="border p-2">{makeEditable('name', booking.id, booking.name)}</td>
                            <td className="border p-2">{makeEditable('date', booking.id, null)}</td>
                            <td className="border p-2">
                                {editModeBookingId === booking.id ? (
                                    <button
                                        onClick={() => handleSaveClick(booking.id)}
                                        className="bg-green-500 text-white p-2 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUpdateClick(booking.id)}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Update
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBookings;
