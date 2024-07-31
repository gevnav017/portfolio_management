import ListMenu from "./menuList";

import { getCategories } from "../api/category/route";

import {
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  ExpandMore,
  ExpandLess,
} from "@mui/material";

const Settings = async () => {
  const { categories } = await getCategories();

  return (
    <Stack spacing={3}>
      <Stack align="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
      </Stack>

      {/* side menu and main section */}
      <ListMenu categories={categories} />
    </Stack>
  );
};

export default Settings;
