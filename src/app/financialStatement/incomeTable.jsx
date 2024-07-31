"use client";

import { useState } from "react";

import { AddIncomeButtonDialog } from "./incomeDialog";
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
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Rows = ({ category, incomes }) => {
  const [open, setOpen] = useState(false);

  const incomesByCateogry = incomes.filter(
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
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={2} align="left">
          {category}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {/* sub table rows */}
                {incomesByCateogry?.map((income, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {income.name}
                    </TableCell>
                    <TableCell align="right">
                      {ccyFormat(income.amount)}
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

const IncomeTable = ({ incomes, incomeTotal, incomeCategories, categories }) => {
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
            <Rows key={category} category={category} incomes={incomes} />
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
