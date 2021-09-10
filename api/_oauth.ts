import { AuthorizationCode } from "simple-oauth2";

const env = process.env;

export const config = {
  GIT_HOSTNAME: env.GIT_HOSTNAME || "https://github.com",
  OAUTH_TOKEN_PATH: env.OAUTH_TOKEN_PATH || "/login/oauth/access_token",
  OAUTH_AUTHORIZE_PATH: env.OAUTH_AUTHORIZE_PATH || "/login/oauth/authorize",
  OAUTH_SCOPES: env.OAUTH_SCOPES || "repo,user",
  OAUTH_CLIENT_ID: env.OAUTH_CLIENT_ID || "",
  OAUTH_CLIENT_SECRET: env.OAUTH_CLIENT_SECRET || "",
  REDIRECT_URL: env.REDIRECT_URL || "",
};

export const oAuth2 = new AuthorizationCode({
  client: {
    id: config.OAUTH_CLIENT_ID,
    secret: config.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: config.GIT_HOSTNAME,
    tokenPath: config.OAUTH_TOKEN_PATH,
    authorizePath: config.OAUTH_AUTHORIZE_PATH,
  },
});
