# ExpressJSMongo

# Tech Specification
```
1. Docker Desktop
2. Express JS
3. Mongo DB
4. Mongo DB Express - UI
5. AWS - SQS
```
# Clone project
```git clone ----```

# Start Docker

```docker-compose up```

# Run NPM install

```docker exec -it js-app npm install```

# Create copy .env.example

```docker exec -it js-app cp .env.example .env```

# Start project
```docker exec -it js-app npm run dev```

# Open borwser - to see Mongo DB UI presentation locally
```http://localhost:8071/```
# Create database in Mongo DB 
```Datebase Name: mongo_db```

# APIs

# Create WeatherForecast and publish it to AWS SQS
```
http://localhost:3085/api/weather

Body: {
    "city":"Queenstown",
    "temperature":1
}

```

# Save it to Mongo DB in bulk from AWS SQS in batch
```
http://localhost:3085/api/receive_weather - POST


```

# Get weather data based on city from Mongo DB
```
http://localhost:3085/api/receive_weather/city=christchurch - GET


```

# Save client data in Mongo DB

```
http://localhost:3085/api/client

Body: {
    "client_id":"HGJjkk",
    "client_name":"Test Client"
}

```