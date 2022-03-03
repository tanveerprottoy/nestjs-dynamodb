import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { docClient } from "./db"
import { App } from "./models/app.entity"

export const putEntity = async (entity: App) => {
    const params: DocumentClient.PutItemInput = {
        TableName: 'Apps',
        Item: {
            'id': entity.id,
            'name': entity.name
        }
    }
    docClient.put(params, function (err, data) {
        if(err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const getEntities = async () => {
    const params: DocumentClient.ScanInput = {
        TableName: 'Apps'
    }
    docClient.scan(params, function (err, data) {
        if(err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const getEntity = async (id: string) => {
    const params: DocumentClient.GetItemInput = {
        TableName: 'Apps',
        Key: {
            id: id
        }
    }
    docClient.get(params, function (err, data) {
        if(err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const deleteEntity = async (id: string) => {
    const params: DocumentClient.DeleteItemInput = {
        TableName: 'Apps',
        Key: {
            id: id
        }
    }
    docClient.delete(params, function (err, data) {
        if(err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}