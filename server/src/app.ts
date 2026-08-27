import express from "express";
import cors from "cors";
import cityRouter from "./routes/city.routes.js";
import weatherRouter from "./routes/weather.routes.js";
import cacheRouter from "./routes/cache.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/cities", cityRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/cache", cacheRouter);
app.use("/api/analytics", analyticsRouter);

app.use(errorMiddleware);

export default app;