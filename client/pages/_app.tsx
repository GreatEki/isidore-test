import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <ApolloProvider client={client}>
      {domLoaded && (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </ApolloProvider>
  );
}
