"use client";

// route imports
import { useForm, Controller } from "react-hook-form";
import useOptionsStore from "../../../store/optionsStore";

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

export default function AddOptionForm({ open, onClose }) {
  const { addOption, isLoading } = useOptionsStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const handleAddOption = async (formData) => {
    try {
      await addOption(formData);
      onClose();
      reset();
    } catch (err) {
      // Optionally show a snackbar or error message
    }
  };

  const handleDrawerClose = () => {
    reset();
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <form onSubmit={handleSubmit(handleAddOption)}>
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="Qty"
              control={control}
              defaultValue=""
              rules={{ required: "Qty is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Qty"
                  fullWidth
                  error={!!errors.Qty}
                  helperText={errors.Qty?.message}
                />
              )}
            />
            <Controller
              name="tradeDate"
              control={control}
              defaultValue=""
              rules={{ required: "Trade Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Trade Date"
                  fullWidth
                  error={!!errors.tradeDate}
                  helperText={errors.tradeDate?.message}
                />
              )}
            />
            <Controller
              name="Price"
              control={control}
              defaultValue=""
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  fullWidth
                  error={!!errors.Price}
                  helperText={errors.Price?.message}
                />
              )}
            />
            <Controller
              name="Strike"
              control={control}
              defaultValue=""
              rules={{ required: "Strike is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Strike"
                  fullWidth
                  error={!!errors.Strike}
                  helperText={errors.Strike?.message}
                />
              )}
            />
            <Controller
              name="Side"
              control={control}
              defaultValue=""
              rules={{ required: "Side is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Side"
                  fullWidth
                  error={!!errors.Side}
                  helperText={errors.Side?.message}
                />
              )}
            />
            <Controller
              name="Type"
              control={control}
              defaultValue=""
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type"
                  fullWidth
                  error={!!errors.Type}
                  helperText={errors.Type?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDrawerClose}
            disabled={isLoading}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={22} /> : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Drawer>
  );
}
