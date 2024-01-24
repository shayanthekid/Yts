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
        // Parse the incoming JSON payload from the API Gateway
        const { bookingId, bookingData } = event;

        // Update the record in the Vacation_Rental_Dates table
        const updateQuery = 'UPDATE Vacation_Rental_Dates SET ? WHERE id = ?';
        await executeQuery(updateQuery, [bookingData, bookingId]);

        console.log('Booking updated successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Booking updated successfully' }),
        };
    } catch (error) {
        console.error('Error updating booking:', error);
        console.error('Failed SQL query:', 'UPDATE Vacation_Rental_Dates SET ? WHERE id = ?');

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
