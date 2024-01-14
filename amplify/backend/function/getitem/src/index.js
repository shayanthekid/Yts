
const AWS = require('aws-sdk');
const mysql = require('mysql');


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */



exports.handler = async (event) => {
    // RDS database configuration
    const dbConfig = {
        host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
        user: 'admin',
        password: 'bluecat123',
        database: 'ytsdb',
    };

    // Item ID to retrieve (replace with the actual ID)
    const itemId = 0;

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        // Query to retrieve one item by ID
        connection.query('SELECT * FROM Items WHERE id = ?', [itemId], (error, results) => {
            // Close the database connection
            connection.end();

            if (error) {
                console.error('Error retrieving item:', error);
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
                });
            } else {
                if (results.length > 0) {
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(results[0]),
                    });
                } else {
                    resolve({
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Item not found' }),
                    });
                }
            }
        });
    });
};