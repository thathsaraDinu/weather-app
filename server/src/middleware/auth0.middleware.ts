import { auth } from "express-oauth2-jwt-bearer";
import { auth0Config } from "../config/auth0.config.js";

export const validateAccessToken = auth({
  issuerBaseURL: `https://${auth0Config.domain}`,
  audience: auth0Config.audience,
});