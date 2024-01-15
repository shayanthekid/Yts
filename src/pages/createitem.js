import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        // Check if a file is selected
        if (!selectedFile) {
            console.log('No file selected');
            return;
        }

        // Create FormData to append the file
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Make a POST request to the upload endpoint
            const response = await axios.post(
                'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/uploadimages',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Handle the response
            console.log('Upload successful:', response.data);
            // You can perform further actions based on the response
        } catch (error) {
            // Handle errors
            console.error('Error uploading file:', error.message);
            // You can display an error message or take appropriate actions
        }
    };

    // const [itemType, setItemType] = useState('');
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');

    // const [featuresCar, setFeaturesCar] = useState({
    //     sporty: false,
    //     economic: false,
    //     autoTransmission: false,
    //     manualTransmission: false,
    //     seatNo: 0,
    // });

    // const [featuresProperty, setFeaturesProperty] = useState({
    //     parking: false,
    //     petFriendly: false,
    //     modernStyle: false,
    //     patioSpace: false,
    //     swimmingPool: false,
    //     roomNo: 0,
    // });

    // const handleItemTypeChange = (e) => {
    //     setItemType(e.target.value);
    // };

    // const handleFeaturesCarChange = (e) => {
    //     const { name, type, checked, value } = e.target;

    //     setFeaturesCar((prevFeaturesCar) => ({
    //         ...prevFeaturesCar,
    //         [name]: type === 'checkbox' ? checked : value,
    //     }));
    // };

    // const handleFeaturesPropertyChange = (e) => {
    //     const { name, type, checked, value } = e.target;

    //     setFeaturesProperty((prevFeaturesProperty) => ({
    //         ...prevFeaturesProperty,
    //         [name]: type === 'checkbox' ? checked : value,
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // TODO: Handle form submission (send data to your backend)

    //     console.log({
    //         itemType,
    //         title,
    //         description,
    //         price,
    //         featuresCar,
    //         featuresProperty,
    //     });
    // };

    return (


        // <div className="container mx-auto p-8">
        //     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        //         <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

        //         <div className="mb-4">
        //             <label htmlFor="itemType" className="block text-sm font-medium text-gray-600">
        //                 Item Type
        //             </label>
        //             <select
        //                 id="itemType"
        //                 name="itemType"
        //                 value={itemType}
        //                 onChange={handleItemTypeChange}
        //                 className="mt-1 p-2 w-full border rounded-md"
        //                 required
        //             >
        //                 <option value="">Select Item Type</option>
        //                 <option value="car">Car</option>
        //                 <option value="property">Property</option>
        //                 <option value="property">Vacation rentals</option>
        //             </select>
        //         </div>
                

        //         <div className="mb-4">
        //             <label htmlFor="title" className="block text-sm font-medium text-gray-600">
        //                 Title
        //             </label>
        //             <input
        //                 type="text"
        //                 id="title"
        //                 name="title"
        //                 value={title}
        //                 onChange={(e) => setTitle(e.target.value)}
        //                 className="mt-1 p-2 w-full border rounded-md"
        //                 required
        //             />
        //         </div>

        //         <div className="mb-4">
        //             <label htmlFor="description" className="block text-sm font-medium text-gray-600">
        //                 Description
        //             </label>
        //             <textarea
        //                 id="description"
        //                 name="description"
        //                 value={description}
        //                 onChange={(e) => setDescription(e.target.value)}
        //                 className="mt-1 p-2 w-full border rounded-md"
        //                 required
        //             />
        //         </div>

        //         <div className="mb-4">
        //             <label htmlFor="price" className="block text-sm font-medium text-gray-600">
        //                 Price
        //             </label>
        //             <input
        //                 type="number"
        //                 id="price"
        //                 name="price"
        //                 value={price}
        //                 onChange={(e) => setPrice(e.target.value)}
        //                 className="mt-1 p-2 w-full border rounded-md"
        //                 required
        //             />
        //         </div>

            
        //         {itemType === 'car' && (
        //             <div className="mb-4">
        //                 <h3 className="text-xl font-semibold mb-4">Car Features</h3>

        //                 <div className="grid grid-cols-2 gap-4">
        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="sporty"
        //                             checked={featuresCar.sporty}
        //                             onChange={handleFeaturesCarChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Sporty</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="economic"
        //                             checked={featuresCar.economic}
        //                             onChange={handleFeaturesCarChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Economic</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="autoTransmission"
        //                             checked={featuresCar.autoTransmission}
        //                             onChange={handleFeaturesCarChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Auto Transmission</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="manualTransmission"
        //                             checked={featuresCar.manualTransmission}
        //                             onChange={handleFeaturesCarChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Manual Transmission</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Seat Number</span>
        //                         <input
        //                             type="number"
        //                             name="seatNo"
        //                             value={featuresCar.seatNo}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Brand</span>
        //                         <input
        //                             type="text"
        //                             name="brand"
        //                             value={featuresCar.brand}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Transmission</span>
        //                         <input
        //                             type="text"
        //                             name="transmission"
        //                             value={featuresCar.transmission}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Color</span>
        //                         <input
        //                             type="text"
        //                             name="color"
        //                             value={featuresCar.color}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Fuel</span>
        //                         <input
        //                             type="text"
        //                             name="fuel"
        //                             value={featuresCar.fuel}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Make</span>
        //                         <input
        //                             type="text"
        //                             name="make"
        //                             value={featuresCar.make}
        //                             onChange={handleFeaturesCarChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>
        //                 </div>
        //             </div>
        //         )}
            


        //         {itemType === 'property' && (
        //             <div className="mb-4">
        //                 <h3 className="text-xl font-semibold mb-4">Property Features</h3>

        //                 <div className="grid grid-cols-2 gap-4">
        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="parking"
        //                             checked={featuresProperty.parking}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Parking</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="petFriendly"
        //                             checked={featuresProperty.petFriendly}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Pet Friendly</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="modernStyle"
        //                             checked={featuresProperty.modernStyle}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Modern Style</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="patioSpace"
        //                             checked={featuresProperty.patioSpace}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Patio Space</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <input
        //                             type="checkbox"
        //                             name="swimmingPool"
        //                             checked={featuresProperty.swimmingPool}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="form-checkbox"
        //                         />
        //                         <span>Swimming Pool</span>
        //                     </label>

        //                     <label className="flex items-center space-x-2">
        //                         <span>Room Number</span>
        //                         <input
        //                             type="number"
        //                             name="roomNo"
        //                             value={featuresProperty.roomNo}
        //                             onChange={handleFeaturesPropertyChange}
        //                             className="border rounded-md p-2 w-full"
        //                         />
        //                     </label>
        //                 </div>
        //             </div>
        //         )}

               

        //         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        //             Submit
        //         </button>
        //     </form>
        // </div>

        <div className="container mx-auto p-8">
            <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

                {/* Other form fields go here */}

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {/* Display the selected file name (optional) */}
                {selectedFile && (
                    <p className="text-sm text-gray-500">Selected File: {selectedFile.name}</p>
                )}

                {/* Upload button */}
                <button
                    type="button"
                    onClick={handleUpload}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Upload Image
                </button>
            </form>
        </div>

    );
};

export default CreateItem;