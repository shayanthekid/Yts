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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Retrieve all bookings from Vacation_Rental_Dates table
        const selectQuery = 'SELECT * FROM Vacation_Rental_Dates';
        const bookings = await executeQuery(selectQuery);

        console.log('Bookings retrieved successfully:', bookings);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Bookings retrieved successfully', bookings }),
        };
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        console.error('Failed SQL query:', 'SELECT * FROM Vacation_Rental_Dates');

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
