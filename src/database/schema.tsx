
import connect from "./connect.js";

const dbSchema = async() => {
    const DBCon = await connect();
    // const collection = DBCon?.collection('weather_forecast');
   const collectionWeather = await DBCon.listCollections({ name: "weather_forecast" }).toArray();
   if (collectionWeather.length == 0) {
      console.log('::::1---schema::::');
      await DBCon?.createCollection("weather_forecast", {
         validator: {
            $jsonSchema: {
               bsonType: "object",
               required: [ "created", "temperature", "city" ], // Enforces these fields exist
               properties: {
                created: {
                     bsonType: "date",
                     description: "must be a date and is required"
                  },
                  temperature: {
                     bsonType: "int",
                     description: "must be a double and is required"
                  },
                  city: {
                     bsonType: "string",
                     description: "must be a string"
                  }
               }
            }
         }
      });
   }
    
   const collectionClient = await DBCon.listCollections({ name: "clients" }).toArray();
   if (collectionClient.length == 0) {
      console.log('::::2---schema::::');
      await DBCon?.createCollection("clients", {
         validator: {
            $jsonSchema: {
               bsonType: "object",
               required: [ "client_name", "client_id" ], // Enforces these fields exist
               properties: {
                  client_name: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  client_id: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  }
               }
            }
         }
      });
   }
     
}
export default dbSchema;