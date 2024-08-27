const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.API_KEY;
    const city = 'Colombo'; 
    const url = `https://api.collectapi.com/pray/all?data.city=${city}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `apikey ${apiKey}`
            }
        });
        const data = await response.json();

        if (data.success) {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error fetching prayer times' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
