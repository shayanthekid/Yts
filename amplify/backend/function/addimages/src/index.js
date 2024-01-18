/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Assume the request contains an array of images
        const images = event.images || [];
        const uploadPromises = [];

        for (const imageBase64 of images) {
            const decodedImage = Buffer.from(imageBase64, 'base64');
            const randomFileName = `${uuid.v4()}.jpg`;
            const params = {
                Bucket: 'ytsbucketfiles',
                Key: `images/${randomFileName}`,
                Body: decodedImage,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };

            console.log('Before S3 upload');

            // Start the S3 upload and store the promise
            const uploadPromise = s3.upload(params).promise();
            uploadPromises.push(uploadPromise);
        }

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        console.log('After S3 upload - Images uploaded successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Images uploaded successfully' }),
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
