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
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Category = ({ categories }) => {
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const handleAddCategory = (formData) => {
    const { categoryName } = formData;

    axios
      .post(`${baseURL}/api/category`, {
        name: categoryName,
      })
      .then((res) => {
        showSnackbar(`Successfully added ${res.data.name}`, "success");
      })
      .finally(router.refresh("/settings/category"))
      .catch((err) => {
        showSnackbar(`error: ${err}`, "error");
      });

    setOpenNewCategoryDialog(false);
  };

  return (
    <Stack p={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Category</Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    setOpenNewCategoryDialog(!openNewCategoryDialog);
                  }}
                >
                  Add Category
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openNewCategoryDialog}
        onClose={() => {
          setOpenNewLiabilityEntry(false);
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
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const handleUpdateCategory = (formData) => {
    const { categoryName } = formData;

    axios
      .put(`${baseURL}/api/category/${category.id}`, {
        name: categoryName,
      })
      .then((res) => {
        showSnackbar(`Successfully updated ${res.data.name}`, "success");
        reset();
      })
      .finally(router.refresh("/settings/category"))
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

  const handleDeleteCategory = () => {
    axios
      .delete(`${baseURL}/api/category/${category.id}`)
      .then((res) => {
        showSnackbar(`Successfully deleted ${res.data.name}`, "success");
      })
      .finally(router.refresh("/settings/category"))
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
            {`Are you sure you want to delete ${category?.name}?`}
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
