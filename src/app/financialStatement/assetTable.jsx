"use client";

import { useState } from "react";

import {
  AddAssetButtonDialog,
  UpdateAssetDialog,
  DeleteAssetDialog,
} from "./assetDialog";
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

const Rows = ({ category, assets, categories }) => {
  const [openSubRows, setOpenSubRows] = useState(true);

  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);
  const [editAssetData, setEditAssetData] = useState(null);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const assetsByCateogry = assets?.filter(
    (asset) => asset.category === category
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
                {assetsByCateogry?.map((asset, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {asset.name}
                    </TableCell>
                    <TableCell align="right">
                      {ccyFormat(asset.amount)}
                    </TableCell>
                    <TableCell width="75px" align="right">
                      <IconButton
                        id="moreMenuButton"
                        onClick={(e) => {
                          setAnchorMoreDropDown(e.currentTarget);
                          setEditAssetData(asset);
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
                      <UpdateAssetDialog
                        categories={categories}
                        asset={editAssetData}
                        openUpdateDialog={openUpdateDialog}
                        setOpenUpdateDialog={setOpenUpdateDialog}
                      />
                      <DeleteAssetDialog
                        asset={editAssetData}
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

const AssetTable = ({ assets, assetTotal, assetCategories, categories }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Asset</Typography>
            </TableCell>
            <TableCell align="right">
              <AddAssetButtonDialog categories={categories} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...assetCategories]?.map((category) => (
            <Rows
              key={category}
              category={category}
              assets={assets}
              categories={categories}
            />
          ))}
          {/* table total amount */}
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {ccyFormat(assetTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetTable;
