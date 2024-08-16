import { NewOptionButtonDialog } from "./optionDialog";

import { Stack, Typography } from "@mui/material";

const Options = () => {
  return (
    <Stack spacing={3}>
      <Stack textAlign="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Options
        </Typography>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        <NewOptionButtonDialog />
      </Stack>

      {/* accordion */}
    </Stack>
  );
};

export default Options;
