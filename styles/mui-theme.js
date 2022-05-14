import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const Byekan = {
  fontFamily: "BYekan",
  src: `
    url(./fonts/BYekan-webfont.ttf) format('ttf')
    url(./fonts/BYekan-webfont.eot) format('eot')
    url(./fonts/BYekan-webfont.woff) format('woff')
  `,
  fontStyle: "normal",
  fontWeight: "normal",
};

export let muiDarkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 576,
      sm: 577,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "BYekan",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#7fd4ff",
    },
    secondary: { main: "#141921", light: "#1b222d" },
    background: {
      default: "#141921",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
          direction: "rtl",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          fontFamily:
            "BYekan, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu ,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          lineHeight: 1.5,
          caretColor: "#1AB8FF",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        button: {
          all: "unset",
        },
        "*": {
          boxSizing: "border-box",
        },
        "@global": {
          "@font-face": [Byekan],
        },
      },
    },
  },
});

muiDarkTheme = responsiveFontSizes(muiDarkTheme);

export let muiLightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "BYekan",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1AB8FF",
    },
    secondary: { main: "#e2e8f3" },
    background: {
      default: "#e2e8f3",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            backgroundColor: "#c7c7c7",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#A9A9A9",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#A9A9A9",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#A9A9A9",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
          direction: "rtl",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          fontFamily:
            "BYekan, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu ,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          lineHeight: 1.5,
          caretColor: "#1AB8FF",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        button: {
          all: "unset",
        },
        "*": {
          boxSizing: "border-box",
        },
        "@global": {
          "@font-face": [Byekan],
        },
      },
    },
  },
});

muiLightTheme = responsiveFontSizes(muiLightTheme);
