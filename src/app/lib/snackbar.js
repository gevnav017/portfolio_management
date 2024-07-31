import { enqueueSnackbar } from "notistack";

export const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };