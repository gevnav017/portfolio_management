"use client";

import { SnackbarProvider } from "notistack";

const Snackbar = () => {
  return (
    <>
      <SnackbarProvider maxSnack={4} />
    </>
  );
};

export default Snackbar;
