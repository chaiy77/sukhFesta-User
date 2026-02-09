import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import RootLayout from "@/components/layout/layout";

const _inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Head>
        {/* 🟢 Viewport และ Metadata ต้องใส่ในนี้ */}
        <title>sukh-token</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="description" content="" />
        <meta name="theme-color" content="#3B82F6" />
      </Head>
      <main className={_inter.className}>
        <Component {...pageProps} />
      </main>
    </RootLayout>
  );
}
