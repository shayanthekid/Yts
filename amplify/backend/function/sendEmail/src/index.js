const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        // Configure AWS SDK with your region and credentials
        AWS.config.update({ region: 'ap-southeast-1' }); // Replace with your AWS region

        // Create SES client
        const ses = new AWS.SES({ apiVersion: '2010-12-01' });

        // Handle form submission (assuming data is in the event body)
        const { name, email, contact, itemType, selectedItem, selectedDates } = event;
      

        // Prepare email content with form data
        const emailBody = `
  Name: ${name}
  Email: ${email}
  Contact: ${contact}
  Item Type: ${itemType}
  Selected Item: ${selectedItem}
  Booking Dates: ${selectedDates.map(date => new Date(date).toLocaleDateString()).join(', ')}
`;

        // Replace placeholders in the SES function
        const params = {
            Destination: {
                ToAddresses: ["ytsenterpriseltd@gmail.com"], // Replace with recipient's email
            },
            Message: {
                Subject: { Data: 'Contact Form Submission - Reservation Request' },
                Body: {
                    Text: { Data: emailBody }, // Optional HTML part: Html: { Data: '<p>...</p>' }
                },
            },
            Source: 'ytsenterpriseltd@gmail.com', // Replace with your verified sender address
        };

        const result = await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', result);
        return {
            statusCode: 200,
            body: 'Your reservation request has been submitted successfully!',
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: 'There was an error submitting your request. Please try again later.',
        };
    }
};
