import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [totalSize, setTotalSize] = useState(0);
    const [imageIds, setImageIds] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Check the size of each file and the total size
        const newTotalSize = files.reduce((acc, file) => acc + file.size, 0);

        // Check if the total size exceeds 6MB
        if (newTotalSize > 6 * 1024 * 1024) {
            setError('Total file size exceeds 6MB. Please remove some files.');
            setSelectedFiles([]);
            setTotalSize(0);
        } else {
            setError(null);
            setSelectedFiles(files);
            setTotalSize(newTotalSize);
        }
    };

   


    const [itemType, setItemType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [featuresCar, setFeaturesCar] = useState({
        sporty: false,
        economic: false,
        autoTransmission: false,
        manualTransmission: false,
        seatNo: 0,
        brand: '',           // Added brand property
        transmission: '',    // Added transmission property
        color: '',           // Added color property
        fuel: '',            // Added fuel property
        make: '',            // Added make property
    });

    const [featuresProperty, setFeaturesProperty] = useState({
        parking: false,
        petFriendly: false,
        modernStyle: false,
        patioSpace: false,
        swimmingPool: false,
        roomNo: 0,
    });

    const handleItemTypeChange = (e) => {
        setItemType(e.target.value);
    };

    const handleFeaturesCarChange = (e) => {
        const { name, type, checked, value } = e.target;

        setFeaturesCar((prevFeaturesCar) => ({
            ...prevFeaturesCar,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFeaturesPropertyChange = (e) => {
        const { name, type, checked, value } = e.target;

        setFeaturesProperty((prevFeaturesProperty) => ({
            ...prevFeaturesProperty,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            console.log('No files selected');
            return;
        }

        const uploadPromises = [];
        const totalFiles = selectedFiles.length;

        for (const [index, file] of selectedFiles.entries()) {
            const uploadPromise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const imageBase64 = reader.result.split(',')[1];

                    try {
                        const response = await axios.post(
                            'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/uploadimages',
                            { images: [imageBase64] },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                onUploadProgress: (progressEvent) => {
                                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                    setUploadProgress(progress);
                                },
                            }
                        );

                        console.log(`Upload successful for file ${index + 1}/${totalFiles}`);
                        console.log('Response from server:', response.data);

                        if (response.status === 200) {
                            console.log('File uploaded successfully:', response.data);
                            const responseBody = JSON.parse(response.data.body);
                            const uploadedImageId = responseBody.imageIds[0];
                            resolve(uploadedImageId);
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
        const uploadedImageIds = await Promise.all(uploadPromises);

        // Filter out null values (in case of errors)
        const filteredImageIds = uploadedImageIds.filter((id) => id !== null);

        // Reset progress after all uploads
        setUploadProgress(0);

        console.log('All uploads successful');

        try {
            // Use filteredImageIds in the final post request
            const response = await axios.post(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/createitem',
                {
                    itemType,
                    title,
                    description,
                    price,
                    featuresCar,
                    featuresProperty,
                    imageIds: filteredImageIds,
                }
            );

            console.log('Response from createitem endpoint:', response.data);
            console.log("item type", itemType);
            // Handle the response from the createitem endpoint as needed
        } catch (error) {
            console.error('Error creating item:', error.message);
            // Handle errors
        }
    };



    return (
<div className="container mx-auto p-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

                <div className="mb-4">
                    <label htmlFor="itemType" className="block text-sm font-medium text-gray-600">
                        Item Type
                    </label>
                    <select
                        id="itemType"
                        name="itemType"
                        value={itemType}
                        onChange={handleItemTypeChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    >
                        <option value="">Select Item Type</option>
                        <option value="1">Car</option>
                        <option value="2">Property</option>
                        <option value="3">Vacation rentals</option>
                    </select>
                </div>
                

                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

            
                {itemType === '1' && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-4">Car Features</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="sporty"
                                    checked={featuresCar.sporty}
                                    onChange={handleFeaturesCarChange}
                                    className="form-checkbox"
                                />
                                <span>Sporty</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="economic"
                                    checked={featuresCar.economic}
                                    onChange={handleFeaturesCarChange}
                                    className="form-checkbox"
                                />
                                <span>Economic</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="autoTransmission"
                                    checked={featuresCar.autoTransmission}
                                    onChange={handleFeaturesCarChange}
                                    className="form-checkbox"
                                />
                                <span>Auto Transmission</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="manualTransmission"
                                    checked={featuresCar.manualTransmission}
                                    onChange={handleFeaturesCarChange}
                                    className="form-checkbox"
                                />
                                <span>Manual Transmission</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Seat Number</span>
                                <input
                                    type="number"
                                    name="seatNo"
                                    value={featuresCar.seatNo}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Brand</span>
                                <input
                                    type="text"
                                    name="brand"
                                    value={featuresCar.brand}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Transmission</span>
                                <input
                                    type="text"
                                    name="transmission"
                                    value={featuresCar.transmission}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Color</span>
                                <input
                                    type="text"
                                    name="color"
                                    value={featuresCar.color}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Fuel</span>
                                <input
                                    type="text"
                                    name="fuel"
                                    value={featuresCar.fuel}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Make</span>
                                <input
                                    type="text"
                                    name="make"
                                    value={featuresCar.make}
                                    onChange={handleFeaturesCarChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>
                        </div>
                    </div>
                )}
            


                {(itemType === '2' || itemType === '3') && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-4">Property Features</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="parking"
                                    checked={featuresProperty.parking}
                                    onChange={handleFeaturesPropertyChange}
                                    className="form-checkbox"
                                />
                                <span>Parking</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="petFriendly"
                                    checked={featuresProperty.petFriendly}
                                    onChange={handleFeaturesPropertyChange}
                                    className="form-checkbox"
                                />
                                <span>Pet Friendly</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="modernStyle"
                                    checked={featuresProperty.modernStyle}
                                    onChange={handleFeaturesPropertyChange}
                                    className="form-checkbox"
                                />
                                <span>Modern Style</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="patioSpace"
                                    checked={featuresProperty.patioSpace}
                                    onChange={handleFeaturesPropertyChange}
                                    className="form-checkbox"
                                />
                                <span>Patio Space</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="swimmingPool"
                                    checked={featuresProperty.swimmingPool}
                                    onChange={handleFeaturesPropertyChange}
                                    className="form-checkbox"
                                />
                                <span>Swimming Pool</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <span>Room Number</span>
                                <input
                                    type="number"
                                    name="roomNo"
                                    value={featuresProperty.roomNo}
                                    onChange={handleFeaturesPropertyChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </label>
                        </div>
                    </div>
                )}

               

              

       
                <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                        Upload Images : Please keep file sizes <b>below</b> 6mb
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {selectedFiles.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500">Selected Files:</p>
                        <ul>
                            {selectedFiles.map((file, index) => (
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

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Submit
                </button>

                    </form>
                </div>
    );
};

export default CreateItem;
