const { v4 } = require('uuid');
const AWS =require('aws-sdk');


const addShinobi = async (event) =>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { name , clan } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newShinobi = {
        id, 
        name,
        clan,
        createdAt,
        done: false

    };

    await dynamodb.put({
        TableName: 'NarutoTable',
        Item: newShinobi
    }).promise();


    return {
        statuCode: 200,
        body: JSON.stringify(newShinobi)
    }

};


module.exports = {
    addShinobi,
}