const axios = require('axios');

async function getUser(username, hostname) {
    console.log('Getting user: ' + username);
    if (!username) {
        process.emitWarning('No username provided');
        return {
            error: 'No username provided',
            status: 400,
            params: {
                username: username || 'undefined',
            },
        }
    }

    try {
        const { data } = await axios.get(`${process.env.URL}/api/v1/customname/${username}`);

        if (data.domain !== hostname) {
            return {
                error: 'User not found',
                status: 404,
                params: {
                    username: username || 'undefined',
                },
            }
        }
        
        return data;
    } catch (error) {
        return {
            error: error.message,
            status: 404,
            params: {
                username: username || 'undefined',
            },
            "backend-request": {
                url: `${process.env.URL}/api/v1/customname`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    username: username || 'undefined',
                },
            },
        }
    }
}

module.exports = getUser;
