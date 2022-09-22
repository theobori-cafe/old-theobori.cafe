import type { AppProps } from "next/app";

import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className="mx-auto max-w-[40%]">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}


export default MyApp;
