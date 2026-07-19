import {MongoClient} from "mongodb";


const connect = async() => {
    try {
        const url = process.env.MONGO_DB;
        const dbName = process.env.DB_NAME;
        const client = new MongoClient(url!);
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected successfully to MongoDB server--');
        // await db.collection("init_collection").insertOne({ isCreated: true });
        // console.log(`Database '${dbName}' physically created and pushed to server.`);
        // const collectionWeather = await db.listCollections({ name: "weather_forecast" }).toArray();
        // console.log(collectionWeather);
//    if (collectionWeather.length > 0) {
//       console.log('::::1---schema::::');
//    } else {
//     console.log('::::1hhhh---schema::::');
//    }
        return db;
        
    } catch(error) {
        console.log('Failed to MongoDB server');
    } 
    
};

export default connect;