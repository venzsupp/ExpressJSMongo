import type { Request, Response, NextFunction} from "express";

import { Weather } from "../request/weather.js";
import awsClient, {SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand} from "../utils/awsClient.js";


const saveWeatherData = async(request: Request, response: Response, next:NextFunction ) => {
    try {
        if (!request.body.city || !request.body.temperature) {
            throw new Error("Missing fields");
        }
        const now = new Date();
        
        const currDate = now.toISOString();
        await Weather.parseAsync({ created: currDate, city: request.body.city, temperature: request.body.temperature }); 
        request.body.created = currDate;
        const { created, city, temperature } = request.body;
        const data = {
            created,
            city ,
            temperature
            };
        const command = new SendMessageCommand({
            QueueUrl:  process.env.SQS_URL,
            MessageBody: JSON.stringify({ data, timestamp: new Date() }),
            // DelaySeconds: 0, // Optional: Delay message delivery
            MessageGroupId: 'ExpressAppGroup', 
            MessageDeduplicationId: Date.now().toString(), 
        });
        const awsClt = await awsClient();
        const res = await awsClt.send(command);
        return response.status(200).json({ 
            success: true, 
            messageId: res.MessageId 
          });
    } catch (error) {
        console.error(error);
        next(error);
    }
    
};

export {saveWeatherData};