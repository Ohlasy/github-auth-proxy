This is a simple app that makes it possible to authenticate [Netlify CMS](https://www.netlifycms.org) against GitHub. It runs on the Vercel serverless infrastructure.

## Configuration

The app is configured using environment variables, [see Vercel docs](https://vercel.com/docs/projects/environment-variables).

| Variable | Default | Comments
|---|---|---|
| `OAUTH_CLIENT_ID` | — | GitHub app ID, [see your GitHub settings page](https://github.com/settings/apps).
| `OAUTH_CLIENT_SECRET` | — | GitHub app secret
| `REDIRECT_URL` | — | The public URL this app is deployed at + `/callback`. Has to match the “Callback URL” setting of your GitHub app.
| `OAUTH_SCOPES` | `repo,user` | See [GitHub docs](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps) for possible values.
| `GIT_HOSTNAME` | `https://github.com`
| `OAUTH_TOKEN_PATH` | `/login/oauth/access_token`
| `OAUTH_AUTHORIZE_PATH` | `/login/oauth/authorize`

## Credits

The code is based on [marksteele/netlify-serverless-oauth2-backend](https://github.com/marksteele/netlify-serverless-oauth2-backend).