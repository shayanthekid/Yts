const AWS = require('aws-sdk');
const mysql = require('mysql');
const uuid = require('uuid');
const s3 = new AWS.S3();
const dbConfig = {
    host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bluecat123',
    database: 'ytsdb',
};

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        const images = event.images || [];
        const uploadPromises = [];
        const uploadedImageIds = [];

        const connection = mysql.createConnection(dbConfig);
        connection.connect();

        for (const imageBase64 of images) {
            const decodedImage = Buffer.from(imageBase64, 'base64');
            const randomFileName = `${uuid.v4()}.jpg`;
            const s3UploadParams = {
                Bucket: 'ytsbucketfiles',
                Key: `images/${randomFileName}`,
                Body: decodedImage,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };

            // Start the S3 upload and store the promise
            const uploadPromise = s3.upload(s3UploadParams).promise();
            uploadPromises.push(uploadPromise);

            // Store the UUID of the uploaded image
            uploadedImageIds.push(randomFileName);
        }

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        console.log('Images uploaded successfully to S3');

        // Perform database insertion into Item_images table
        const itemId = event.itemId; // Assuming itemId is passed in the event
        const insertImagePromises = uploadedImageIds.map(async (imageId) => {
            const dbInsertQuery = `INSERT INTO Item_images (item_id, image_url) VALUES (?, ?)`;
            return new Promise((resolve, reject) => {
                connection.query(dbInsertQuery, [itemId, imageId], (err, results) => {
                    if (err) {
                        console.error('Error inserting into Item_images table:', err);
                        reject(err);
                    } else {
                        console.log('Inserted into Item_images table:', results);
                        resolve(results);
                    }
                });
            });
        });

        // Wait for all database insertions to complete
        await Promise.all(insertImagePromises);

        console.log('Images inserted successfully into Item_images table');

        // Close the database connection
        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Images uploaded and inserted into database successfully', imageIds: uploadedImageIds }),
        };
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                errorStack: error.stack,
            }),
        };
    }
};
