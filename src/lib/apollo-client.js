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

// 🔐 Auth mode (here: API_KEY). Later you can swap to OPENID_CONNECT / COGNITO / IAM.
const auth = {
  type: "API_KEY", // "AMAZON_COGNITO_USER_POOLS" | "OPENID_CONNECT" | "AWS_IAM"
  apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
};

const httpLink = new HttpLink({ uri: url });

const authLink = createAuthLink({ url, region, auth });

// 3. Define the Subscription Link
const subscriptionLink = createSubscriptionHandshakeLink({ url, region, auth });

// This single link handles queries, mutations AND subscriptions.
const link = ApolloLink.from([authLink, subscriptionLink]);

const cache = new InMemoryCache({
  typePolicies: {
    PointResult: {
      // 🟢 ใช้ shopId แทน id มาตรฐาน
      keyFields: ["userId"],
      fields: {
        // ป้องกันข้อมูลหายเวลา Subscription ส่งมาไม่ครบทุกฟิลด์
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
    },
  },
});

export const graphqlClient = new ApolloClient({
  link,
  cache: cache,
  ssrMode: typeof window === "undefined",
  connectToDevTools: true,
});
