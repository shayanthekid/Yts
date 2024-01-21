
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

    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);

        // Data to be inserted (replace with actual data from the event)
        const inputData = {
            item_id: event.item_id,
            date: event.date,
            is_booked: event.is_booked,
            contactnumber: event.contactnumber,
            name: event.name,
        };
        inputData = JSON.parse(event.body);

        // Check if required properties are present
        const { item_id, date, is_booked, contactnumber, name } = inputData;


        // Insert data into Vacation_Rental_Dates table
        await connection.query('INSERT INTO Vacation_Rental_Dates SET ?', inputData);

        // Close the database connection
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data inserted successfully' }),
        };
    } catch (error) {
        console.error('Error inserting data:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};