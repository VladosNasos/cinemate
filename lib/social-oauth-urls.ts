/* OAuth entry-points на бек-энде (фиксированные, без /api/v1) */
export const GOOGLE_OAUTH_URL =
  "http://cinemate.ddns.net:8081/oauth2/authorization/google" +
  "?redirect_uri=http://localhost:3000/oauth-success";
export const FACEBOOK_OAUTH_URL = "http://cinemate.ddns.net:8081/oauth2/authorization/facebook"
