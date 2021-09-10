import { VercelRequest, VercelResponse } from "@vercel/node";
import { oAuth2, config } from "./_oauth";

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

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  try {
    const token = await oAuth2.getToken({
      code: request.query.code as string,
      redirect_uri: config.REDIRECT_URL,
      scope: config.OAUTH_SCOPES,
    });
    const body = renderScript("success", {
      token: token.token.access_token,
      provider: "github",
    });
    response.status(200).send(body);
  } catch (error) {
    response.status(200).send(renderScript("error", error));
  }
};
