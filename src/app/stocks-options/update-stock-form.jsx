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
      setValue("side", selected.side || "");
      setValue("credit", selected.credit || "");
      setValue("debit", selected.debit || "");
    }
  }, [selected, setValue]);

  const handleUpdate = async (formData) => {
    try {
      await updateStock({ ...selected, ...formData });
      onClose();
      reset();
    } catch (err) {
      // selectedally show a snackbar or error message
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
            <Controller
              name="side"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Side"
                  fullWidth
                  error={!!errors.side}
                  helperText={errors.side?.message}
                >
                  <MenuItem value="Buy">Buy</MenuItem>
                  <MenuItem value="Sell">Sell</MenuItem>
                </TextField>
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
                  InputLabelProps={{ shrink: true }}
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
  const handleDelete = async () => {
    try {
      await deleteSelected(selected.id);
      onClose();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
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
          {`Are you sure you want to delete ${selected?.symbol}?`}
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
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
