"use client";

// route imports
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import SessionProviderWrapper from "./SessionProviderWrapper";
import Snackbar from "./Snackbar";
import Nav from "./Nav";

// MUI imports
import { Container } from "@mui/material";

export default function AppProviders({ children }) {
  return (
    <ThemeProviderWrapper>
      <SessionProviderWrapper>
        <Nav />
        <Container maxWidth="xl" sx={{ pt: 10, pb: 6 }}>
          {children}
        </Container>
        <Snackbar />
      </SessionProviderWrapper>
    </ThemeProviderWrapper>
  );
}
