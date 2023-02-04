//next functions
import type { AppProps } from "next/app";
import Head from "next/head";

//react
import { FC, useEffect, useState } from "react";

//style
import "@/styles/globals.scss";

//redux
import { Provider } from "react-redux";
import store from "../redux/store";
import { saveUserData } from "@/redux/duck/user";
import { setGeneral } from "@/redux/duck/general";
import { useDispatch } from "react-redux";

//mui
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/muiTheme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Beije web-app for Onlus organizations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </>
  );
};
export default App;
