"use client";

// route imports
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useStocksStore from "@/store/stocksStore";

// MUI imports
import {
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Stack,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { capAllLetters } from "@/lib/cap-letters";
import { showSnackbar } from "@/lib/show-snackbar";

export function UpdateStockForm({ open, onClose, selected }) {
  const { updateStock, isLoading } = useStocksStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    if (selected) {
      setValue("symbol", selected.symbol || "");
      setValue("qty", selected.quantity || "");
      setValue("tradeDate", selected.tradeDate || "");
      setValue("purchasePrice", selected.purchasePrice || "");
    }
  }, [selected, setValue]);

  const handleUpdate = async (formData) => {
    try {
      const data = {
        symbol: capAllLetters(formData.symbol),
        quantity: parseInt(formData.qty, 10),
        tradeDate: new Date(formData.tradeDate),
        purchasePrice: parseFloat(formData.purchasePrice),
      };

      await updateStock(selected.id, data);
      onClose();
      reset();
    } catch (err) {
      console.error("Update Error: ", err);
      showSnackbar("Error updating stock", "error");
    }
  };

  const handleDrawerClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DialogTitle>Update Stock</DialogTitle>
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
              name="tradeDate"
              control={control}
              defaultValue={
                selected?.tradeDate
                  ? new Date(selected.tradeDate).toISOString().slice(0, 10)
                  : ""
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Trade Date"
                  type="date"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={field.onChange}
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
            {isLoading ? <CircularProgress size={22} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Drawer>
  );
}

export const DeleteStockForm = ({ open, onClose, selected }) => {
  const { deleteStock, isLoading } = useStocksStore();

  const handleDelete = async () => {
    try {
      await deleteStock(selected.id);
      onClose();
    } catch (error) {
      console.error("Error deleting stock: ", error);
      showSnackbar("Error deleting stock", "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete ${selected?.symbol} with ${selected?.quantity} shares?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="danger"
          disabled={isLoading}
          onClick={() => {
            handleDelete();
          }}
        >
          {isLoading ? <CircularProgress size={22} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
