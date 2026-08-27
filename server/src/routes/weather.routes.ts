import { Router } from "express";
import { getWeatherByCityCode } from "../services/weather.service.js";

const router = Router();

router.get("/:cityCode", async (req, res) => {
  const weather = await getWeatherByCityCode(req.params.cityCode);

  res.json(weather);
});

export default router;