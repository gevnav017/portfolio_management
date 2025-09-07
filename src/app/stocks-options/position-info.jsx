"use client";

// route imports
import { useForm, Controller } from "react-hook-form";
import useOptionsStore from "@/store/optionsStore";

// MUI imports
import {
  Drawer,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

export default function PositionInfo({ open, onClose, position }) {
  const handleDrawerClose = () => {
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <DialogTitle>Position Info</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography>
            <b>Qty:</b> {position?.Qty ?? "-"}
          </Typography>
          <Typography>
            <b>Trade Date:</b> {position?.tradeDate ?? "-"}
          </Typography>
          <Typography>
            <b>Price:</b> {position?.Price ?? "-"}
          </Typography>
          <Typography>
            <b>Strike:</b> {position?.Strike ?? "-"}
          </Typography>
          <Typography>
            <b>Side:</b> {position?.Side ?? "-"}
          </Typography>
          <Typography>
            <b>Type:</b> {position?.Type ?? "-"}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDrawerClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Drawer>
  );
}
