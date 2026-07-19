import type { Request, Response, NextFunction} from "express";

import { Weather } from "../request/weather.js";
import awsClient, {SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand} from "../utils/awsClient.js";


const getWeatherDataFromSqs = async(request: Request, response: Response, next:NextFunction ) => {
    try {
        const receiveParams = {
            QueueUrl: process.env.SQS_URL,
            MaxNumberOfMessages: 10,  // AWS maximum limit per call
            WaitTimeSeconds: 20,       // Long Polling: Waits up to 20s for messages to arrive
            VisibilityTimeout: 30,     // Locks messages for 30s so others don't read them
          };
      
        const awsClt = await awsClient();
        const res = await awsClt.send(new ReceiveMessageCommand(receiveParams));
        if (!res.Messages || res.Messages.length === 0) {
            console.log("No messages found in this poll.");
            return;
          }

        const messageBodies = res.Messages.map(msg => {
            const parsedVal = JSON.parse(msg.Body);
            const {timestamp, ...restData} = parsedVal;
            // console.log('restData');
            // console.log(restData.data);
            restData.data.created = new Date (restData.data.created);
            // restData.data.map(resbody => (console.log(resbody)) );
            // const parseBody = restData.map(resBody => {
            //     const parsedBodyVal = JSON.parse(resBody);
            //     console.log(parsedBodyVal);
            // });
            // console.log(parseBody);
            return restData.data;
        });
        
        // const {timestamp, ...restData} = messageBodies;
        //   console.log('res.Messages');
        //   console.log(messageBodies);
          return messageBodies;
        // for (const msg of res.Messages) {
        //     const body = JSON.parse(msg.Body);
        //     console.log(`Processing message sequence:`, body);
        //   }
        // return response.status(200).json({ 
        //     success: true,
        //     result: messageBodies
        //   });
    } catch (error) {
        console.error(error);
        next(error);
    }
    
};

export {getWeatherDataFromSqs};