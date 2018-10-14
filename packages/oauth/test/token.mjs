import tap from "tap";
import { authorize, token } from '../src/main.mjs';

let test_redirected = false;
const ctx = {
  query: {
    response_type: "code",
    client_id: "ID",
    redirect_uri: "https://localhost/redir",
    scope: "user",
    state: "SOMETHING"
  },
  redirect: url => {
    test_redirected = url.toString();
  }
};

authorize(ctx);

const url = new URL(test_redirected);
const code = url.searchParams.get('code');

token(ctx);

console.log(test_redirected)
tap.ok(test_redirected, "redirected");
