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
  Typography,
} from "@mui/material";

export function UpdateDividendForm({ open, onClose, selected }) {
  const { updateSelected, isLoading } = useStocksStore();
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
      setValue("Qty", selected.Qty || "");
      setValue("DTE", selected.DTE || "");
      setValue("Price", selected.Price || "");
      setValue("Strike", selected.Strike || "");
      setValue("Side", selected.Side || "");
      setValue("Type", selected.Type || "");
      setValue("Credit", selected.Credit || "");
      setValue("Debit", selected.Debit || "");
    }
  }, [selected, setValue]);

  const handleUpdate = async (formData) => {
    try {
      await updateselected({ ...selected, ...formData });
      onClose();
      reset();
    } catch (err) {
      // selectedally show a snackbar or error message
    }
  };

  const handleDrawerClose = () => {
    reset();
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DialogTitle>Update selected</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="Qty"
              control={control}
              defaultValue={selected?.Qty || ""}
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
              name="DTE"
              control={control}
              defaultValue={selected?.DTE || ""}
              rules={{ required: "DTE is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DTE"
                  fullWidth
                  error={!!errors.DTE}
                  helperText={errors.DTE?.message}
                />
              )}
            />
            <Controller
              name="Price"
              control={control}
              defaultValue={selected?.Price || ""}
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
              defaultValue={selected?.Strike || ""}
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
              defaultValue={selected?.Side || ""}
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
              defaultValue={selected?.Type || ""}
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
            <Controller
              name="Credit"
              control={control}
              defaultValue={selected?.Credit || ""}
              rules={{ required: "Credit is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Credit"
                  fullWidth
                  error={!!errors.Credit}
                  helperText={errors.Credit?.message}
                />
              )}
            />
            <Controller
              name="Debit"
              control={control}
              defaultValue={selected?.Debit || ""}
              rules={{ required: "Debit is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Debit"
                  fullWidth
                  error={!!errors.Debit}
                  helperText={errors.Debit?.message}
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
          {`Are you sure you want to delete ${selected?.Symbol}?`}
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
