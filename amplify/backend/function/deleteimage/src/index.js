const AWS = require('aws-sdk');
const mysql = require('mysql');

const dbConfig = {
    host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bluecat123',
    database: 'ytsdb',
};

const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Extract item and image IDs from the event
        const itemId = event.itemId;
        const imageId = event.imageId;

        // Delete image from RDS database
        await deleteImageFromDatabase(itemId, imageId);

        // Delete image from S3 bucket
        await deleteImageFromS3(imageId);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                "Access-Control-Allow-Methods": "*",
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            },
            body: JSON.stringify({ message: 'Image deleted successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                "Access-Control-Allow-Methods": "*",
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            },
            body: JSON.stringify({
                message: 'Internal Server Error',
                errorStack: error.stack,
            }),
        };
    }
};

async function deleteImageFromDatabase(itemId, imageId) {
    // Connect to the database
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    try {
        // Implement the logic to delete the image from the database
        const deleteQuery = `
            DELETE FROM Item_images
            WHERE item_id = ? AND image_url = ?
        `;
        const values = [itemId, imageId];

        await new Promise((resolve, reject) => {
            connection.query(deleteQuery, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        console.log('Image deleted from database');
    } finally {
        // Close the database connection
        connection.end();
    }
}

async function deleteImageFromS3(imageId) {
    // Implement the logic to delete the image from the S3 bucket
    const deleteParams = {
        Bucket: 'ytsbucketfiles',
        Key: `images/${imageId}`,
    };

    await s3.deleteObject(deleteParams).promise();

    console.log('Image deleted from S3 bucket');
}
