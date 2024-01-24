import React, { useState, useEffect } from 'react';
import FeaturesColumn from './components/FeaturesColumn';

import axios from 'axios';

const ManageItems = () => {
    const [items, setItems] = useState([]);
    const [editModeItemId, setEditModeItemId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [totalSize, setTotalSize] = useState(0);
    const [itemSelectedFiles, setItemSelectedFiles] = useState({});
    const [isSold, setIsSold] = useState(false);

    const handleToggleClick = async (itemId) => {
        try {
            // Find the item with the given itemId
            const selectedItem = items.find((item) => item.id === itemId);

            // Determine the new value for is_sold
            const newIsSoldValue = selectedItem.is_sold === null ? 1 : null;

            // Make a PUT request to update the is_sold property
            const response = await axios.put(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/updateitemsold',
                {
                    itemId: itemId,
                    isSold: newIsSoldValue,
                }
            );

            // Check if the request was successful
            if (response.status === 200) {
                console.log(`Item with ID ${itemId} updated successfully`);
                // Update the state to reflect the change
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === itemId ? { ...item, is_sold: newIsSoldValue } : item
                    )
                );
            } else {
                console.error(`Error updating item with ID ${itemId}`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors as needed
        }
    };



    const handleFileChange = (itemId, e) => {
        const files = Array.from(e.target.files);

        // Check the size of each file and the total size
        const newTotalSize = files.reduce((acc, file) => acc + file.size, 0);

        // Check if the total size exceeds 6MB
        if (newTotalSize > 6 * 1024 * 1024) {
            setError('Total file size exceeds 6MB. Please remove some files.');
            setItemSelectedFiles((prevFiles) => ({ ...prevFiles, [itemId]: [] }));
            setTotalSize(0);
        } else {
            setError(null);
            setItemSelectedFiles((prevFiles) => ({ ...prevFiles, [itemId]: files }));
            setTotalSize(newTotalSize);
        }
    };

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
       
        // Set the item ID to enable the "Edit" mode for that row
        setEditModeItemId(itemId);
    };

    const handleSaveClick = async (itemId) => {
        // Get the item data for the updated item
        const updatedItem = items.find((item) => item.id === itemId);

        try {
            // Send a PUT request to update the item
            const response = await axios.put(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/updateitem',
                {
                    itemId: itemId,
                    itemData: updatedItem,
                }
            );

            alert('Item updated successfully! Please reload page');

         

            // Set the item ID to disable the "Edit" mode for that row
            setEditModeItemId(null);
        } catch (error) {
            alert('Item Was not updated');

          
        }
    };


    const handleDeleteClick = async (itemId) => {
        // Handle logic for deleting item with ID itemId
        try {
            // Make a POST request to the deleteitem endpoint
            const response = await axios.post(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/deleteitem',
                { itemId }
            );

            // Check if the deletion was successful
            if (response.status === 200) {
                alert('Item deleted successfully! Please reload page');

                // Remove the item from the state to trigger a re-render
                setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            } else {
                alert('Error deleting item. Please try again.');
            }

          
        } catch (error) {
            alert('Error deleting item. Please try again.');
           
        }
    };


    // Function to make text fields editable
    const makeEditable = (fieldName, itemId, value) => {
        // Cap the description to 50 words
        const cappedDescription = value.split(' ').slice(0, 50).join(' ');

        // Implement your logic to make the field editable
        return editModeItemId === itemId ? (
            <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(fieldName, itemId, e.target.value)}
                className="w-full border p-1"
            />
        ) : (
            cappedDescription
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

    const handleUploadClick = async (itemId) => {
        const files = itemSelectedFiles[itemId];

        if (!files || files.length === 0) {
            console.log('No files selected for upload');
            return;
        }

        const uploadPromises = [];
        const totalFiles = files.length;

        for (const [index, file] of files.entries()) {
            const uploadPromise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const imageBase64 = reader.result.split(',')[1];

                    try {
                        const response = await axios.post(
                            'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/uploadmoreimages',
                            { images: [imageBase64], itemId: itemId },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                onUploadProgress: (progressEvent) => {
                                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                    // You can update the progress if needed
                                },
                            }
                        );
                            alert("Upload successful, please reload page")
                        console.log(`Upload successful for file ${index + 1}/${totalFiles}`);
                        console.log('Response from server:', response.data);

                        if (response.status === 200) {
                            console.log('File uploaded successfully:', response.data);
                            resolve(response.data); // Resolve with the server response
                        } else {
                            console.error('Error uploading file. Server response:', response.data);
                            resolve(null); // Resolve with null in case of error
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error.message);
                        resolve(null); // Resolve with null in case of error
                    }
                };

                reader.readAsDataURL(file);
            });

            uploadPromises.push(uploadPromise);
        }

        // Wait for all image uploads to complete
        const uploadResponses = await Promise.all(uploadPromises);

        // Process the responses if needed
        console.log('All uploads successful');
        console.log('Upload responses:', uploadResponses);
    };

    // Function to delete an image
    const deleteImage = async (imageId, itemId) => {
        try {
            const response = await axios.post(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/deleteimage',
                {
                    itemId,
                    imageId,
                }
            );

            alert('Image Deleted successfully! Please reload page');

        } catch (error) {
            alert('Error Deleting image');
            console.error('Error deleting image:', error);

            if (error.response) {
            
            }
        }
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
                        <th className="border p-2">Features</th>
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
                                <FeaturesColumn item={item} editModeItemId={editModeItemId} handleFieldChange={handleFieldChange} />
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
                                    <div>
                                            <div className="mb-4" key={item.id}>
                                                <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-600">
                                                    Upload Additional Images : Please keep file sizes <b>below</b> 6mb
                                                </label>
                                                <input
                                                    type="file"
                                                    id="additionalImages"
                                                    name="additionalImages"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(item.id, e)}
                                                    multiple
                                                    className="mt-1 p-2 w-full border rounded-md"
                                                />

                                            </div>

                                            {itemSelectedFiles.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Selected Files:</p>
                                                    <ul>
                                                        {itemSelectedFiles.map((file, index) => (
                                                            <li key={index}>{file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {uploadProgress > 0 && (
                                                <div className="mb-4">
                                                    <p className="text-sm text-gray-500">Upload Progress: {uploadProgress}%</p>
                                                    <div className="bg-blue-200 h-2 w-full rounded-md">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-md"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex space-x-4 ">
                                               
                                                <button
                                                    onClick={() => handleUploadClick(item.id)}
                                                    className="bg-green-500  text-white p-2 rounded hover:bg-green-600"
                                                >
                                                    Upload more images
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateClick(item.id)}
                                                    className="bg-blue-500 text-white p-2 rounded"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleToggleClick(item.id)}
                                                    className={`bg-${item.is_sold ? 'red' : 'green'}-500 text-white p-2 rounded`}
                                                >
                                                    {item.is_sold ? 'Mark as Unsold' : 'Mark as Sold'}
                                                </button>
                                            </div>

                                    
                                        </div>
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
