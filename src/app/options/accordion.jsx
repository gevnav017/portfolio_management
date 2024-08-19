"use client";

import { useState } from "react";

import {
  Grid,
  Box,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PaidIcon from "@mui/icons-material/Paid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const OptionsAccordion = () => {
  const [expanded, setExpanded] = useState(null);
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStockHeaderDividend = (e) => {
    console.log(e);
  };

  const handleStockHeaderEdit = (e) => {
    console.log(e);
  };

  const handleStockHeaderDelete = (e) => {
    console.log(e);
  };

  const optionTableTitles = [
    "Qty",
    "DTE",
    "Price",
    "Strike",
    "Side",
    "Type",
    "Credit",
    "Debit",
  ];

  const optionSummaryTitles = [
    "Net Premium",
    "Open Stock Qty",
    "Open Option Qty",
    "Original Cost Basis",
    "Dividends Collected",
    "Current Stock Price",
    "Open Option P/L",
    "Closed Option P/L",
    "Adjusted Cost Basis",
    "Stock P/L",
  ];

  // const optionDropDownMenu = [
  //   {
  //     close: { name: "Mark as Closed", onClickFunctions: handleOptionMarkClose },
  //     open: { name: "Mark as Open", onClickFunctions: handleOptionMarkOpen },
  //   },
  //   {name: "Edit Position", onClickFunctions: handleOptionEdit },
  //   {name: "Close Position", onClickFunctions: handleOptionClose },
  //   {name: "Roll Position", onClickFunctions: handleOptionRoll },
  //   {name: "Notes", onClickFunctions: handleOptionNotes },
  //   {name: "Shares Called Away", onClickFunctions: handleOptionAssigned },
  //   {name: "Delete Position", color: "danger.main", onClickFunctions: handleOptionDelete }
  // ];

  return (
    <>
      {["test", "test1"].map((el) => (
        <Accordion
          key={el}
          expanded={expanded === el}
          onChange={handleChange(el)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography>TGT</Typography>
              <Stack direction="row">
                <Button
                  size="small"
                  color="success"
                  onClick={handleStockHeaderDividend}
                >
                  <PaidIcon />
                </Button>
                <Button size="small" onClick={handleStockHeaderEdit}>
                  <EditIcon />
                </Button>
                <Button
                  size="small"
                  color="danger"
                  onClick={handleStockHeaderDelete}
                >
                  <DeleteIcon />
                </Button>
              </Stack>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      {optionTableTitles.map((header) => (
                        <TableCell key={header}>
                          <Typography variant="subtitle2">{header}</Typography>
                        </TableCell>
                      ))}
                      <TableCell align="right" width={120} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {optionTableTitles.map((option) => (
                        <TableCell>test</TableCell>
                      ))}
                      <TableCell align="right">
                        <IconButton
                          id="moreMenuButton"
                          onClick={(e) => {
                            setAnchorMoreDropDown(e.currentTarget);
                            setSelectedOptionData(el);
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
                        </Menu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider />
              <Grid container spacing={2}>
                {optionSummaryTitles.map((summaryTitle) => (
                  <Grid item xs={12} md={6} lg={4}>
                    <Stack direction="row" spacing={3}>
                      <Typography>{summaryTitle}</Typography>
                      <Typography>$111</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default OptionsAccordion;
