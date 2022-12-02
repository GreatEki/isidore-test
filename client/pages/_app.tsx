import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}
