import type { Request, Response, NextFunction} from "express";
import connect from "../database/connect.js";

import {getWeatherDataFromSqs} from "./consumeMessageController.js";
import { constrainedMemory } from "process";


const saveWeatherForecastInMon = async (request: Request, response: Response, next:NextFunction) => {
  
    const msgFromSQS = await getWeatherDataFromSqs(request, response, next);
    const DBCon = await connect();
    const collection = DBCon?.collection("weather_forecast");

    const cityName = msgFromSQS.map(item => item.city);
    const CollectionData = await collection?.find({city: {$in:cityName}}).collation({ locale: "en", strength: 2 }).toArray();
    const collectionCity = CollectionData?.map(item => item.city);
    const newMsgFromSQS = msgFromSQS?.filter(item => !collectionCity?.includes(item.city));
    // const newMsg = msgFromSQS?.filter(item => {
    //   const kl = collectionCity?.find(dd => {
    //     // console.log(dd.city +'==='+ item.city);
    //     if (dd === item.city) {
    //       return true;
    //     }
    //   });
    //   if (item.city != kl) {
    //     return true;
    //   }
    //   // const tt = collectionCity?.includes(item.city);
    //   // console.log(tt);
    //   //return item.city === 'Wellington'
    // });
    // console.log(newMsg);
  let resultMsg = 'Nothing saved';
  if (newMsgFromSQS?.length > 0) {
    const result = await collection.insertMany(newMsgFromSQS);
    if (result.acknowledged) {
      resultMsg = 'Saved successfully';
    }

  }

  return response.status(200).json({ 
    success: true,
    result: resultMsg
  });

}

const getWeatherForecastByCity = async(request: Request, response: Response, next:NextFunction) => {
    const cityName = request.params.cityName;
    const DBCon = await connect();
    const collection = DBCon?.collection("weather_forecast");
    
    const result = await collection?.find({city: cityName}).collation({ locale: "en", strength: 2 }).toArray();
    
    return response.status(200).json({ 
        success: true,
        result: result
      });
}

export { saveWeatherForecastInMon, getWeatherForecastByCity };