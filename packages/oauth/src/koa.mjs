import fs from "fs";
import http from "http";
import https from "https";
import Koa from "koa";
import bodyparser from "koa-bodyparser";

import { authorization } from "./main.mjs";

var app = new Koa();



const AUTHORIZE_URL = 'https://localhost:3001/authorize'
const CLIENT = {
  type: 'CLIENT_TYPE_CONFIDENTIAL',
  redirect_uri: "https://localhost:3001/redirect",
  id: "herp SPLIT TOKEN?",
  secret: "derp"
};

let CODEGEN = 1000;
const AUTHENTICATION_CODES = [];
function generateCode() {
  return `abc${++CODEGEN}`;
}

const options = {
  generateCode,
  validateRedirectURI(id, redirectURI) {
    return (id == CLIENT.id && redirectURI === CLIENT.redirectURI)
  }
};

app.use(bodyparser());

app.use((ctx, next) => {
  if (ctx.path === "/authorize") return authorization(ctx, options);
  else next();
});

// OAUTH STOP

app.use((ctx, next) => {
  if (ctx.path !== "/redirect") return next();
  const { code, state } = ctx.query;

  ctx.body = code
});

app.use((ctx, next) => {
  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', CLIENT.id);
  url.searchParams.set('redirect_uri', 'CLIENT.redirect_uri');
  url.searchParams.set('scope', 'user');
  url.searchParams.set('state', 'STATE SECRETS');
  ctx.body = `<a href="${url}">authorize</a>`;
});

http.createServer(app.callback()).listen(3000);
https
  .createServer(
    {
      key: fs.readFileSync("ryans-key.pem"),
      cert: fs.readFileSync("ryans-cert.pem")
    },
    app.callback()
  )
  .listen(3001);
