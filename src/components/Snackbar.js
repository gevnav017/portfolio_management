"use client";

import { SnackbarProvider } from "notistack";

const Snackbar = () => {
  return <SnackbarProvider maxSnack={4} autoHideDuration={5000} />;
};

export default Snackbar;
