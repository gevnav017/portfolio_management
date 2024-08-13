import { enqueueSnackbar } from "notistack";

export const showSnackbar = (message, variant) => {
  enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
      vertical: "top", // 'top' or 'bottom'
      horizontal: "center", // 'left', 'center', or 'right'
    },
  });
};
