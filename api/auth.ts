import { VercelRequest, VercelResponse } from "@vercel/node";
import randomstring from "randomstring";
import { oAuth2 } from "./_oauth";

const secrets = {
  REDIRECT_URL: "http://localhost:3000/callback",
  OAUTH_SCOPES: "repo,user",
};

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  const authorizationUri = oAuth2.authorizeURL({
    redirect_uri: secrets.REDIRECT_URL,
    scope: secrets.OAUTH_SCOPES,
    state: randomstring.generate(32),
  });
  response.redirect(authorizationUri);
};
