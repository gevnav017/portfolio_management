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
  MenuItem,
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
        quantity: parseInt(formData.qty, 10),
        debit: formData.debit,
        credit: formData.credit,
        openDate: new Date(formData.openDate),
      };

      await addStock(data);
      onClose();
      reset();
    } catch (err) {
      console.error("Add Error: ", err);
      showSnackbar("Error adding stock", "error");
    }
  };

  const handleDrawerClose = () => {
    reset();
    onClose();
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
              name="debit"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purchase Price"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                  error={!!errors.purchasePrice}
                  helperText={errors.purchasePrice?.message}
                />
              )}
            />
            <Controller
              name="openDate"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Open Date"
                  fullWidth
                  type="date"
                  error={!!errors.openDate}
                  helperText={errors.openDate?.message}
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
