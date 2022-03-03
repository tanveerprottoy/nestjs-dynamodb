import { BatchGetItemCommand, DeleteItemCommand, GetItemCommand, PutItemCommand, PutItemCommandInput, ScanCommand, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { appendFile } from "fs";
import { dynamoDbClient } from "./db"
import { App } from "./models/app.entity"

export const putEntity = async (entity: App) => {
    const params: PutItemCommandInput = {
        TableName: 'Apps',
        Item: {
            id: { S: entity.id },
            name: { S: entity.name },
        },
    }
    try {
        const data = await dynamoDbClient.send(
            new PutItemCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

export const updateEntity = async (
    id: string,
    entity: App
) => {
    const params = {
        TableName: 'Apps',
        /*
        Convert the attribute JavaScript object you are updating to the required
        Amazon  DynamoDB record. The format of values specifies the datatype. The
        following list demonstrates different datatype formatting requirements:
        String: "String",
        NumAttribute: 1,
        BoolAttribute: true,
        ListAttribute: [1, "two", false],
        MapAttribute: { foo: "bar" },
        NullAttribute: null
         */
        Key: 'id',
        // Define expressions for the new or updated attributes
        // For example, "'set Title = :t, Subtitle = :s'"
        UpdateExpression: "set name = :n",
        ExpressionAttributeValues: {
            ":n": entity.name, // For example ':t' : 'NEW_TITLE'
        },
        ReturnValues: "ALL_NEW"
    };
    try {
        const data = await dynamoDbClient.send(
            new UpdateItemCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

export const getBatchEntitiesBykeys = async () => {
    const params = {
        RequestItems: {
            TABLE_NAME: {
                Keys: [
                    {
                        id: { S: 'id' },
                        name: { S: 'name' }
                    },
                ],
                ProjectionExpression: "id, name",
            },
        },
    };
    try {
        const data = await dynamoDbClient.send(
            new BatchGetItemCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

export const scanEntities = async () => {
    const params = {
        TableName: "Apps",
        // Specify which items in the results are returned.
        FilterExpression: "id = :id AND name = :name",
        // Define the expression attribute value, which are substitutes for the values you want to compare.
        ExpressionAttributeValues: {
            ":id": { S: "SubTitle2" },
            ":name": { N: "1" }
        },
        // Set the projection expression, which the the attributes that you want.
        ProjectionExpression: "id, name",
    };
    try {
        const data = await dynamoDbClient.send(
            new ScanCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

export const getEntity = async (id: string) => {
    const params = {
        TableName: "Apps", //TABLE_NAME
        Key: {
            id: { S: id },
        },
        ProjectionExpression: "name",
    };
    try {
        const data = await dynamoDbClient.send(
            new GetItemCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

export const deleteEntity = async (id: string) => {
    const params = {
        TableName: 'Apps', //TABLE_NAME
        Key: {
            id: { S: id },
        },
    };

    try {
        const data = await dynamoDbClient.send(
            new DeleteItemCommand(params)
        );
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}