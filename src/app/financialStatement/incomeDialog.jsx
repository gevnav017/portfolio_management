"use client";

// route imports
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
  Typography,
} from "@mui/material";

export const AddIncomeButtonDialog = ({ categories }) => {
  const [openNewIncomeEntry, setOpenNewIncomeEntry] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const router = useRouter();

  // const { data, error, isLoading } = useSWR(baseURL + "api/asset", fetcher);

  const handleAddIncome = (formData) => {
    const { incomeName, incomeCategory, incomeType, incomeAmount } = formData;

    axios
      .post(`${baseURL}/api/income`, {
        name: capFirstLetter(incomeName),
        type: incomeType,
        category: incomeCategory,
        amount: incomeAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
        reset();
      })
      .finally(router.refresh("/financialStatement/incomeTable"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenNewIncomeEntry(false);
  };

  return (
    <>
      <Button
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
        <form onSubmit={handleSubmit(handleAddIncome)}>
          <DialogTitle>New Income Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter income information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="incomeName">Name</InputLabel>
                <Input
                  id="incomeName"
                  {...register("incomeName", {
                    required: "This field is required",
                  })}
                />
                {errors.incomeName && (
                  <Typography variant="caption" color="danger.main">
                    {errors.incomeName.message}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="incomeAmount">Amount</InputLabel>
                <Input
                  id="incomeAmount"
                  {...register("incomeAmount", {
                    required: "This field is required",
                  })}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
                {errors.incomeAmount && (
                  <Typography variant="caption" color="danger.main">
                    {errors.incomeAmount.message}
                  </Typography>
                )}
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
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.incomeCategory && (
                  <Typography variant="caption" color="danger.main">
                    {errors.incomeCategory.message}
                  </Typography>
                )}
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="incomeType">Type</InputLabel>
                <Controller
                  name="incomeType"
                  control={control}
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
                {errors.incomeType && (
                  <Typography variant="caption" color="danger.main">
                    {errors.incomeType.message}
                  </Typography>
                )}
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

export const UpdateIncomeDialog = ({
  income,
  categories,
  openUpdateDialog,
  setOpenUpdateDialog,
}) => {
  const { register, handleSubmit, reset, control } = useForm();

  const router = useRouter();

  const handleUpdateIncome = (formData) => {
    const { incomeName, incomeCategory, incomeAmount } = formData;

    axios
      .put(`${baseURL}/api/income/${income?.id}`, {
        name: capFirstLetter(incomeName),
        category: incomeCategory,
        amount: incomeAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully updated ${res.data.name}`, "success");
        reset();
      })
      .finally(router.refresh("/financialStatement/incomeTable"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenUpdateDialog(!openUpdateDialog);
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => {
        setOpenUpdateDialog(!openUpdateDialog);
      }}
    >
      <form onSubmit={handleSubmit(handleUpdateIncome)}>
        <DialogTitle>Update Income</DialogTitle>
        <DialogContent>
          <DialogContentText>Update income information below</DialogContentText>
          <Stack gap={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="incomeName">Name</InputLabel>
              <Input
                id="incomeName"
                defaultValue={income?.name}
                {...register("incomeName")}
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="incomeAmount">Amount</InputLabel>
              <Input
                id="incomeAmount"
                defaultValue={income?.amount}
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
                defaultValue={income?.category}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="incomeCategory"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {categories?.map((category) => (
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

export const DeleteIncomeDialog = ({
  income,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteIncome = (incomeId) => {
    axios
      .delete(`${baseURL}/api/income/${incomeId}`)
      .then((res) => {
        showSnackbar(`Successfully deleted ${res.data.name}`, "success");
      })
      // .finally(router.refresh("/financialStatement/incomeTable"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenDeleteDialog(false);
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
            {`Are you sure you want to delete ${income?.name}?`}
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
              handleDeleteIncome(income.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
