"use client";

// route imports
import { useForm, Controller } from "react-hook-form";
import { capAllLetters } from "../../lib/cap-letters";
import useStocksStore from "@/store/stocksStore";

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
  InputAdornment,
} from "@mui/material";
import { showSnackbar } from "@/lib/show-snackbar";

export default function AddStockForm({ open, onClose }) {
  const { addStock, isLoading } = useStocksStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const handleAddStock = async (formData) => {
    try {
      const data = {
        symbol: capAllLetters(formData.symbol),
        quantity: formData.qty,
        purchasePrice: formData.purchasePrice,
      };

      await addStock(data);
      onClose();
      reset();
    } catch (err) {
      showSnackbar("Error adding stock");
    }
  };

  const handleDrawerClose = () => {
    reset();
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <form onSubmit={handleSubmit(handleAddStock)}>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="symbol"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Symbol"
                  fullWidth
                  error={!!errors.symbol}
                  helperText={errors.symbol?.message}
                />
              )}
            />
            <Controller
              name="qty"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Qty"
                  fullWidth
                  error={!!errors.qty}
                  helperText={errors.qty?.message}
                />
              )}
            />
            <Controller
              name="purchasePrice"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purchase Price"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                  error={!!errors.purchasePrice}
                  helperText={errors.purchasePrice?.message}
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
