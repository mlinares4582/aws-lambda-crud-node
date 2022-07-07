const AWS = require('aws-sdk');

const deleteShinobi = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

     await dynamodb.delete({
        TableName: 'NarutoTable',
        Key: {
            id: event.pathParameters.id
        }
    }).promise();

    return {
        status: 200,
        body: JSON.stringify({
            message: 'Shinobi deleted successfully',
        })
    }
};


module.exports = {
    deleteShinobi,
}