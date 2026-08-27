import { Router } from "express";
import { getCities } from "../services/city.service.js";

const router = Router();

router.get("/", async (_req, res) => {
  const cities = await getCities();

  res.json(cities);
});

export default router;