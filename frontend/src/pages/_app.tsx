import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;