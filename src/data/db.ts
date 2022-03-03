import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamoDbClient = new DynamoDBClient(
    {
        region: 'local',
        endpoint: 'http://localhost:8000',
        credentials: {
            accessKeyId: 'fake',
            secretAccessKey: 'fake'
        }
    }
);
