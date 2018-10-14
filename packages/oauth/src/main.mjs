/* Clients capable of maintaining the confidentiality of their
 * credentials (e.g., client implemented on a secure server with
 * restricted access to the client credentials), or capable of secure
 * client authentication using other means. */
const CLIENT_TYPE_CONFIDENTIAL = "CLIENT_TYPE_CONFIDENTIAL";

/* Clients incapable of maintaining the confidentiality of their
 * credentials (e.g., clients executing on the device used by the
 * resource owner, such as an installed native application or a web
 * browser-based application), and incapable of secure client
 * authentication via any other means. */
const CLIENT_TYPE_PUBLIC = "CLIENT_TYPE_PUBLIC";

const CLIENTS = [
  {
    type: CLIENT_TYPE_CONFIDENTIAL,
    redirection_urls: ["/yir"],
    identifier: "herp SPLIT TOKEN?",
    secret: "derp"
  }
];

function getClient(id) {}

function authenticateClient() {}

function auth(string) {
  const [type, value] = string.trim().split(" ");
  if (type.toLowerCase() === "basic") {
    const [id, secret] = atob(value).split(":");
  }
}

/*
generate (+store) authorization code
generate (+store) refresh token
generate (+store) access token
*/

// Authorization endpoint - used by the client to obtain
// authorization from the resource owner via user-agent redirection.
export async function authorization(ctx, options) {
  const { request, response } = ctx;

  const { response_type, client_id, redirect_uri, scope, state } = ctx.query;

  // check client-id/redirect-uri, show error directly if bad
  options.validateRedirectURI(client_id, redirect_uri)

  const code = options.generateCode();
  // is valid?

  // authenticate somehow

  //     HTTP/1.1 302 Found
  //Location: https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA
  //&state=xyz
  const redirectURI = new URL(redirect_uri);
  redirectURI.searchParams.set("code", code);
  redirectURI.searchParams.set("state", "STATE");
  ctx.redirect(redirectURI);
}
// Token endpoint - used by the client to exchange an authorization
// grant for an access token, typically with client authentication.
export function token(ctx, next) {
  const { body, headers } = ctx.request;

  if (headers["Authorization"]) {
  }

  const { grant_type, code, redirect_uri, client_id } = body;
}
