import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    gradient: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    gradient?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  gradient: {
    main: "linear-gradient(98deg, #C6A7FE, #9155FD 94%)",
  },
  palette: {
    background: {
      default: "#F4F5FA",
    },
    common: {
      black: "#000",
      white: "#F4F5FA",
    },
    primary: {
      light: "#9E69FD",
      main: "#9155FD",
      dark: "#804BDF",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#9C9FA4",
      main: "#8A8D93",
      dark: "#777B82",
      contrastText: "#FFF",
    },
    success: {
      light: "#6AD01F",
      main: "#56CA00",
      dark: "#4CB200",
      contrastText: "#FFF",
    },
    error: {
      light: "#FF6166",
      main: "#FF4C51",
      dark: "#E04347",
      contrastText: "#FFF",
    },
    warning: {
      light: "#FFCA64",
      main: "#FFB400",
      dark: "#E09E00",
      contrastText: "#FFF",
    },
    info: {
      light: "#32BAFF",
      main: "#16B1FF",
      dark: "#139CE0",
      contrastText: "#FFF",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#D5D5D5",
      A200: "#AAAAAA",
      A400: "#616161",
      A700: "#303030",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
