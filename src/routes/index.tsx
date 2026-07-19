import { Router } from "express";
import { saveWeatherData } from "../controller/publishMessageControlller.js";
import { saveWeatherForecastInMon, getWeatherForecastByCity } from "../controller/WeatherForecastController.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    message: "API Index"
  });
});

router.post("/weather", saveWeatherData);
router.post("/receive_weather", saveWeatherForecastInMon);
router.get("/receive_weather/city=:cityName", getWeatherForecastByCity);
// router.get("/user", getUser);
// router.get("/user/:userId", getUserById);

export default router;