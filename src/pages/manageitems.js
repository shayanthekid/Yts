import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageItems = () => {
    const [items, setItems] = useState([]);
    const [editModeItemId, setEditModeItemId] = useState(null);

    useEffect(() => {
        // Fetch data from the API endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getallitems/');
                const parsedBody = JSON.parse(response.data.body);
                setItems(parsedBody);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, []); // Run the effect only once on component mount

    const handleUpdateClick = (itemId) => {
        // Handle logic for updating item with ID itemId
        console.log(`Update item with ID: ${itemId}`);
        // Set the item ID to enable the "Edit" mode for that row
        setEditModeItemId(itemId);
    };

    const handleSaveClick = (itemId) => {
        // Handle logic for saving changes to the item with ID itemId
        console.log(`Save changes for item with ID: ${itemId}`);
        // Set the item ID to disable the "Edit" mode for that row
        setEditModeItemId(null);
    };

    const handleDeleteClick = async (itemId) => {
        // Handle logic for deleting item with ID itemId
        try {
            // await axios.delete(`https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/deleteitem/${itemId}`);
            // // Remove the item from the state to trigger a re-render
            // setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            console.log('delete button');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Function to make text fields editable
    const makeEditable = (fieldName, itemId, value) => {
        // Implement your logic to make the field editable
        return editModeItemId === itemId ? (
            <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(fieldName, itemId, e.target.value)}
                className="w-full border p-1"
            />
        ) : (
            value
        );
    };

    // Function to handle changes in the editable fields
    const handleFieldChange = (fieldName, itemId, updatedValue) => {
        // Update the state of the item being edited with the new value
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, [fieldName]: updatedValue } : item
            )
        );
    };

    // Function to delete an image
    const deleteImage = (imageId, itemId) => {
        // Implement your logic to delete the image
        console.log(`Delete image with ID: ${imageId} for item with ID: ${itemId}`);
    };

    console.log(items);
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8">Manage Items</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Images</th>
                        {/* Add other columns as needed */}
                        <th className="border p-2">Update</th>
                        <th className="border p-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="border p-2">{item.id}</td>
                            <td className="border p-2">
                                {makeEditable('title', item.id, item.title)}
                            </td>
                            <td className="border p-2">
                                {item.type === 1 && 'Car'}
                                {item.type === 2 && 'Property'}
                                {item.type === 3 && 'Vacation Rental'}
                            </td>
                            <td className="border p-2">
                                {makeEditable('description', item.id, item.description)}
                            </td>
                            {/* Add other columns as needed */}
                            <td className="border p-2">
                                {/* Display images */}
                                {item.image_urls && (
                                    <div className="flex flex-wrap">
                                        {item.image_urls.split(',').map((imageUrl, index) => (
                                            <div key={index} className="relative mr-2 mb-2">
                                                <img
                                                    src={`https://ytsbucketfiles.s3.ap-southeast-1.amazonaws.com/images/${imageUrl}`}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-16 h-16 object-cover"
                                                />
                                                {/** Delete Image Button */}
                                                {editModeItemId === item.id && (
                                                    <button
                                                        onClick={() => deleteImage(imageUrl, item.id)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                                                    >
                                                        X
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td className="border p-2">
                                {editModeItemId === item.id ? (
                                    <button
                                        onClick={() => handleSaveClick(item.id)}
                                        className="bg-green-500 text-white p-2 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUpdateClick(item.id)}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Update
                                    </button>
                                )}
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleDeleteClick(item.id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageItems;
