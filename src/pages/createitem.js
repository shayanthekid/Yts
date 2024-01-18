import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log('No file selected');
            return;
        }

        // Read the selected file as a base64-encoded string
        const reader = new FileReader();
        reader.onloadend = async () => {
            const imageBase64 = reader.result.split(',')[1]; // Extract base64 data
            console.log('Request payload from frontend:', { image: imageBase64 });

            try {
                const response = await axios.post(
                    'https://b9jdhxks0d.execute-api.ap-southeast-1.amazonaws.com/apidev/uploadimages',
                    { image: imageBase64 }, // Send image as an object
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Upload successful:', response.data);
                // Handle success if needed
            } catch (error) {
                console.error('Error uploading file:', error.message);
                // Handle errors
            }
        };

        // Read the selected file as a Data URL
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className="container mx-auto p-8">
            <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

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

                {selectedFile && (
                    <p className="text-sm text-gray-500">Selected File: {selectedFile.name}</p>
                )}

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
