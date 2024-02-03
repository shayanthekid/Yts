const AWS = require('aws-sdk');
const mysql = require('mysql');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // RDS database configuration
    const dbConfig = {
        host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
        user: 'admin',
        password: 'bluecat123',
        database: 'ytsdb',
    };


    // Extract itemId from the query string parameters
    const itemId = event.queryStringParameters.itemId; // Adjust the parameter name based on your API Gateway configuration

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        // Query to retrieve item details, features, and images by ID
        const query = `
    SELECT
        i.*,
        GROUP_CONCAT(ii.image_url) AS image_urls,
        CASE
            WHEN i.type = 1 THEN fc.sporty
            ELSE NULL
        END AS sporty,
        CASE
            WHEN i.type = 1 THEN fc.economic
            ELSE NULL
        END AS economic,
        CASE
            WHEN i.type = 1 THEN fc.auto_transmission
            ELSE NULL
        END AS auto_transmission,
        CASE
            WHEN i.type = 1 THEN fc.seat_no
            ELSE NULL
        END AS seat_no,
        CASE
            WHEN i.type = 1 THEN fc.brand
            ELSE NULL
        END AS brand,
        CASE
            WHEN i.type = 1 THEN fc.transmission
            ELSE NULL
        END AS transmission,
        CASE
            WHEN i.type = 1 THEN fc.color
            ELSE NULL
        END AS color,
        CASE
            WHEN i.type = 1 THEN fc.fuel
            ELSE NULL
        END AS fuel,
        CASE
            WHEN i.type = 1 THEN fc.make
            ELSE NULL
        END AS make,
        CASE
            WHEN i.type = 2 THEN fp.parking
            ELSE NULL
        END AS parking,
        CASE
            WHEN i.type = 2 THEN fp.pet_friendly
            ELSE NULL
        END AS pet_friendly,
        CASE
            WHEN i.type = 2 THEN fp.modern_style
            ELSE NULL
        END AS modern_style,
        CASE
            WHEN i.type = 2 THEN fp.patio_space
            ELSE NULL
        END AS patio_space,
        CASE
            WHEN i.type = 2 THEN fp.swimming_pool
            ELSE NULL
        END AS swimming_pool,
        CASE
            WHEN i.type = 2 THEN fp.room_no
            ELSE NULL
        END AS room_no,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.parking
            ELSE NULL
        END AS parking,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.pet_friendly
            ELSE NULL
        END AS pet_friendly,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.modern_style
            ELSE NULL
        END AS modern_style,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.patio_space
            ELSE NULL
        END AS patio_space,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.swimming_pool
            ELSE NULL
        END AS swimming_pool,
        CASE
            WHEN (i.type = 2 OR i.type = 3) THEN fp.room_no
            ELSE NULL
        END AS room_no
    FROM Items i
    LEFT JOIN Item_images ii ON i.id = ii.item_id
    LEFT JOIN Item_features ift ON i.id = ift.item_id
    LEFT JOIN features_car fc ON ift.features_car = fc.id AND i.type = 1
    LEFT JOIN features_property fp ON ift.features_property = fp.id AND (i.type = 2 OR i.type = 3)
    WHERE i.id = ?
    GROUP BY i.id;
`;



        connection.query(query, [itemId], (error, results) => {
            // Close the database connection
            connection.end();

            if (error) {
                console.error('Error retrieving item:', error);
                reject({
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    },
                    body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
                });
            } else {
                if (results.length > 0) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        },
                        body: JSON.stringify(results),
                    });
                } else {
                    resolve({
                        statusCode: 404,
                        headers: {
                            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        },
                        body: JSON.stringify({ message: 'Item not found' }),
                    });
                }
            }
        });
    });
};
