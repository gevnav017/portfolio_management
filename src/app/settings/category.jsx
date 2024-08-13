"use client";

import axios from "axios";
import { useState } from "react";
import { baseURL } from "../lib/component";
import { useForm, Controller } from "react-hook-form";
import { showSnackbar } from "../lib/snackbar";
import { useRouter } from "next/navigation";

import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  Paper,
  Button,
  Select,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CategoryRows = ({ category }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  return (
    <TableRow
      sx={{
        "&:hover": {
          bgcolor: "background.light"
        },
      }}
    >
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.reference}</TableCell>
      <TableCell width="75px" align="right">
        <IconButton
          id="moreMenuButton"
          onClick={(e) => {
            setAnchorMoreDropDown(e.currentTarget);
            setEditCategoryData(category);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="moreMenu"
          anchorEl={anchorMoreDropDown}
          open={openMoreDropDown}
          onClose={() => setAnchorMoreDropDown(null)}
          MenuListProps={{
            "aria-labelledby": "moreMenuButton",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorMoreDropDown(null);
              setOpenUpdateDialog(!openUpdateDialog);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            sx={{ color: "danger.main" }}
            onClick={() => {
              setAnchorMoreDropDown(null);
              setOpenDeleteDialog(!openDeleteDialog);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
        <UpdateCategoryDialog
          category={editCategoryData}
          openUpdateDialog={openUpdateDialog}
          setOpenUpdateDialog={setOpenUpdateDialog}
        />
        <DeleteCategoryDialog
          category={editCategoryData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      </TableCell>
    </TableRow>
  );
};

const Category = ({ categories }) => {
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);

  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const handleAddCategory = async (formData) => {
    const { categoryName, categoryReference } = formData;

    try {
      const res = await axios.post(`${baseURL}/api/category`, {
        name: categoryName,
        reference: categoryReference,
      });
      setOpenNewCategoryDialog(!openNewCategoryDialog);
      showSnackbar(`Successfully added ${res.data.name}`, "success");
      reset();
    } catch (error) {
      showSnackbar(`error: ${err}`, "error");
    } finally {
      router.refresh("/settings/category");
    }
  };

  return (
    <Stack p={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1">Category</Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  sx={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    setOpenNewCategoryDialog(!openNewCategoryDialog);
                  }}
                >
                  Add Category
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="caption">Name</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="caption">Table Reference</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <CategoryRows key={category.id} category={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openNewCategoryDialog}
        onClose={() => {
          setOpenNewCategoryDialog(!openNewCategoryDialog);
        }}
      >
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <DialogTitle>New Category Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter category information below
            </DialogContentText>
            <Stack gap={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="categoryName">Name</InputLabel>
                <Input id="categoryName" {...register("categoryName")} />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="categoryReference">Reference</InputLabel>
                <Controller
                  name="categoryReference"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="categoryReference"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {["Income", "Expense", "Asset", "Liability"]?.map(
                        (category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewCategoryDialog(!openNewCategoryDialog);
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
    </Stack>
  );
};

const UpdateCategoryDialog = ({
  category,
  openUpdateDialog,
  setOpenUpdateDialog,
}) => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const handleUpdateCategory = async (formData) => {
    const { categoryName, categoryReference } = formData;

    try {
      const res = await axios.put(`${baseURL}/api/category/${category.id}`, {
        name: categoryName,
        reference: categoryReference,
      });
      setOpenUpdateDialog(!openUpdateDialog);
      showSnackbar(`Successfully updated ${res.data.name}`, "success");
      reset();
    } catch (error) {
      showSnackbar(`error: ${error}`, "error");
    } finally {
      router.refresh("/settings/category");
    }
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => {
        setOpenUpdateDialog(!openUpdateDialog);
      }}
    >
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update category information below
          </DialogContentText>
          <Stack gap={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="categoryName">Name</InputLabel>
              <Input
                id="categoryName"
                defaultValue={category?.name}
                {...register("categoryName")}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="categoryReference">Reference</InputLabel>
              <Controller
                name="categoryReference"
                control={control}
                defaultValue={category?.reference}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="categoryReference"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {["Income", "Expense", "Asset", "Liability"]?.map(
                      (category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      )
                    )}
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
  );
};

const DeleteCategoryDialog = ({
  category,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const router = useRouter();

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.delete(`${baseURL}/api/category/${category.id}`);
      setOpenDeleteDialog(!openDeleteDialog);
      showSnackbar(`Successfully deleted ${res.data.name}`, "success");
    } catch (error) {
      showSnackbar(`error: ${error}`, "error");
    } finally {
      router.refresh("/settings/category");
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
            {`Are you sure you want to delete ${category?.name}?`}
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
              handleDeleteCategory();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
