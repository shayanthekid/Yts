

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();


exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));


    try {
        const imageBase64 = event.image;
        console.log('Received image data:', imageBase64);

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

        await s3.upload(params).promise();

        console.log('After S3 upload - Image uploaded successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image uploaded successfully' }),
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
                errorStack: error.stack, // Include the entire event object
            }),
        };
    }
};