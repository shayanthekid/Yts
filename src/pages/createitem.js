import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [totalSize, setTotalSize] = useState(0);

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

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            console.log('No files selected');
            return;
        }

        const uploadPromises = [];
        const totalFiles = selectedFiles.length;

        for (const [index, file] of selectedFiles.entries()) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageBase64 = reader.result.split(',')[1];

                try {
                    // Use axios to upload the image and track the progress
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
                } catch (error) {
                    console.error('Error uploading file:', error.message);
                    // Handle errors
                }
            };

            reader.readAsDataURL(file);
        }

        // Reset progress after all uploads
        setUploadProgress(0);

        console.log('All uploads successful');
    };

    return (
        <div className="container mx-auto p-8">
            <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
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

                <button
                    type="button"
                    onClick={handleUpload}
                    className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${totalSize > 6 * 1024 * 1024 ? 'opacity-50 cursor-not-allowed bg-red-500' : ''
                        }`}
                    disabled={totalSize > 6 * 1024 * 1024}
                >
                    Upload Images
                </button>
            </form>
        </div>
    );
};

export default CreateItem;
