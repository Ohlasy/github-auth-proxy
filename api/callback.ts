import { VercelRequest, VercelResponse } from "@vercel/node";

const simpleOauthModule = require("simple-oauth2");

const secrets = {
  GIT_HOSTNAME: "https://github.com",
  OAUTH_TOKEN_PATH: "/login/oauth/access_token",
  OAUTH_AUTHORIZE_PATH: "/login/oauth/authorize",
  OAUTH_CLIENT_ID: "foo",
  OAUTH_CLIENT_SECRET: "bar",
  REDIRECT_URL: "http://localhost:3000/callback",
  OAUTH_SCOPES: "repo,user",
};

function renderScript(message: string, payload: Record<string, string>) {
  return `<html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${message}:${JSON.stringify(payload)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
}

// TODO: Handle errors, see https://github.com/marksteele/netlify-serverless-oauth2-backend/blob/87ba8d9b1e382604d8071b64ff6749f4db8d7e44/auth.js#L100
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

  const options = {
    code: request.query.code,
  };
  const foo = await oauth2.authorizationCode.getToken(options);
  const token = oauth2.accessToken.create(foo);

  const body = renderScript("success", {
    token: token.token.access_token,
    provider: "github",
  });
  response.status(200).send(body);
};