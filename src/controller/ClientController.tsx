import type { Request, Response, NextFunction} from "express";
import connect from "../database/connect.js";
import { Client } from "../request/client.js";

import {getWeatherDataFromSqs} from "./consumeMessageController.js";


const saveClientDetails= async (request: Request, response: Response, next:NextFunction) => {

    if (!request.body.client_name || !request.body.client_id) {
        throw new Error("Missing fields");
    }
    await Client.parseAsync({ client_name: request.body.client_name, client_id: request.body.client_id }); 
    
    const DBCon = await connect();
    const collection = DBCon?.collection("clients");
    
    const result = await collection?.insertOne(request.body);

     return response.status(200).json({ 
            success: true,
            result: "Saved data in Mongo DB"
          });
}

export {saveClientDetails};