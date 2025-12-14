/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIFF_ID: "2007673367-ZQeDmr6D",
    APPSYNC_API_KEY: "da2-lemcp3muana6ldmsexvj2mj57m",
    APP_SYNC_REGION: "ap-southeast-1",
    APP_SYNC_URL:
      "https://d5prltbxr5hxflnzrlwgd624ue.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    APP_SYNC_WSS:
      "wss://d5prltbxr5hxflnzrlwgd624ue.appsync-realtime-api.ap-southeast-1.amazonaws.com/graphql",
  },
  allowedDevOrigins: ["https://sukfesta-liff-64.loca.lt"],
  async headers() {
    return [
      {
        source: "/:path*", // Match all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
