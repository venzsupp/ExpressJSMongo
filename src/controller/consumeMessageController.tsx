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
          /*
        const awsClt = await awsClient();
        const res = await awsClt.send(new ReceiveMessageCommand(receiveParams));
        if (!res.Messages || res.Messages.length === 0) {
            console.log("No messages found in this poll.");
            return;
        }
          // console.log('===res===');
          // console.log(res);
        const httpStatus = res.$metadata.httpStatusCode;
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

        const msgHttpStatus = {"messages": messageBodies, "httpStatus": httpStatus};
        console.log(msgHttpStatus);
        */

        const msgHttpStatus = [
            {
                'name':'test name',
                'temperature': 12,
                'humidity': 2
            },
            {
                'name':'name1',
                'temperature': 10,
                'humidity': 4
            },
            {
                'name':'ud',
                'temperature': 1,
                'humidity': 5
            },
            {
                'name':'mani',
                'temperature': -1,
                'humidity': 10
            }
        ];
        console.log(msgHttpStatus);
        // const newmesg = msgHttpStatus.filter(item => item.temperature > 5);
        // const newmesg = msgHttpStatus.some(item => item.name === 'mani'); // true if found and false not found
       // const newmesg = msgHttpStatus.every(item => item.name === 'mani'); // true if found and false not found
        
       // -- make array with index and value
       // const newmesg = msgHttpStatus.entries(); 
        // for (const [index, element] of newmesg) {
        //     console.log(`Index: ${index}, Value: ${element.name}`);
        // }

        // ---- get array keys
        // const newmesg = msgHttpStatus.keys(); 
        // for (const index of newmesg) {
        //     console.log(`Index: ${index}`);
        // }

        // console.log(newmesg);

       const res =  msgHttpStatus.findLast(item => item.name === 'ud');
       console.log(res);
        // msgHttpStatus.reverse();
        
        // msgHttpStatus.sort((a,b) => a.temperature - b.temperature);
        // msgHttpStatus.sort((a,b) => a.name.localeCompare(b.name));
         return response.status(200).json({ 
            success: true,
            result: msgHttpStatus
          });
        // return msgHttpStatus;
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