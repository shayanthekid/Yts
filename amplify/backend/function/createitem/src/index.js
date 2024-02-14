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
        const { itemType, title, description, price, imageIds, featuresCar, featuresProperty, additionalFeatures } = event;
        const data = {
            itemType,
            title,
            description,
            price,
            images: imageIds,
            features: {
                featuresCar,
                featuresProperty,
                additionalFeatures
            },
        };
        console.log('Extracted data:', data);

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
            // Insert into the Items table
            const itemsInsertQuery = 'INSERT INTO Items (type, title, description, price) VALUES (?, ?, ?, ?)';
            const itemsInsertValues = [itemType, title, description, price];
            const itemsInsertResults = await executeQuery(itemsInsertQuery, itemsInsertValues);

            console.log('Items Insert Query:', itemsInsertQuery);
            console.log('Items Insert Values:', itemsInsertValues);

            const itemId = itemsInsertResults.insertId;

            // Insert images into the Item_images table
            if (imageIds && imageIds.length > 0) {
                const imageValues = imageIds.map((imageUrl) => [itemId, imageUrl]);
                const itemImagesInsertQuery = 'INSERT INTO Item_images (item_id, image_url) VALUES ?';
                await executeQuery(itemImagesInsertQuery, [imageValues]);

                console.log('Item Images Insert Query:', itemImagesInsertQuery);
                console.log('Item Images Insert Values:', [imageValues]);
            }

            // Insert features into the respective features table based on the item type
            let featuresId;
            switch (parseInt(itemType)) {
                case 1: // Car
                    const featuresCarInsertQuery = 'INSERT INTO features_car (sporty, economic, auto_transmission, seat_no, brand, transmission, color, fuel, make, Car_Insurance, CC, Minimum_Days, Kms_Day, extraFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const featuresCarInsertValues = [
                        featuresCar.sporty,
                        featuresCar.economic,
                        featuresCar.autoTransmission,
                        featuresCar.seatNo,
                        featuresCar.brand,
                        featuresCar.transmission,
                        featuresCar.color,
                        featuresCar.fuel,
                        featuresCar.make,
                        featuresCar.Car_Insurance,
                        featuresCar.CC,
                        featuresCar.Minimum_Days,
                        featuresCar.Kms_Day,
                        JSON.stringify(additionalFeatures) // Assuming additionalFeatures is already an object
                    ];
                    const featuresCarResult = await executeQuery(featuresCarInsertQuery, featuresCarInsertValues);

                    // Get the last inserted ID
                    featuresId = featuresCarResult.insertId;

                    console.log('Features Car Insert Query:', featuresCarInsertQuery);
                    console.log('Features Car Insert Values:', featuresCarInsertValues);
                    console.log('Features CarID:', featuresId);
                    break;
                case 2: // Property
                    const featuresPropertyInsertQuery = 'INSERT INTO features_property (parking, pet_friendly, modern_style, patio_space, swimming_pool, room_no, bathrooms, kitchen, in_house_chef, dinning_room, garden, living_room, washer_dryer, bbq_grill, carrom_board, badminton_net, extraFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const featuresPropertyInsertValues = [
                        featuresProperty.parking,
                        featuresProperty.pet_friendly,
                        featuresProperty.modernStyle,
                        featuresProperty.patioSpace,
                        featuresProperty.swimmingPool,
                        featuresProperty.roomNo,
                        featuresProperty.bathrooms,
                        featuresProperty.kitchen,
                        featuresProperty.inHouseChef,
                        featuresProperty.dinningRoom,
                        featuresProperty.garden,
                        featuresProperty.livingRoom,
                        featuresProperty.washerDryer,
                        featuresProperty.bbqGrill,
                        featuresProperty.carromBoard,
                        featuresProperty.badmintonNet,
                        JSON.stringify(additionalFeatures) // Assuming additionalFeatures is already an object
                    ];
                    const featuresPropertyResult = await executeQuery(featuresPropertyInsertQuery, featuresPropertyInsertValues);

                    // Get the last inserted ID
                    featuresId = featuresPropertyResult.insertId;

                    console.log('Features Property Insert Query:', featuresPropertyInsertQuery);
                    console.log('Features Property Insert Values:', featuresPropertyInsertValues);
                    break;
                case 3: // vacation
                    const featuresPropertyInsertQueryVacation = 'INSERT INTO features_property (parking, pet_friendly, modern_style, patio_space, swimming_pool, room_no, bathrooms, kitchen, in_house_chef, dinning_room, garden, living_room, washer_dryer, bbq_grill, carrom_board, badminton_net, extraFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const featuresPropertyInsertValuesVacation = 
                        [
                            featuresProperty.parking,
                            featuresProperty.pet_friendly,
                            featuresProperty.modernStyle,
                            featuresProperty.patioSpace,
                            featuresProperty.swimmingPool,
                            featuresProperty.roomNo,
                            featuresProperty.bathrooms,
                            featuresProperty.kitchen,
                            featuresProperty.inHouseChef,
                            featuresProperty.dinningRoom,
                            featuresProperty.garden,
                            featuresProperty.livingRoom,
                            featuresProperty.washerDryer,
                            featuresProperty.bbqGrill,
                            featuresProperty.carromBoard,
                            featuresProperty.badmintonNet,
                            JSON.stringify(additionalFeatures) // Assuming additionalFeatures is already an object
                        ];
                    const featuresPropertyResultVacation = await executeQuery(featuresPropertyInsertQueryVacation, featuresPropertyInsertValuesVacation);

                    // Get the last inserted ID for features_property
                    featuresId = featuresPropertyResultVacation.insertId;

                    console.log('Features Vacation Insert Query Vacation:', featuresPropertyInsertQueryVacation);
                    console.log('Features Vacation Insert Values Vacation:', featuresPropertyInsertValuesVacation);
                    console.log('Features Vacation Insert Result:', featuresPropertyResultVacation);
                    console.log('test');
                    break;
                // Add more cases for other types if needed
                default:
                    break;
            }

            // Insert into Item_features table
            const itemFeaturesInsertQuery = 'INSERT INTO Item_features (item_id, features_car, features_property) VALUES (?, ?, ?)';
            const itemFeaturesInsertValues = [itemId, itemType === '1' ? featuresId : null, itemType === '2' || itemType === '3' ? featuresId : null];


            await executeQuery(itemFeaturesInsertQuery, itemFeaturesInsertValues);

            console.log('Item Features Insert Query:', itemFeaturesInsertQuery);
            console.log('Item Features Insert Values:', itemFeaturesInsertValues);

            // Close the connection
            connection.end();

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Item created successfully', itemId }),
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