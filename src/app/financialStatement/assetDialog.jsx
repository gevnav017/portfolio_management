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

export const AddAssetButtonDialog = ({ categories }) => {
  const [openNewAssetEntry, setOpenNewAssetEntry] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  // const { data, error, isLoading } = useSWR(baseURL + "api/asset", fetcher);

  const onSubmitNewAsset = (formData) => {
    const { assetName, assetCategory, assetAmount } = formData;

    axios
      .post(baseURL + "api/asset", {
        name: assetName,
        category: assetCategory,
        amount: assetAmount,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
      })
      .finally(router.refresh("/financialStatement"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenNewAssetEntry(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenNewAssetEntry(true);
        }}
      >
        Add Asset
      </Button>

      <Dialog
        open={openNewAssetEntry}
        onClose={() => {
          setOpenNewAssetEntry(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmitNewAsset)}>
          <DialogTitle>New Asset Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter asset information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="assetName">Name</InputLabel>
                <Input id="assetName" {...register("assetName")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="assetAmount">Amount</InputLabel>
                <Input
                  id="assetAmount"
                  {...register("assetAmount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="assetCategory">Category</InputLabel>
                <Controller
                  name="assetCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="assetCategory"
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
                setOpenNewAssetEntry(false);
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
