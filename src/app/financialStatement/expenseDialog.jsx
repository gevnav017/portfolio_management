"use client";

// route imports
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { baseURL } from "../lib/component";
import { showSnackbar } from "../lib/snackbar";
import { useRouter } from "next/navigation";
import { capFirstLetter } from "../lib/component";

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

import LaunchIcon from "@mui/icons-material/Launch";

export const AddExpenseButtonDialog = ({ categories }) => {
  const [openNewExpenseEntry, setOpenNewExpenseEntry] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Expense"
  );

  const handleAddExpense = async (formData) => {
    const { expenseName, expenseCategory, expenseAmount } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/expense`, {
        name: expenseName,
        category: expenseCategory,
        amount: expenseAmount,
      });
      showSnackbar(`Successfully added ${res.data.name}`, "success");
      setOpenNewExpenseEntry(!openNewExpenseEntry);
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/expenseTable");
    }
  };

  return (
    <>
      <Button
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
        <form onSubmit={handleSubmit(handleAddExpense)}>
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
                      {filteredCategories?.map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <Link href="/settings">
                          Add New <LaunchIcon />
                        </Link>
                      </MenuItem>
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

export const UpdateExpenseDialog = ({
  expense,
  categories,
  openUpdateDialog,
  setOpenUpdateDialog,
}) => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Expense"
  );

  const handleUpdateExpense = async (formData) => {
    const { expenseName, expenseCategory, expenseAmount } = formData;

    try {
      const res = await axios.put(`${baseURL}/api/expense/${expense?.id}`, {
        name: capFirstLetter(expenseName),
        category: expenseCategory,
        amount: expenseAmount,
      });

      showSnackbar(`Successfully updated ${res.data.name}`, "success");
      setOpenUpdateDialog(!openUpdateDialog);
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/expenseTable");
    }
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => {
        setOpenUpdateDialog(!openUpdateDialog);
      }}
    >
      <form onSubmit={handleSubmit(handleUpdateExpense)}>
        <DialogTitle>Update Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update expense information below
          </DialogContentText>
          <Stack gap={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="expenseName">Name</InputLabel>
              <Input
                id="expenseName"
                defaultValue={expense?.name}
                {...register("expenseName")}
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="expenseAmount">Amount</InputLabel>
              <Input
                id="expenseAmount"
                defaultValue={expense?.amount}
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
                defaultValue={expense?.category}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="expenseCategory"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {filteredCategories?.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* <FormControl variant="standard" fullWidth>
              <InputLabel id="incomeType">Type</InputLabel>
              <Controller
                name="incomeType"
                control={control}
                defaultValue={income?.type}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="incometype"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {["Active", "Passive"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl> */}
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
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const DeleteExpenseDialog = ({
  expense,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteExpense = async (expenseId) => {
    try {
      const res = await axios.delete(`${baseURL}/api/expense/${expenseId}`);
      showSnackbar(`Successfully deleted ${res.data.name}`, "success");
      setOpenDeleteDialog(!openDeleteDialog);
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/expenseTable");
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete ${expense?.name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="danger"
            onClick={() => {
              handleDeleteExpense(expense.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
