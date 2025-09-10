"use client";

// route imports
import { useMemo } from "react";
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
  InputAdornment,
} from "@mui/material";

export default function AddCoveredCallForm({ open, onClose, selected }) {
  const { addOption, isLoading } = useOptionsStore();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      side: "call", // always covered call
      quantity: 1,
      tradeDate: "",
      expirationDate: "",
      strike: "",
      price: "",
    },
  });

  const values = watch();
  // Covered call metrics
  const netCredit = useMemo(() => Number(values.price || 0), [values]);
  const maxProfit = useMemo(
    () => netCredit * 100 * Number(values.quantity || 0),
    [netCredit, values.quantity]
  );
  // Max loss is undefined for covered call (stock risk)
  const breakeven = useMemo(() => {
    const c = netCredit;
    const k = Number(values.strike || 0);
    return k + c;
  }, [values, netCredit]);

  const valid =
    Number(values.quantity) > 0 &&
    values.tradeDate &&
    values.expirationDate &&
    Number(values.strike) > 0 &&
    Number(values.price) > 0;

  const onSubmit = async (v) => {
    try {
      // Only covered call (sell call)
      const payload = {
        strategy: "Covered Call",
        side: "call",
        quantity: Number(v.quantity),
        tradeDate: v.tradeDate,
        expirationDate: v.expirationDate,
        legs: [
          {
            side: "single",
            type: "call",
            strike: Number(v.strike),
            price: Number(v.price),
            credit: Number(v.price),
            debit: 0,
          },
        ],
        metrics: { netCredit, maxProfit, breakeven },
      };
      await addOption(payload);
      reset();
      onClose?.();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Covered Call for {selected?.symbol}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity (contracts)"
                  type="number"
                  fullWidth
                />
              )}
            />
            <Controller
              name="tradeDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Trade Date"
                  fullWidth
                  type="date"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
            <Controller
              name="expirationDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expiration Date"
                  fullWidth
                  type="date"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
            <Controller
              name="strike"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Strike"
                  type="number"
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Call Price (credit)"
                  type="number"
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Stack sx={{ mt: 1 }}>
              <Typography variant="body2">
                Net Credit: ${netCredit.toFixed(2)} × 100 ×{" "}
                {values.quantity || 0} = $
                {(netCredit * 100 * (values.quantity || 0)).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Max Profit: ${(maxProfit || 0).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Breakeven: {breakeven.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !valid}
          >
            {isLoading ? <CircularProgress size={22} /> : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Drawer>
  );
}
