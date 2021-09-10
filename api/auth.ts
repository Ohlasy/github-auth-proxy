import { VercelRequest, VercelResponse } from "@vercel/node";
import randomstring from "randomstring";
import { oAuth2, config } from "./_oauth";

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  const authorizationUri = oAuth2.authorizeURL({
    redirect_uri: config.REDIRECT_URL,
    scope: config.OAUTH_SCOPES,
    state: randomstring.generate(32),
  });
  response.redirect(authorizationUri);
};
