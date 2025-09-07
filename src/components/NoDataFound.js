// MUI imports
import { Stack, Typography } from "@mui/material";
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";

const NoDataFound = ({ label, height, button }) => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      <FolderOffOutlinedIcon sx={{ fontSize: 40 }} />
      <Typography variant="caption" component="div">
        {label}
      </Typography>
      {button}
    </Stack>
  );
};

export default NoDataFound;
