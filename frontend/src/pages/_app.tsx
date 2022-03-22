import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo/apolloClient";
import theme from "src/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import Navbar from "src/components/layout/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW={"container.lg"}>
        <Navbar />

        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
