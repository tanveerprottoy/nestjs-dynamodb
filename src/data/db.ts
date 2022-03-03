import AWS from 'aws-sdk';

export const dynamoDb = new AWS.DynamoDB(
    {
        region: 'local', // process.env.AWS_REGION,
        endpoint: 'http://localhost:8000', // process.env.DB_ENDPOINT,
        credentials: {
            accessKeyId: 'fake',// process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: 'fake'// process.env.AWS_SECRET_ACCESS_KEY,
        }
    }
);

export const docClient = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    convertEmptyValues: true
}); 
