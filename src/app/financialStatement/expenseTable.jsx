"use client";

import { useState } from "react";

import { AddExpenseButtonDialog } from "./expenseDialog";
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

const Rows = ({ category, expenses }) => {
  const [openSubRows, setOpenSubRows] = useState(false);
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  const expensesByCateogry = expenses?.filter(
    (expense) => expense.category === category
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
                {expensesByCateogry?.map((expense, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {expense.name}
                    </TableCell>
                    <TableCell align="right">
                      {ccyFormat(expense.amount)}
                    </TableCell>
                    <TableCell width="75px" align="right">
                      <IconButton
                        id="moreMenuButton"
                        onClick={(e) => setAnchorMoreDropDown(e.currentTarget)}
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
                        <MenuItem onClick={() => setAnchorMoreDropDown(null)}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{ color: "danger.main" }}
                          onClick={() => setAnchorMoreDropDown(null)}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
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

const ExpenseTable = ({
  expenses,
  expenseTotal,
  expenseCategories,
  categories,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Expense</Typography>
            </TableCell>
            <TableCell align="right">
              <AddExpenseButtonDialog categories={categories} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...expenseCategories]?.map((category) => (
            <Rows key={category} category={category} expenses={expenses} />
          ))}
          {/* table total amount */}
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {ccyFormat(expenseTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
