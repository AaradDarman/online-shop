import Head from "next/head";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import Router from "next/router";

import RTL from "components/RTL";
import { muiDarkTheme, muiLightTheme } from "styles/mui-theme";
import { useDarkMode } from "utils/useDarkMode";
import createEmotionCache from "styles/createEmotionCache";
import AppContext from "context/AppContext";
import store from "redux/store";
import "styles/globals.css";
import "styles/Categories.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import _, { debounce } from "lodash";
import { saveState } from "utils/browser-storage";

const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div />;
  }

  store.subscribe(
    debounce(() => {
      if (_.isEmpty(store.getState().user?.user)) {
        saveState(store.getState().cart);
      }
    }, 800)
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>فروشگاه اینترنتی</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <link
          href="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <MuiThemeProvider
        theme={theme === "light" ? muiLightTheme : muiDarkTheme}
      >
        <ThemeProvider theme={theme === "light" ? muiLightTheme : muiDarkTheme}>
          <ToastContainer theme="dark" />
          <CssBaseline />
          <RTL>
            <Provider store={store}>
              <AppContext toggleTheme={toggleTheme}>
                {getLayout(<Component {...pageProps} />)}
              </AppContext>
            </Provider>
          </RTL>
        </ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
