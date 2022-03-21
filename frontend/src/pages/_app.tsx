import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "src/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import Navbar from "src/components/layout/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={"container.lg"}>
        <Navbar />
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
