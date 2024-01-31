
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
        // Retrieve all items with their names from Trending table
        const selectQuery = `
    SELECT
        t.*,
        i.title AS itemName,
        i.price,
        GROUP_CONCAT(ii.image_url) AS image_urls
    FROM Trending t
    LEFT JOIN Items i ON t.itemid = i.id
    LEFT JOIN Item_images ii ON i.id = ii.item_id
    GROUP BY t.id;
`;

        const items = await executeQuery(selectQuery);

        console.log('Items retrieved successfully:', items);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Items retrieved successfully', items }),
        };
    } catch (error) {
        console.error('Error retrieving items:', error);
        console.error('Failed SQL query:', 'SELECT Trending.*, Items.name as itemName FROM Trending LEFT JOIN Items ON Trending.itemid = Items.id');

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
