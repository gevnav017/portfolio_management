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

export default function AddDividendForm({ open, onClose }) {
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
        <DialogTitle>Add Dividend</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  fullWidth
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
            <Controller
              name="divDate"
              control={control}
              defaultValue=""
              rules={{ required: "Dividend Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dividend Date"
                  fullWidth
                  type="date"
                  error={!!errors.divDate}
                  helperText={errors.divDate?.message}
                  slotProps={{ inputLabel: { shrink: true } }}
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
