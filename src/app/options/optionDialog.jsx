"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { showSnackbar } from "../lib/snackbar";
import { baseURL } from "../lib/component";

import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

export const NewOptionButtonDialog = () => {
  const [openNewOptionEntry, setOpenNewOptionEntry] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const handleNewOption = async (formData) => {
    const {
      optionSymbol,
      contractQty,
      expireDate,
      strikePrice,
      tradeSide,
      optionType,
      optionPrice,
      tradeDate,
      strategy,
    } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/option`, {
        symbol: optionSymbol.toUpperCase(),
        contractQty,
        expireDate,
        strikePrice,
        tradeSide,
        optionType,
        optionPrice,
        tradeDate,
        strategy,
      });
      setOpenNewOptionEntry(!openNewOptionEntry);
      showSnackbar(`Successfully added ${res.data.name}`, "success");
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/options");
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenNewOptionEntry(!openNewOptionEntry);
        }}
      >
        New Option Entry
      </Button>

      <Dialog
        open={openNewOptionEntry}
        onClose={() => {
          setOpenNewOptionEntry(!openNewOptionEntry);
        }}
      >
        <form onSubmit={handleSubmit(handleNewOption)}>
          <DialogTitle>New Options Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter option contract information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="optionSymbol">Symbol</InputLabel>
                <Input id="optionSymbol" {...register("optionSymbol")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="contractQty">Contract Quantity</InputLabel>
                <Input
                  id="contractQty"
                  type="number"
                  {...register("contractQty")}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="expireDate">Expiration Date</InputLabel>
                <Input
                  id="expireDate"
                  type="date"
                  {...register("expireDate")}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="strikePrice">Strike Price</InputLabel>
                <Input id="strikePrice" {...register("strikePrice")} />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="tradeSide">Trade Side</InputLabel>
                <Controller
                  name="tradeSide"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="tradeSide"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {[
                        "Buy to open",
                        "Sell to open",
                        "Buy to close",
                        "Sell to close",
                      ]?.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="optionType">Option Type</InputLabel>
                <Controller
                  name="optionType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="optionType"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {["Call", "Put"]?.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="optionPrice">Option Price</InputLabel>
                <Input id="optionPrice" {...register("optionPrice")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="tradeDate">Trade Date</InputLabel>
                <Input id="tradeDate" type="date" {...register("tradeDate")} />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="strategy">Strategy</InputLabel>
                <Controller
                  name="strategy"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="strategy"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {["Wheel"]?.map((strategy) => (
                        <MenuItem key={strategy} value={strategy}>
                          {strategy}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewOptionEntry(!openNewOptionEntry);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export const UpdateOptionDialog = () => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const handleUpdateOption = async (formData) => {
    const {
      optionSymbol,
      contractQty,
      expireDate,
      strikePrice,
      tradeSide,
      optionType,
      optionPrice,
      tradeDate,
      strategy,
    } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/option`, {
        symbol: optionSymbol.toUpperCase(),
        contractQty,
        expireDate,
        strikePrice,
        tradeSide,
        optionType,
        optionPrice,
        tradeDate,
        strategy,
      });
      setOpenUpdateDialog(!openUpdateDialog);
      showSnackbar(`Successfully updated ${res.data.name}`, "success");
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/options");
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenUpdateDialog(!openUpdateDialog);
        }}
      >
        Update Option
      </Button>

      <Dialog
        open={openNewOptionEntry}
        onClose={() => {
          setOpenUpdateDialog(!openUpdateDialog);
        }}
      >
        <form onSubmit={handleSubmit(handleUpdateOption)}>
          <DialogTitle>Update Option</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter option contract information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="optionSymbol">Symbol</InputLabel>
                <Input id="optionSymbol" {...register("optionSymbol")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="contractQty">Contract Quantity</InputLabel>
                <Input
                  id="contractQty"
                  type="number"
                  {...register("contractQty")}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="expireDate">Expiration Date</InputLabel>
                <Input
                  id="expireDate"
                  type="date"
                  {...register("expireDate")}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="strikePrice">Strike Price</InputLabel>
                <Input id="strikePrice" {...register("strikePrice")} />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="tradeSide">Trade Side</InputLabel>
                <Controller
                  name="tradeSide"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="tradeSide"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {[
                        "Buy to open",
                        "Sell to open",
                        "Buy to close",
                        "Sell to close",
                      ]?.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="optionType">Option Type</InputLabel>
                <Controller
                  name="optionType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="optionType"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {["Call", "Put"]?.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="optionPrice">Option Price</InputLabel>
                <Input id="optionPrice" {...register("optionPrice")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="tradeDate">Trade Date</InputLabel>
                <Input id="tradeDate" type="date" {...register("tradeDate")} />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="strategy">Strategy</InputLabel>
                <Controller
                  name="strategy"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="strategy"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {["Wheel"]?.map((strategy) => (
                        <MenuItem key={strategy} value={strategy}>
                          {strategy}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenUpdateDialog(!openUpdateDialog);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
