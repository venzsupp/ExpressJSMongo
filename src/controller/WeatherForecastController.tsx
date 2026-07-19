import type { Request, Response, NextFunction} from "express";
import connect from "../database/connect.js";

import {getWeatherDataFromSqs} from "./consumeMessageController.js";


const saveWeatherForecastInMon = async (request: Request, response: Response, next:NextFunction) => {

    const url = process.env.MONGO_DB;
    const db = process.env.DB_NAME;
    // console.log(db);
    
    const msgFromSQS = await getWeatherDataFromSqs(request, response, next);
    console.log(msgFromSQS);
    const DBCon = await connect();
    const collection = DBCon?.collection("weather_forecast");
    
    const result = await collection.insertMany(msgFromSQS);

     return response.status(200).json({ 
            success: true,
            result: "Saved data in Mongo DB"
          });
}

const getWeatherForecastByCity = async(request: Request, response: Response, next:NextFunction) => {
    const cityName = request.params.cityName;
    console.log(cityName);
    const DBCon = await connect();
    const collection = DBCon?.collection("weather_forecast");
    
    const result = await collection?.find({city: cityName}).collation({ locale: "en", strength: 2 }).toArray();
    
    return response.status(200).json({ 
        success: true,
        result: result
      });
}

export { saveWeatherForecastInMon, getWeatherForecastByCity };