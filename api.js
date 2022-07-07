const db = require('./db');
const {
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    ScanCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');


const getShinobi = async (event) => {
    const response = { statusCode: 200};

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({shinobiId: event.pathParameters.shinobiId}),
        };
        const { Item } = await db.send(new GetItemCommand(params));
        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved shinobi",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        }); 
    } catch (e) {
        console.error(e);
        response.statusCode= 500;
        response.body = JSON.stringify({
            message: "Error retrieving shinobi",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


const createShinobi = async (event) => {
    const response = { statusCode: 200};

    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),
        };
        const createResult = await db.send(new PutItemCommand(params));
        
        response.body = JSON.stringify({
            message: "Successfully created shinobi",
            createResult,
        }); 
    } catch (e) {
        console.error(e);
        response.statusCode= 500;
        response.body = JSON.stringify({
            message: "Error creating shinobi",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


const updateShinobi = async (event) => {
    const response = { statusCode: 200};

    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({shinobiId: event.pathParameters.shinobiId}),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {})),

        };
        const updateResult = await db.send(new UpdateItemCommand(params));
        
        response.body = JSON.stringify({
            message: "Successfully updated shinobi",
            updateResult,
        }); 
    } catch (e) {
        console.error(e);
        response.statusCode= 500;
        response.body = JSON.stringify({
            message: "Error updated shinobi",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


const deleteShinobi = async (event) => {
    const response = { statusCode: 200};

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({shinobiId: event.pathParameters.shinobiId}),
        };
        const deleteResult = await db.send(new DeleteItemCommand(params));
        
        response.body = JSON.stringify({
            message: "Successfully deleted shinobi",
            deleteResult,
        }); 
    } catch (e) {
        console.error(e);
        response.statusCode= 500;
        response.body = JSON.stringify({
            message: "Error delete shinobi",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const detAllShinobi = async (event) => {
    const response = { statusCode: 200};

    try {
        
        const { Items } = await db.send(new ScanItemCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));
        
        response.body = JSON.stringify({
            message: "Successfully get All shinobi",
            data: Items.map((item) => unmarshall(item)),
            Items,
        }); 
    } catch (e) {
        console.error(e);
        response.statusCode= 500;
        response.body = JSON.stringify({
            message: "Error to get All shinobi",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


module.exports = {
    getShinobi,
    createShinobi,
    updateShinobi,
    deleteShinobi,
    detAllShinobi,
}