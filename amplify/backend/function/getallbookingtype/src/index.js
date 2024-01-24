const mysql = require('mysql');

const dbConfig = {
    host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bluecat123',
    database: 'ytsdb',
};

// Function to execute a query
const executeQuery = (query, values) => {
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
        // Extract type from the request
        const { type } = event.queryStringParameters;

        if (!type) {
            return {
                statusCode: 400,
                headers: getCORSHeaders(),
                body: JSON.stringify({ message: 'Missing type parameter' }),
            };
        }

        // Step 1: Get item IDs that match the specified type
        const selectItemIdsQuery = 'SELECT id FROM Items WHERE type = ?';
        const itemIds = await executeQuery(selectItemIdsQuery, [type]);

        if (itemIds.length === 0) {
            return {
                statusCode: 200,
                headers: getCORSHeaders(),
                body: JSON.stringify({ message: 'No items found for the specified type', bookings: [] }),
            };
        }

        // Extract item IDs from the result
        const itemIdsArray = itemIds.map(item => item.id);

        // Step 2: Get booking data based on item IDs
        const selectBookingsQuery = 'SELECT * FROM Vacation_Rental_Dates WHERE item_id IN (?)';
        const bookings = await executeQuery(selectBookingsQuery, [itemIdsArray]);

        console.log('Bookings retrieved successfully:', bookings);

        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({ message: 'Bookings retrieved successfully', bookings }),
        };
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        console.error('Failed SQL query:', 'SELECT * FROM Vacation_Rental_Dates');

        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
