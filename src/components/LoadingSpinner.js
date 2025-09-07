import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
