const AWS = require('aws-sdk');
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
        const itemData = event.itemData;

        // Update item in the database
        await updateItemInDatabase(itemId, itemData);

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

async function updateItemInDatabase(itemId, itemData) {
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    try {
        // Update item details
        const updateQuery = `
            UPDATE Items
            SET title = ?, description = ?
            WHERE id = ?
        `;
        const updateValues = [itemData.title, itemData.description, itemId];

        await new Promise((resolve, reject) => {
            connection.query(updateQuery, updateValues, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        // Update features based on item type
        if (itemData.type === 1) {
            // Update car features
            await updateCarFeaturesInDatabase(itemId, itemData);
        } else if (itemData.type === 2 || itemData.type === 3) {
            // Update property features
            await updatePropertyFeaturesInDatabase(itemId, itemData);
        }
    } finally {
        connection.end();
    }
}

async function updateCarFeaturesInDatabase(itemId, itemData) {
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    try {
        // Update car features
        const updateCarFeaturesQuery = `
            UPDATE features_car
            SET sporty = ?, economic = ?, auto_transmission = ?,
                seat_no = ?, brand = ?, transmission = ?, color = ?,
                fuel = ?, make = ?
            WHERE id = ?
        `;
        const updateCarFeaturesValues = [
            itemData.sporty,
            itemData.economic,
            itemData.auto_transmission,
            itemData.seat_no,
            itemData.brand,
            itemData.transmission,
            itemData.color,
            itemData.fuel,
            itemData.make,
            itemId,
        ];

        await new Promise((resolve, reject) => {
            connection.query(updateCarFeaturesQuery, updateCarFeaturesValues, (error, results) => {
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

async function updatePropertyFeaturesInDatabase(itemId, itemData) {
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    try {
        // Update property features
        const updatePropertyFeaturesQuery = `
            UPDATE features_property
            SET parking = ?, pet_friendly = ?, modern_style = ?,
                patio_space = ?, swimming_pool = ?, room_no = ?
            WHERE id = ?
        `;
        const updatePropertyFeaturesValues = [
            itemData.parking,
            itemData.pet_friendly,
            itemData.modern_style,
            itemData.patio_space,
            itemData.swimming_pool,
            itemData.room_no,
            itemId,
        ];

        await new Promise((resolve, reject) => {
            connection.query(updatePropertyFeaturesQuery, updatePropertyFeaturesValues, (error, results) => {
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
