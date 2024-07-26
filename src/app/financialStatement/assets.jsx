"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Stack, InputLabel, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// const [openNewIncomeEntry, setOpenNewIncomeEntry] = useState(false);
// const { register, handleSubmit } = useForm();

// const fetcher = url => fetch(url).then(res => res.json())

export const AddAssetButtonDialog = () => {
  const [openNewIncomeEntry, setOpenNewIncomeEntry] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmitNewIncome = (formData) => {
    console.log(formData);

    setOpenNewIncomeEntry(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenNewIncomeEntry(true);
        }}
      >
        Add Income
      </Button>

      <Dialog
        open={openNewIncomeEntry}
        onClose={() => {
          setOpenNewIncomeEntry(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmitNewIncome)}>
          <DialogTitle>New Income Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter income information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="incomeName">Name</InputLabel>
                <Input id="incomeName" {...register("incomeName")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="incomeAmount">Amount</InputLabel>
                <Input
                  id="incomeAmount"
                  {...register("incomeAmount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="incomeCategory">Category</InputLabel>
                <Select
                  labelId="incomeCategory"
                  value={"test"}
                  {...register("incomeCategory")}
                  onChange={() => {}}
                >
                  <MenuItem value={"test"}>Salary</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewIncomeEntry(false);
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