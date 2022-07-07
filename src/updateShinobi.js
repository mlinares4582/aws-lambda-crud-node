const AWS = require('aws-sdk');
const uuid = require("uuid");

const updateShinobi = async (event) => {

    // try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { done  } = JSON.parse(event.body);

         await dynamodb.update({
            TableName: 'NarutoTable',
            Key: {id},
            UpdateExpression: 'set done = :done',
            ExpressionAttributeValues: {
                ":done": done,
              
            },
            ReturnValues: "ALL_NEW"
        }).promise();
            // console.log(result);

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Shinobi updated successfully',
            })
        };

    // } catch (error) {
    //     console.log(error);
    // }
};

module.exports = {
    updateShinobi,
}