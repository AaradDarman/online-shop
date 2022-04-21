import { useEffect, useState } from "react";

import Head from "next/head";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import RTL from "../components/RTL";
import { muiDarkTheme, muiLightTheme } from "../styles/mui-theme";
import createEmotionCache from "../styles/createEmotionCache";
import store from "../redux/store";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>فروشگاه اینترنتی</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MuiThemeProvider
        theme={theme === "light" ? muiLightTheme : muiDarkTheme}
      >
        <ThemeProvider theme={theme === "light" ? muiLightTheme : muiDarkTheme}>
          <ToastContainer theme="dark" />
          <CssBaseline />
          <RTL>
            <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
            </Provider>
          </RTL>
        </ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
