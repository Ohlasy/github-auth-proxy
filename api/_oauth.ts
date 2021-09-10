import { AuthorizationCode } from "simple-oauth2";

const secrets = {
  GIT_HOSTNAME: "https://github.com",
  OAUTH_TOKEN_PATH: "/login/oauth/access_token",
  OAUTH_AUTHORIZE_PATH: "/login/oauth/authorize",
  OAUTH_CLIENT_ID: "foo",
  OAUTH_CLIENT_SECRET: "bar",
  REDIRECT_URL: "http://localhost:3000/callback",
  OAUTH_SCOPES: "repo,user",
};

export const oAuth2 = new AuthorizationCode({
  client: {
    id: secrets.OAUTH_CLIENT_ID,
    secret: secrets.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: secrets.GIT_HOSTNAME,
    tokenPath: secrets.OAUTH_TOKEN_PATH,
    authorizePath: secrets.OAUTH_AUTHORIZE_PATH,
  },
});
