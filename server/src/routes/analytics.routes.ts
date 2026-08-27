import { Router } from "express";
import { getWeatherAnalytics } from "../services/analytics.service.js";

const router = Router();

router.get("/", async (_req, res) => {
  const analytics = await getWeatherAnalytics();

  res.json(analytics);
});

export default router;