import { Router } from "express";

import { getWeatherAnalytics } from "../services/analytics.service.js";
import { validateAccessToken } from "../middleware/auth0.middleware.js";

const router = Router();

router.get("/", validateAccessToken, async (_req, res) => {
  const analytics = await getWeatherAnalytics();

  res.json(analytics);
});

export default router;