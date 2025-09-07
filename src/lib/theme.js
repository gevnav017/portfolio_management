import { createTheme } from "@mui/material/styles";

export const theme = (mode = "light") =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography: typography,
    components: components,
  });

export const lightPalette = {
  mode: "light",
  primary: { main: "#1976d2" },
  secondary: {
    main: "#909090ff",
    light: "#f0f0f0",
    contrastText: "#000000",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  action: {
    hover: "#50b3faff",
    selected: "#1976d2",
    contrastText: "#ffffff",
  },
  secondaryIcon: {
    main: "#888888ff",
    contrastText: "#000000",
    background: "#f0f0f0",
  },
};

export const darkPalette = {
  mode: "dark",
  primary: {
    main: "#90caf9", // light blue (good on dark)
    contrastText: "#000000",
  },
  secondary: {
    main: "#e9e9e9ff",
    contrastText: "#000000",
  },
  background: {
    default: "#121212", // main dark background
    paper: "#1e1e1e", // card/panel background
  },
  text: {
    primary: "#ffffff", // bright text for readability
    secondary: "#cccccc", // subdued but still readable
  },
  action: {
    hover: "#1e88e5", // stronger blue hover
    selected: "#1565c0", // deeper highlight
    contrastText: "#ffffff",
  },
  divider: "#2e2e2e", // subtle divider
  secondaryIcon: {
    main: "#9e9e9e",
    contrastText: "#ffffff",
    background: "#2e2e2e",
  },
};

export const typography = {
  fontFamily: [
    "Geist",
    "Geist Mono",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
  ].join(","),
  h1: { fontSize: "1.5rem" },
  h2: { fontSize: "1.4rem" },
  h3: { fontSize: "1.3rem" },
  h4: { fontSize: "1.2rem" },
  h5: { fontSize: "1.1rem" },
  h6: { fontSize: "1rem" },
  body1: { fontSize: "0.9rem" },
  body2: { fontSize: "0.8rem" },
  caption: { fontSize: "0.8rem" },
  button: { fontSize: "0.9rem", textTransform: "none" },
};

export const components = {
  MuiButton: {
    defaultProps: { size: "small" },
    styleOverrides: {
      contained: {
        boxShadow: "none",
        "&:hover, &:active, &:focus": { boxShadow: "none" },
      },
    },
  },
  MuiIconButton: {
    defaultProps: { size: "small" },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: { width: 375 },
    },
  },
};
