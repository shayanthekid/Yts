

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();


exports.handler = async (event) => {
    const formData = JSON.parse(event.body); // Assuming the form data is sent as JSON
    const imageBase64 = formData.image; // Assuming the image is sent as a base64-encoded string

    const decodedImage = Buffer.from(imageBase64, 'base64');
    // Generate a random file name using uuid
    const randomFileName = `${uuid.v4()}.jpg`;
    const params = {
        Bucket: 'ytsbucketfiles',
        Key: `images/${randomFileName}`, // Use the random file name
        Body: decodedImage,
        ContentType: 'image/jpeg', // Change the content type based on your image type
        ACL: 'public-read', // Optional: Set ACL as per your requirement
    };
  try {
        await s3.upload(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image uploaded successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};