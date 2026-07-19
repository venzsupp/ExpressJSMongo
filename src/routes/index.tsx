import { Router } from "express";
import { saveWeatherData } from "../controller/publishMessageControlller.js";
import { saveWeatherForecastInMon, getWeatherForecastByCity } from "../controller/WeatherForecastController.js";

import { saveClientDetails } from "../controller/ClientController.js";
const router = Router();

router.get("/health", (req, res) => {
  res.json({
    message: "API Index"
  });
});

router.post("/weather", saveWeatherData);
router.post("/receive_weather", saveWeatherForecastInMon);
router.get("/receive_weather/city=:cityName", getWeatherForecastByCity);

router.post("/client", saveClientDetails);

export default router;