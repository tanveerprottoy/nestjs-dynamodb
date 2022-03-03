import { CreateTableCommand, CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { dynamoDbClient } from '../db'

const params: CreateTableCommandInput = {
    TableName: 'App',
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

export async function initAppTable() {
    console.log('initAppTable');
    try {
        const data = await dynamoDbClient.send(
            new CreateTableCommand(params)
        );
        console.log("Table Created", data);
        return data;
    } catch(err) {
        console.log("Error", err);
    }
}  