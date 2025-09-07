// MUI imports
import { Stack, Typography, Divider, IconButton } from "@mui/material";

const TitleBar = ({ title, icon, onClick }) => {
  return (
    <Stack>
      <Stack
        justifyContent="flex-start"
        spacing={1}
        direction="row"
        alignItems="center"
      >
        {icon && (
          <IconButton
            onClick={onClick}
            sx={{
              display: { xs: "block", md: "none" },
              transform: "scaleX(-1)",
              width: 50,
              height: 50,
            }}
          >
            {icon}
          </IconButton>
        )}
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }} // take up all available space
        >
          {title}
        </Typography>
        {icon && (
          <IconButton
            onClick={onClick}
            sx={{
              display: { xs: "block", md: "none" },
              ml: "auto",
              width: 50,
              height: 50,
            }}
          >
            {icon}
          </IconButton>
        )}
      </Stack>
      <Divider
        flexItem
        orientation="horizontal"
        sx={{ flexGrow: 1, borderColor: "divider" }}
      />
    </Stack>
  );
};

export default TitleBar;

export const SubtitleBar = ({ subtitle }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="subtitle1" gutterBottom>
        {subtitle}
      </Typography>
    </Stack>
  );
};
