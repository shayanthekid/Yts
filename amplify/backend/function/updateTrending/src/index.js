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
        // Parse the request body
        const { id, description, percentage, itemid } = event;

        // Extract the data from the request body
   

        // Validate input data (you can add more validation logic as needed)
        if (!id || !itemid || !description || !percentage) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid input. Please provide all required fields.' }),
            };
        }

        // Check if the provided itemid exists in the Items table
        const checkItemQuery = 'SELECT * FROM Items WHERE id = ?';
        const itemExists = await executeQuery(checkItemQuery, [itemid]);

        if (itemExists.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid itemid. Item does not exist in the Items table.' }),
            };
        }

        // Update the Trending item in the database
        const updateQuery = 'UPDATE Trending SET itemid = ?, description = ?, percentage = ? WHERE id = ?';
        await executeQuery(updateQuery, [itemid, description, percentage, id]);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item updated successfully' }),
        };
    } catch (error) {
        console.error('Error updating item:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
