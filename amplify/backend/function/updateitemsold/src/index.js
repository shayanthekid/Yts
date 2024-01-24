const mysql = require('mysql');

const dbConfig = {
    host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bluecat123',
    database: 'ytsdb',
};

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        const itemId = event.itemId;
        const isSold = event.isSold;

        // Update is_sold column in the database
        await updateIsSoldInDatabase(itemId, isSold);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            },
            body: JSON.stringify({ message: 'Item updated successfully' }),
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

async function updateIsSoldInDatabase(itemId, isSold) {
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    try {
        // Update is_sold column
        const updateQuery = `
            UPDATE Items
            SET is_sold = ?
            WHERE id = ?
        `;
        const updateValues = [isSold, itemId];

        await new Promise((resolve, reject) => {
            connection.query(updateQuery, updateValues, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } finally {
        connection.end();
    }
}
