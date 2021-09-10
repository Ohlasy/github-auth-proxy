import { VercelRequest, VercelResponse } from "@vercel/node";

const simpleOauthModule = require("simple-oauth2");
const randomstring = require("randomstring");

const secrets = {
  GIT_HOSTNAME: "https://github.com",
  OAUTH_TOKEN_PATH: "/login/oauth/access_token",
  OAUTH_AUTHORIZE_PATH: "/login/oauth/authorize",
  OAUTH_CLIENT_ID: "foo",
  OAUTH_CLIENT_SECRET: "bar",
  REDIRECT_URL: "http://localhost:3000/callback",
  OAUTH_SCOPES: "repo,user",
};

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  const oauth2 = simpleOauthModule.create({
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

  // Authorization uri definition
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: secrets.REDIRECT_URL,
    scope: secrets.OAUTH_SCOPES,
    state: randomstring.generate(32),
  });

  response.redirect(authorizationUri);
};
