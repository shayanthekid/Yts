const mysql = require('mysql');

// Function to execute a query
const executeQuery = (query, values) => {
    const dbConfig = {
        host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
        user: 'admin',
        password: 'bluecat123',
        database: 'ytsdb',
    };

    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(dbConfig);
        connection.connect();

        connection.query(query, values, (error, results) => {
            connection.end();

            if (error) {
                console.error('Error executing query:', error);
                console.error('Failed query:', query);
                console.error('Query values:', values);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to get CORS headers
const getCORSHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    };
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Extract item ID from the request
        const { itemId } = event.queryStringParameters;

        if (!itemId) {
            return {
                statusCode: 400,
                headers: getCORSHeaders(),
                body: JSON.stringify({ message: 'Missing itemId parameter' }),
            };
        }

        // Step 1: Get booking data based on item ID
        const selectBookingsQuery = 'SELECT * FROM Vacation_Rental_Dates WHERE item_id = ?';
        const bookings = await executeQuery(selectBookingsQuery, [itemId]);

        console.log('Bookings retrieved successfully:', bookings);

        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({ message: 'Bookings retrieved successfully', bookings }),
        };
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        console.error('Failed SQL query:', 'SELECT * FROM Vacation_Rental_Dates WHERE item_id = ?');

        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
