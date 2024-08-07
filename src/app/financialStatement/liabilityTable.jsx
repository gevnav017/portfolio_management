"use client";

import { useState } from "react";

import { AddLiabilityButtonDialog } from "./liabilityDialog";
import { DeleteLiabilityDialog } from "./liabilityDialog";
import { UpdateLiabilityDialog } from "./liabilityDialog";

import { ccyFormat } from "../lib/component";

// MUI imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Rows = ({ category, categories, liabilities }) => {
  const [openSubRows, setOpenSubRows] = useState(true);

  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);
  const [editLiabilityData, setEditLiabilityData] = useState(null);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const liabilitiesByCateogry = liabilities?.filter(
    (liability) => liability.category === category
  );

  return (
    <>
      {/* header table rows */}
      <TableRow>
        <TableCell size="small" width="20px">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenSubRows(!openSubRows)}
          >
            {openSubRows ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={2} align="left">
          {category}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={openSubRows} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {/* sub table rows */}
                {liabilitiesByCateogry?.map((liability) => (
                  <TableRow key={liability.id}>
                    <TableCell component="th" scope="row">
                      {liability.name}
                    </TableCell>
                    <TableCell align="right">
                      {ccyFormat(liability.amount)}
                    </TableCell>
                    <TableCell width="75px" align="right">
                      <IconButton
                        id="moreMenuButton"
                        onClick={(e) => {
                          setAnchorMoreDropDown(e.currentTarget);
                          setEditLiabilityData(liability);
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
                      <UpdateLiabilityDialog
                        categories={categories}
                        liability={editLiabilityData}
                        openUpdateDialog={openUpdateDialog}
                        setOpenUpdateDialog={setOpenUpdateDialog}
                      />
                      <DeleteLiabilityDialog
                        liability={editLiabilityData}
                        openDeleteDialog={openDeleteDialog}
                        setOpenDeleteDialog={setOpenDeleteDialog}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const LiabilityTable = ({
  liabilities,
  liabilityTotal,
  liabilityCategories,
  categories,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Liability</Typography>
            </TableCell>
            <TableCell align="right">
              <AddLiabilityButtonDialog categories={categories} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...liabilityCategories]?.map((category) => (
            <Rows
              key={category}
              category={category}
              categories={categories}
              liabilities={liabilities}
            />
          ))}
          {/* table total amount */}
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {ccyFormat(liabilityTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiabilityTable;
