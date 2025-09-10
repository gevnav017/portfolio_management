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

export default function CloseStockForm({ open, onClose, selected }) {
  const { closeStock, isLoading } = useStocksStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const handleCloseStock = async (formData) => {
    try {
      const data = {
        purchasePrice: parseFloat(formData.sellPrice),
        tradeDate: new Date(formData.sellDate),
      };

      await closeStock(selected.id, data);
      onClose();
      reset();
    } catch (err) {
      console.error("Close Error: ", err);
      showSnackbar("Error closing stock", "error");
    }
  };

  const handleDrawerClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <form onSubmit={handleSubmit(handleCloseStock)}>
        <DialogTitle>Close Stock</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="sellPrice"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sell Price"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                  error={!!errors.sellPrice}
                  helperText={errors.sellPrice?.message}
                />
              )}
            />
            <Controller
              name="sellDate"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sell Date"
                  fullWidth
                  type="date"
                  error={!!errors.sellDate}
                  helperText={errors.sellDate?.message}
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
            {isLoading ? <CircularProgress size={22} /> : "Close"}
          </Button>
        </DialogActions>
      </form>
    </Drawer>
  );
}
