"use client";

// route imports
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { baseURL } from "../lib/component";
import { showSnackbar } from "../lib/snackbar";
import { useRouter } from "next/navigation";

// MUI imports
import {
  Stack,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

export const AddExpenseButtonDialog = ({ categories }) => {
  const [openNewExpenseEntry, setOpenNewExpenseEntry] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  const onSubmitNewExpense = (formData) => {
    const { expenseName, expenseCategory, expenseAmount } = formData;

    axios
      .post(baseURL + "api/expense", {
        name: expenseName,
        category: expenseCategory,
        amount: expenseAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
      })
      .finally(router.refresh("/financialStatement"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenNewExpenseEntry(!openNewExpenseEntry);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenNewExpenseEntry(!openNewExpenseEntry);
        }}
      >
        Add Expense
      </Button>

      <Dialog
        open={openNewExpenseEntry}
        onClose={() => {
          setOpenNewExpenseEntry(!openNewExpenseEntry);
        }}
      >
        <form onSubmit={handleSubmit(onSubmitNewExpense)}>
          <DialogTitle>New Expense Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter expense information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="expenseName">Name</InputLabel>
                <Input id="expenseName" {...register("expenseName")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="expenseAmount">Amount</InputLabel>
                <Input
                  id="expenseAmount"
                  {...register("expenseAmount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="expenseCategory">Category</InputLabel>
                <Controller
                  name="expenseCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="expenseCategory"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {categories?.map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                          {category.name}
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
                setOpenNewExpenseEntry(!openNewExpenseEntry);
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
