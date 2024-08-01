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

export const AddIncomeButtonDialog = ({ categories }) => {
  const [openNewIncomeEntry, setOpenNewIncomeEntry] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  // const { data, error, isLoading } = useSWR(baseURL + "api/asset", fetcher);

  const onSubmitNewIncome = (formData) => {
    const { incomeName, incomeCategory, incomeAmount } = formData;

    axios
      .post(`${baseURL}/api/income`, {
        name: incomeName,
        category: incomeCategory,
        amount: incomeAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
      })
      .finally(router.refresh("/financialStatement"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

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
                <Controller
                  name="incomeCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="incomeCategory"
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
