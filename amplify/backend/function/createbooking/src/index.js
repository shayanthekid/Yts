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

let insertQuery; // Declare insertQuery in the outer scope
let inputData; // Declare inputData in the outer scope

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Data to be inserted (replace with actual data from the event)
        const { item_id, startDate, endDate, is_booked, contactnumber, name } = event;

        // Extract data from the event object
        inputData = {
            item_id,
            startDate,
            endDate,
            is_booked,
            contactnumber,
            name
        };

        // Check if required properties are present
        console.log('Data to be inserted:', inputData);

        // Insert data into Vacation_Rental_Dates table
        insertQuery = 'INSERT INTO Vacation_Rental_Dates (item_id, startdate, enddate, is_booked, contactnumber, name) VALUES (?, ?, ?, ?, ?, ?)';
        const insertValues = [item_id, startDate, endDate, is_booked, contactnumber, name];
        await executeQuery(insertQuery, insertValues);

        console.log('Data inserted successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data inserted successfully' }),
        };
    } catch (error) {
        console.error('Error inserting data:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            console.error('Duplicate entry error. This record may already exist in the database.');
        }

        console.error('Failed SQL query:', insertQuery);
        console.error('Query values:', inputData);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
