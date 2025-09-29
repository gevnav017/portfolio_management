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
  MenuItem,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from "@mui/material";

export default function AddOptionForm({ open, onClose, symbol }) {
  const { addOption, isLoading } = useOptionsStore();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      symbol: "",
      strategy: "spread", // "spread" | "single"
      side: "call", // "call" | "put"
      quantity: 1,
      tradeDate: "",
      expirationDate: "",
      // single
      singleAction: "sell", // "sell" = credit, "buy" = debit
      singleStrike: "",
      singlePrice: "",
      // spread legs
      shortStrike: "",
      shortPrice: "",
      longStrike: "",
      longPrice: "",
    },
  });

  const values = watch();
  const netCredit = useMemo(() => {
    if (values.strategy !== "spread") return 0;
    const s = Number(values.shortPrice || 0);
    const l = Number(values.longPrice || 0);
    return Math.max(0, s - l);
  }, [values]);

  const width = useMemo(() => {
    if (values.strategy !== "spread") return 0;
    const a = Number(values.shortStrike || 0);
    const b = Number(values.longStrike || 0);
    return Math.abs(a - b);
  }, [values]);

  const maxProfit = useMemo(
    () => netCredit * 100 * Number(values.quantity || 0),
    [netCredit, values.quantity]
  );
  const maxLoss = useMemo(
    () => Math.max(0, width - netCredit) * 100 * Number(values.quantity || 0),
    [width, netCredit, values.quantity]
  );
  const breakeven = useMemo(() => {
    if (values.strategy !== "spread") return 0;
    const c = netCredit;
    const k = Number(values.shortStrike || 0);
    return values.side === "call" ? k + c : k - c;
  }, [values, netCredit]);

  const validSpread =
    values.strategy === "spread" &&
    Number(values.quantity) > 0 &&
    values.tradeDate &&
    values.expirationDate &&
    Number(values.shortStrike) > 0 &&
    Number(values.longStrike) > 0 &&
    Number(values.shortPrice) > 0 &&
    Number(values.longPrice) >= 0 &&
    (values.side === "call"
      ? Number(values.longStrike) > Number(values.shortStrike)
      : Number(values.longStrike) < Number(values.shortStrike));

  const validSingle =
    values.strategy === "single" &&
    Number(values.quantity) > 0 &&
    values.tradeDate &&
    values.expirationDate &&
    Number(values.singleStrike) > 0 &&
    Number(values.singlePrice) > 0;

  const valid = values.strategy === "spread" ? validSpread : validSingle;

  const onSubmit = async (formData) => {
    try {
      let data;

      if (formData.strategy === "spread") {
        data = {
          symbol: formData.symbol,
          quantity: Number(formData.quantity),
          strategy: formData.strategy,
          tradeDate: new Date(formData.tradeDate),
          expirationDate: new Date(formData.expirationDate),
          legs: [
            {
              side: "short",
              type: formData.side,
              strike: Number(formData.shortStrike),
              credit: Number(formData.shortPrice),
              debit: 0,
            },
            {
              side: "long",
              type: formData.side,
              strike: Number(formData.longStrike),
              credit: 0,
              debit: Number(formData.longPrice),
            },
          ],
          metrics: { netCredit, width, maxProfit, maxLoss, breakeven },
        };
      } else {
        // Single option
        data = {
          symbol: formData.symbol,
          quantity: Number(formData.quantity),
          strategy: formData.strategy,
          tradeDate: new Date(formData.tradeDate),
          expirationDate: new Date(formData.expirationDate),
          legs: [
            {
              side: formData.side,
              strike: Number(formData.singleStrike),
              type: formData.singleType,
              credit:
                formData.singleType === "sell"
                  ? Number(formData.singlePrice)
                  : 0,
              debit:
                formData.singleType === "buy"
                  ? Number(formData.singlePrice)
                  : 0,
            },
          ],
        };
      }

      await addOption(data);
      reset();
      onClose?.();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="symbol"
              control={control}
              defaultValue={symbol || ""}
              rules={{ required: "Symbol is required" }}
              render={({ field }) => (
                <TextField {...field} label="Symbol" fullWidth />
              )}
            />

            <Controller
              name="strategy"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  fullWidth
                  onChange={(_, val) => field.onChange(val)} // sync with react-hook-form
                  value={field.value}
                >
                  <ToggleButton
                    value="spread"
                    sx={{
                      textTransform: "none",
                      borderRadius: 4,
                      m: 0.5,
                    }}
                  >
                    Spread
                  </ToggleButton>
                  <ToggleButton
                    value="single"
                    sx={{
                      textTransform: "none",
                      borderRadius: 4,
                      m: 0.5,
                    }}
                  >
                    Single
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />

            <Controller
              name="side"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  fullWidth
                  onChange={(_, val) => field.onChange(val)} // sync with react-hook-form
                  value={field.value}
                >
                  <ToggleButton
                    value="call"
                    sx={{
                      textTransform: "none",
                      borderRadius: 4,
                      m: 0.5,
                    }}
                  >
                    Call
                  </ToggleButton>
                  <ToggleButton
                    value="put"
                    sx={{
                      textTransform: "none",
                      borderRadius: 4,
                      m: 0.5,
                    }}
                  >
                    Put
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />

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

            {values.strategy === "single" ? (
              <>
                <Controller
                  name="singleType"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      {...field}
                      exclusive
                      fullWidth
                      onChange={(_, val) => field.onChange(val)} // hook into RHF
                      value={field.value}
                    >
                      <ToggleButton
                        value="sell"
                        sx={{
                          textTransform: "none",
                          borderRadius: 4,
                          m: 0.5,
                        }}
                      >
                        Sell (credit)
                      </ToggleButton>

                      <ToggleButton
                        value="buy"
                        sx={{
                          textTransform: "none",
                          borderRadius: 4,
                          m: 0.5,
                        }}
                      >
                        Buy (debit)
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />

                <Controller
                  name="singleStrike"
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
                  name="singlePrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price"
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
              </>
            ) : (
              <>
                <Typography variant="subtitle2">Short Leg</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Controller
                      name="shortStrike"
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
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="shortPrice"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Price (credit)"
                          type="number"
                          fullWidth
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Typography variant="subtitle2">Long Leg</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Controller
                      name="longStrike"
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
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="longPrice"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Price (debit)"
                          type="number"
                          fullWidth
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Stack sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Net Credit: ${netCredit.toFixed(2)} × 100 ×{" "}
                    {values.quantity || 0} = $
                    {(netCredit * 100 * (values.quantity || 0)).toFixed(2)}
                  </Typography>
                  <Typography variant="body2">Width: {width}</Typography>
                  <Typography variant="body2">
                    Max Profit: ${(maxProfit || 0).toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Max Loss: {(maxLoss || 0).toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Breakeven: {breakeven.toFixed(2)}
                  </Typography>
                </Stack>
              </>
            )}
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
