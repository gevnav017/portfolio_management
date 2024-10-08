"use client";

import { createTheme, ThemeProvider } from "@mui/material";

import ContainerProvider from "./container";
import Header from "./header";
import Snackbar from "./snackbar";

// custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0077FF",
      light: "#56A5FF",
      dark: "#0054B3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#acb3bd",
      light: "#e9edf2",
      dark: "#858b94",
      contrastText: "#fff",
    },
    success: {
      main: "#1b5e20",
      light: "#43a047",
      dark: "#086e0c",
      contrastText: "#fff",
    },
    warning: {
      main: "#ffc107",
      light: "#ffd54f",
      dark: "#ff8f00",
      contrastText: "#fff",
    },
    danger: {
      main: "#db0f0f",
      light: "#d94141",
      dark: "#b00b0b",
      contrastText: "#fff",
    },
    background: {
      main: "#EEEEEE",
      light: "#f5f6f7",
      dark: "#bfbfbf",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "verdana",
  },
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ContainerProvider children={children} />
      <Snackbar />
    </ThemeProvider>
  );
};

export default Theme;
