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
} from "@mui/material";

export const AddLiabilityButtonDialog = ({ categories }) => {
  const [openNewLiabilityEntry, setOpenNewLiabilityEntry] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Liability"
  );

  const handleAddLiability = async (formData) => {
    const { liabilityName, liabilityCategory, liabilityAmount } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/liability`, {
        name: capFirstLetter(liabilityName),
        category: liabilityCategory,
        amount: liabilityAmount,
      });
      console.log(res.message)
      showSnackbar(`Successfully added ${res.data.name}`, "success");
      setOpenNewLiabilityEntry(!openNewLiabilityEntry);
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/liabilityTable");
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenNewLiabilityEntry(!openNewLiabilityEntry);
        }}
      >
        Add Liability
      </Button>

      <Dialog
        open={openNewLiabilityEntry}
        onClose={() => {
          setOpenNewLiabilityEntry(!openNewLiabilityEntry);
        }}
      >
        <form onSubmit={handleSubmit(handleAddLiability)}>
          <DialogTitle>New Liability Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter liability information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="liabilityName">Name</InputLabel>
                <Input id="liabilityName" {...register("liabilityName")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="liabilityAmount">Amount</InputLabel>
                <Input
                  id="liabilityAmount"
                  type="number"
                  {...register("liabilityAmount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="liabilityCategory">Category</InputLabel>
                <Controller
                  name="liabilityCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="liabilityCategory"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {filteredCategories?.map((category) => (
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
                setOpenNewLiabilityEntry(!openNewLiabilityEntry);
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

export const UpdateLiabilityDialog = ({
  liability,
  categories,
  openUpdateDialog,
  setOpenUpdateDialog,
}) => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Liability"
  );

  const handleUpdateLiability = async (formData) => {
    const { liabilityName, liabilityCategory, liabilityAmount } = formData;

    try {
      const res = await axios.put(`${baseURL}/api/liability/${liability?.id}`, {
        name: capFirstLetter(liabilityName),
        category: liabilityCategory,
        amount: liabilityAmount,
      });
      showSnackbar(`Successfully updated ${res.data.name}`, "success");
      setOpenUpdateDialog(!openUpdateDialog);
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/liabilityTable");
    }
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => {
        setOpenUpdateDialog(!openUpdateDialog);
      }}
    >
      <form onSubmit={handleSubmit(handleUpdateLiability)}>
        <DialogTitle>Update Liability</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter liability information below
          </DialogContentText>
          <Stack gap={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="liabilityName">Name</InputLabel>
              <Input
                id="liabilityName"
                defaultValue={liability?.name}
                {...register("liabilityName")}
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="liabilityAmount">Amount</InputLabel>
              <Input
                id="liabilityAmount"
                defaultValue={liability?.amount}
                {...register("liabilityAmount")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="liabilityCategory">Category</InputLabel>
              <Controller
                name="liabilityCategory"
                control={control}
                defaultValue={liability?.category}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="liabilityCategory"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {filteredCategories?.map((category) => (
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

export const DeleteLiabilityDialog = ({
  liability,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteLiability = async (liabilityId) => {
    try {
      const res = await axios.delete(`${baseURL}/api/liability/${liabilityId}`);
      showSnackbar(`Successfully deleted ${res.data.name}`, "success");
      setOpenDeleteDialog(!openDeleteDialog);
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/liabilityTable");
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(!openDeleteDialog);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete ${liability?.name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(!openDeleteDialog);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="danger"
            onClick={() => {
              handleDeleteLiability(liability.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
