const AWS = require('aws-sdk');

const getAllShinobi = async (event) => {

try{
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'NarutoTable',
    }).promise();

    const shinobi = result.Items;

    console.log(shinobi);

    return {
        status: 200,
        body: {
            shinobi
         }
        }
    }catch (error) {
        console.log(error);
    }

};

module.exports = {
    getAllShinobi,
}