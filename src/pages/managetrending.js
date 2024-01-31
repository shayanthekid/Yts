import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTrending = () => {
    const [trendingItems, setTrendingItems] = useState([]);
    const [editModeItemId, setEditModeItemId] = useState(null);
    const [originalItems, setOriginalItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState('');
    const [selectedItemName, setSelectedItemName] = useState('');
    const [allItems, setAllItems] = useState([]);
    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await fetch('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getallitems/');
                const result = await response.json();

                if (result.body && typeof result.body === 'string') {
                    const parsedResult = JSON.parse(result.body);
                    setAllItems(parsedResult);
                } else {
                    console.error('Invalid or missing data in response body');
                }
            } catch (error) {
                console.error('Error fetching all items:', error);
            }
        };

        fetchAllItems();
    }, []);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/getTrending');
    
                const parsedBody = JSON.parse(response.data.body);
                setTrendingItems(parsedBody.items || []); // Change to parsedBody.items
            } catch (error) {
                console.error('Error fetching trending items:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(trendingItems);
    }, [trendingItems]);
    const handleUpdateClick = (itemId) => {
        // Handle logic for updating item with ID itemId
        console.log(`Update item with ID: ${itemId}`);
        // Set the item ID to enable the "Edit" mode for that row
        setEditModeItemId(itemId);
    };

    const handleTypeChange = (e) => {
        const typeValue = e.target.value;

        // Filter items based on selected type
        const filteredData = Array.isArray(originalItems)
            ? originalItems.filter((item) => item.type === parseInt(typeValue, 10))
            : [];

        setFilteredItems(filteredData);
        // Set the selected item to the first item id if available
        if (filteredData.length > 0) {
            const firstItemId = filteredData[0].id;
            setSelectedItemName(firstItemId);
        } else {
            // If no items are available, reset the selectedItemId
            setSelectedItemName('');
        }
    };

    const handleItemSelected = (e) => {
        const selectedItemValue = e.target.value;
        setSelectedItemName(selectedItemValue);
    };

    const handleSaveClick = async (itemId) => {
        if (!selectedItemName) {
            // Handle the case when no item is selected
            alert('No item selected');
            return;
        }

        // Get the trending item data for the updated item
        const updatedItem = trendingItems.find((item) => item.id === itemId);
        const { id, description, percentage } = updatedItem;
        const newitemID = selectedItemName;

        try {
            // Make the Axios PUT request
            const response = await axios.put('https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/updateTrending', {
                id: id, // Add any other fields you want to update
                description: description,
                percentage: percentage,
                itemid: newitemID,
            });

            console.log('PUT request successful:', response.data);

            // Set the item ID to disable the "Edit" mode for that row
            setEditModeItemId(null);
        } catch (error) {
            console.error('Error making PUT request:', error);
            // Handle the error as needed
        }
    };



    // Inside the makeEditable function:
    const makeEditable = (fieldName, itemId, value) => {
        // Implement your logic to make the field editable
        if (editModeItemId === itemId) {
            return (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                        {fieldName === 'percentage' ? (
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => handleFieldChange(fieldName, itemId, e.target.value)}
                                className="w-full border p-1"
                            />
                        ) : fieldName === 'itemName' ? (
                                <div>
                                    <p>Select from all existing items</p>
                                    <select
                                        value={selectedItemName}
                                        onChange={(e) => setSelectedItemName(e.target.value)}
                                        className="w-full border p-1"
                                    >
                                        <option value="">Select an item</option> {/* Add this line for default/empty state */}
                                        {allItems.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                        ) : (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleFieldChange(fieldName, itemId, e.target.value)}
                                className="w-full border p-1"
                            />
                        )}
                    </label>
                </div>
            );
        } else {
            return (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${value}`}
                    </label>
                </div>
            );
        }
    };



    // Function to handle changes in the editable fields
    const handleFieldChange = (fieldName, itemId, updatedValue) => {
        // Update the state of the item being edited with the new value
        setTrendingItems((prevItems) =>
            prevItems.map((item) => (item.id === itemId ? { ...item, [fieldName]: updatedValue } : item))
        );
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8">Manage Trending Items</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Item Name</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Percentage</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trendingItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border p-2">{item.id}</td>
                            <td className="border p-2">{makeEditable('itemName', item.id, item.itemName)}</td>
                            <td className="border p-2">{makeEditable('description', item.id, item.description)}</td>
                            <td className="border p-2">{makeEditable('percentage', item.id, item.percentage)}</td>
                            <td className="border p-2">
                                {editModeItemId === item.id ? (
                                    <button
                                        onClick={() => handleSaveClick(item.id)}
                                        className="bg-green-500 text-white p-2 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <div className='flex'>
                                        <button
                                            onClick={() => handleUpdateClick(item.id)}
                                            className="bg-blue-500 text-white p-2 rounded"
                                        >
                                            Update
                                        </button>
                                     
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTrending;
