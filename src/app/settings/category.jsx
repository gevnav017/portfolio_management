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
  const { register, handleSubmit, control } = useForm();
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
                        // setOpenUpdateDialog(!openUpdateDialog);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "danger.main" }}
                      onClick={() => {
                        setAnchorMoreDropDown(null);
                        // setOpenDeleteDialog(!openDeleteDialog);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                  {/* <UpdateLiabilityDialog
                    categories={categories}
                    liability={editLiabilityData}
                    openUpdateDialog={openUpdateDialog}
                    setOpenUpdateDialog={setOpenUpdateDialog}
                  />
                  <DeleteLiabilityDialog
                    liability={editLiabilityData}
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                  /> */}
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

export default Category;
