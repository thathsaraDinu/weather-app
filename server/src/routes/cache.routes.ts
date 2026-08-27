import { Router } from "express";
import { getCacheStatus } from "../cache/weather.cache.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    entries: getCacheStatus(),
  });
});

export default router;