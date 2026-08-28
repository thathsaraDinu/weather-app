const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

if (!auth0Domain) {
  throw new Error("AUTH0_DOMAIN is not configured");
}

if (!auth0Audience) {
  throw new Error("AUTH0_AUDIENCE is not configured");
}

export const auth0Config = {
  domain: auth0Domain,
  audience: auth0Audience,
} as const;