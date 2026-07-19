# ExpressJSMongo

# Start Docker

```docker-compose up```

# Run NPM install

```docker exec -it js-app npm install```

# Create copy .env.example

```docker exec -it js-app cp .env.example .env```

# Start project
```docker exec -it js-app npm run dev```

# Open borwser
```http://localhost:8071/```
# Create database in Mongo DB 
```Datebase Name: mongo_db```

# APIs

# Create WeatherForecast and pulish it to AWS SQS
```
http://localhost:3085/api/weather

Body: {
    "city":"Queenstown",
    "temperature":1
}

```