"use client";

import { useState } from "react";

import { AddIncomeButtonDialog } from "./incomeDialog";
import { UpdateIncomeDialog } from "./incomeDialog";
import { DeleteIncomeDialog } from "./incomeDialog";
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

const Rows = ({ category, incomes, categories }) => {
  const [openSubRows, setOpenSubRows] = useState(true);

  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);
  const [editIncomeData, setEditIncomeData] = useState(null);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const incomesByCateogry = incomes?.filter(
    (income) => income.category === category
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
                {incomesByCateogry?.map((income, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {income.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {income.type}
                    </TableCell>
                    <TableCell align="right">
                      {ccyFormat(income.amount)}
                    </TableCell>
                    <TableCell width="75px" align="right">
                      <IconButton
                        id="moreMenuButton"
                        onClick={(e) => {
                          setAnchorMoreDropDown(e.currentTarget);
                          setEditIncomeData(income);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="moreMenu"
                        anchorEl={anchorMoreDropDown}
                        open={openMoreDropDown}
                        onClose={() => {
                          setAnchorMoreDropDown(null);
                        }}
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
                      <UpdateIncomeDialog
                        categories={categories}
                        income={editIncomeData}
                        openUpdateDialog={openUpdateDialog}
                        setOpenUpdateDialog={setOpenUpdateDialog}
                      />
                      <DeleteIncomeDialog
                        income={editIncomeData}
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

const IncomeTable = ({
  incomes,
  incomeTotal,
  incomeCategories,
  categories,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Income</Typography>
            </TableCell>
            <TableCell align="right">
              <AddIncomeButtonDialog categories={categories} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...incomeCategories]?.map((category) => (
            <Rows
              key={category}
              category={category}
              incomes={incomes}
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
                {ccyFormat(incomeTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomeTable;
