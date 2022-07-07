const AWS = require('aws-sdk');

const getShinobi = async (event) => {

    try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();
            const { id } = event.pathParameters;
            const result = await dynamodb.get({
                TableName: 'NarutoTable',
                Key: {
                    id
                }
            }).promise();
            const shinobi = result.Item;
            return {
                status: 200,
                body: shinobi
            };
        }catch (error) {
        console.log(error);
    }
};

module.exports = {
    getShinobi,
}
