const mysql = require('mysql');

const dbConfig = {
    host: 'database-yts.c5c0yu2iouhn.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bluecat123',
    database: 'ytsdb',
};

exports.handler = async (event) => {
    try {
        // Extract necessary data from the event (assuming it's coming from your form)
        const { itemId } = event;
        console.log('Extracted itemId:', itemId);

        // Create a connection to the database
        const connection = mysql.createConnection(dbConfig);

        // Connect to the database
        connection.connect();

        // Function to execute a query
        const executeQuery = (query, values) => {
            return new Promise((resolve, reject) => {
                connection.query(query, values, (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        try {
            // Delete from the Item_images table
            const itemImagesDeleteQuery = 'DELETE FROM Item_images WHERE item_id = ?';
            await executeQuery(itemImagesDeleteQuery, [itemId]);

            console.log('Item Images Delete Query:', itemImagesDeleteQuery);
            console.log('Item Images Delete Values:', [itemId]);

            // Delete from the Vacation_Rental_Dates table (assuming it exists)
            const vacationRentalDatesDeleteQuery = 'DELETE FROM Vacation_Rental_Dates WHERE item_id = ?';
            await executeQuery(vacationRentalDatesDeleteQuery, [itemId]);

            console.log('Vacation Rental Dates Delete Query:', vacationRentalDatesDeleteQuery);
            console.log('Vacation Rental Dates Delete Values:', [itemId]);

            // Delete from the Item_features table
            const itemFeaturesDeleteQuery = 'DELETE FROM Item_features WHERE item_id = ?';
            await executeQuery(itemFeaturesDeleteQuery, [itemId]);

            console.log('Item Features Delete Query:', itemFeaturesDeleteQuery);
            console.log('Item Features Delete Values:', [itemId]);

            // Delete from the features_car table (assuming it exists)
            const featuresCarDeleteQuery = 'DELETE FROM features_car WHERE id = (SELECT features_car FROM Item_features WHERE item_id = ?)';
            await executeQuery(featuresCarDeleteQuery, [itemId]);

            console.log('Features Car Delete Query:', featuresCarDeleteQuery);
            console.log('Features Car Delete Values:', [itemId]);

            // Delete from the features_property table (assuming it exists)
            const featuresPropertyDeleteQuery = 'DELETE FROM features_property WHERE id = (SELECT features_property FROM Item_features WHERE item_id = ?)';
            await executeQuery(featuresPropertyDeleteQuery, [itemId]);

            console.log('Features Property Delete Query:', featuresPropertyDeleteQuery);
            console.log('Features Property Delete Values:', [itemId]);

            // Delete from the Items table
            const itemsDeleteQuery = 'DELETE FROM Items WHERE id = ?';
            await executeQuery(itemsDeleteQuery, [itemId]);

            console.log('Items Delete Query:', itemsDeleteQuery);
            console.log('Items Delete Values:', [itemId]);

            // Close the connection
            connection.end();

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Item deleted successfully' }),
            };
        } catch (error) {
            console.error('Error:', error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal Server Error',
                    errorStack: error.stack,
                }),
            };
        }
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                errorStack: error.stack,
            }),
        };
    }
};
