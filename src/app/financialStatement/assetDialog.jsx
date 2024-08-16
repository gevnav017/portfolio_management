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

export const AddAssetButtonDialog = ({ categories }) => {
  const [openNewAssetEntry, setOpenNewAssetEntry] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Asset"
  );

  // const { data, error, isLoading } = useSWR(baseURL + "api/asset", fetcher);

  const handleAddAsset = async (formData) => {
    const { assetName, assetCategory, assetAmount } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/asset`, {
        name: capFirstLetter(assetName),
        category: assetCategory,
        amount: assetAmount,
      });
      setOpenNewAssetEntry(!openNewAssetEntry);
      showSnackbar(`Successfully added ${res.data.name}`, "success");
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/assetTable");
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenNewAssetEntry(!openNewAssetEntry);
        }}
      >
        Add Asset
      </Button>

      <Dialog
        open={openNewAssetEntry}
        onClose={() => {
          setOpenNewAssetEntry(!openNewAssetEntry);
        }}
      >
        <form onSubmit={handleSubmit(handleAddAsset)}>
          <DialogTitle>New Asset Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter asset information below</DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="assetName">Name</InputLabel>
                <Input id="assetName" {...register("assetName")} />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="assetAmount">Amount</InputLabel>
                <Input
                  id="assetAmount"
                  type="number"
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
                setOpenNewAssetEntry(!openNewAssetEntry);
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

export const UpdateAssetDialog = ({
  asset,
  categories,
  openUpdateDialog,
  setOpenUpdateDialog,
}) => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) => category.reference === "Asset"
  );

  const handleUpdateAsset = async (formData) => {
    const { assetName, assetCategory, assetAmount } = formData;

    try {
      const res = await axios.put(`${baseURL}/api/asset/${asset?.id}`, {
        name: capFirstLetter(assetName),
        category: assetCategory,
        amount: assetAmount,
      });
      showSnackbar(`Successfully updated ${res.data.name}`, "success");
      setOpenUpdateDialog(!openUpdateDialog);
      reset();
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/assetTable");
    }
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => {
        setOpenUpdateDialog(!openUpdateDialog);
      }}
    >
      <form onSubmit={handleSubmit(handleUpdateAsset)}>
        <DialogTitle>Update asset</DialogTitle>
        <DialogContent>
          <DialogContentText>Update asset information below</DialogContentText>
          <Stack gap={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="assetName">Name</InputLabel>
              <Input
                id="assetName"
                defaultValue={asset?.name}
                {...register("assetName")}
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="assetAmount">Amount</InputLabel>
              <Input
                id="assetAmount"
                defaultValue={asset?.amount}
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
                defaultValue={asset?.category}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="assetCategory"
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
              <InputLabel id="assetType">Type</InputLabel>
              <Controller
                name="assetType"
                control={control}
                defaultValue={asset?.type}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="assettype"
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

export const DeleteAssetDialog = ({
  asset,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteAsset = async (assetId) => {
    try {
      const res = await axios
        .delete(`${baseURL}/api/asset/${assetId}`)
        .then((res) => {
          showSnackbar(`Successfully deleted ${res.data.name}`, "success");
        });
      setOpenDeleteDialog(false);
    } catch (error) {
      showSnackbar(`error: ${error.message}`, "error");
    } finally {
      router.refresh("/financialStatement/assetTable");
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
            {`Are you sure you want to delete ${asset?.name}?`}
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
              handleDeleteAsset(asset.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
