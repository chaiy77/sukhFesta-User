// lib/apollo.js
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloLink,
// } from "@apollo/client";

// "use client";
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloLink,
// } from "@apollo/client";
// import { SetContextLink } from "@apollo/client/link/context";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from "@apollo/client/utilities";

// // --- CONFIGURATION VALUES ---
// const API_KEY = process.env.APPSYNC_API_KEY;
// const HTTP_URL = process.env.APP_SYNC_URL;
// // IMPORTANT: Use the AppSync real-time endpoint for WSS
// const WSS_URL = process.env.APP_SYNC_WSS;
// const AWS_REGION = process.env.APP_SYNC_REGION;

// // Inject auth per request (supports API key or a runtime JWT provider)
// const authLink = new ApolloLink((operation, forward) => {
//   const headers = {};
//   // If using OIDC, read token from your auth state (e.g., LIFF or a cookie)
//   const idToken =
//     typeof window !== "undefined"
//       ? window.localStorage.getItem("idToken")
//       : null;
//   if (idToken) headers["Authorization"] = idToken;
//   if (API_KEY) headers["x-api-key"] = API_KEY;

//   operation.setContext({ headers });
//   return forward(operation);
// });

// const httpLink = new HttpLink({ uri: HTTP_URL });

// const defaultHttpLink = ApolloLink.from([authLink, httpLink]);

// // --- 2. WebSocket Link for Subscriptions (Requires API Key in Connection Params) ---

// // AppSync requires the auth info to be Base64 encoded in the 'header' parameter of the connection URL
// const authPayload = JSON.stringify({
//   host: WSS_URL.replace("wss://", "").split("/")[0], // Extract just the hostname
//   "x-api-key": API_KEY,
// });
// const base64AuthPayload = btoa(authPayload);

// // The WSS connection URL needs to be constructed with the base64-encoded header and region
// const finalWssUrl = `${WSS_URL}?header=${base64AuthPayload}&payload={}`;

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: finalWssUrl,
//     // The connection logic is handled by the URL params for AppSync API_KEY
//     connectionParams: {},
//   })
// );

// // --- 3. Splitting Logic ---

// // Use `split` to route operations to the correct link
// const splitLink = ApolloLink.split(
//   // The first argument is a function that returns true or false
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription" // Route subscriptions to the WebSocket link
//     );
//   },
//   wsLink, // If true (is a subscription), use this link
//   defaultHttpLink // If false (is a query or mutation), use this link
// );

// export const graphqlClient = new ApolloClient({
//   link: splitLink, // Use the split link as the primary link
//   cache: new InMemoryCache(),
//   ssrMode: typeof window === "undefined",
// });

// // console.log("apollo-client => ", graphqlClient);

// // export default graphqlClient;

"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

const url = process.env.NEXT_PUBLIC_APP_SYNC_URL;
const region = process.env.NEXT_PUBLIC_APP_SYNC_REGION;

console.log(url);
console.log(region);

// 🔐 Auth mode (here: API_KEY). Later you can swap to OPENID_CONNECT / COGNITO / IAM.
const auth = {
  type: "API_KEY", // "AMAZON_COGNITO_USER_POOLS" | "OPENID_CONNECT" | "AWS_IAM"
  apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
};

const httpLink = new HttpLink({ uri: url });

// This single link handles queries, mutations AND subscriptions.
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

export const graphqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
