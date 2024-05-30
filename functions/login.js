// functions/login.js
exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://appletvgpt.netlify.app', // Allow from your specific origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true' // Allow credentials
      },
      body: JSON.stringify({ message: 'Login successful' })
    };
  };
  