import express from "express";
import router from "./routes/index.js";
import dotenv from 'dotenv';
import dbSchema from "./database/schema.js"


dotenv.config();

const app = express();

await dbSchema();
app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server running");
});