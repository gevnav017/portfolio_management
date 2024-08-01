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

export const AddLiabilityButtonDialog = ({ categories }) => {
  const [openNewLiabilityEntry, setOpenNewLiabilityEntry] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  const onSubmitNewLiability = (formData) => {
    const { liabilityName, liabilityCategory, liabilityAmount } = formData;

    axios
      .post(baseURL + "api/liability", {
        name: liabilityName,
        category: liabilityCategory,
        amount: liabilityAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
      })
      .finally(router.refresh("/financialStatement"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenNewLiabilityEntry(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenNewLiabilityEntry(true);
        }}
      >
        Add Liability
      </Button>

      <Dialog
        open={openNewLiabilityEntry}
        onClose={() => {
          setOpenNewLiabilityEntry(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmitNewLiability)}>
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
                setOpenNewLiabilityEntry(false);
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

export const DeleteLiabilityDialog = ({
  liability,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteLiability = (liabilityId) => {
    axios
      .delete(baseURL + "api/liability", {
        liabilityId
      })
      .then((res) => {
        showSnackbar(`Successfully deleted ${res.data.name}`, "success");
      })
      .finally(router.refresh("/financialStatement"))
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
            {`Are you sure you want to delete ${liability?.name}?`}
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
              handleDeleteLiability(liability.id);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
