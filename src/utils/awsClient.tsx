import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const awsClient = async() => {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    const sqsClient = new SQSClient({ 
        region: "ap-southeast-2", // e.g., Sydney or your local region
        credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "YOUR_ACCESS_KEY",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "YOUR_SECRET_KEY"
        } 
    });
    return sqsClient;
}
export default awsClient;

export {SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand };

