"use client";

// route imports
import { useEffect, useState } from "react";
import {
  CustomButton,
  CustomIconButton,
  StockMoreButton,
  OptionMoreButton,
} from "@/components/CustomButtons";
import AddStockForm from "./add-stock-form";
import AddOptionForm from "./add-option-form";
import DividendForm from "./dividend-form";
import { UpdateForm, DeleteForm } from "./update-symbol-form";
import NoDataFound from "@/components/NoDataFound";

// MUI imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Stack,
  Typography,
  Chip,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { set } from "react-hook-form";

const SymbolRows = ({
  symbol,
  filteredPositions,
  selected,
  setSelected,
  openForm,
  setOpenForm,
  handleOpenForm,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      key={symbol.id}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{ border: "solid 1px silver" }}
      elevation={0}
    >
      <AccordionSummary
        id={`panel-header-${symbol.id}`}
        component="div"
        expandIcon={<ExpandMoreIcon color="secondary" />}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography>{symbol.Symbol}</Typography>
          <Typography>
            P/L: ${symbol.PL} - {symbol.Change}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mr={2}>
            <CustomIconButton
              color="secondary"
              icon={<EditOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(symbol);
                handleOpenForm("update", true);
              }}
            />
            <CustomIconButton
              color="secondary"
              icon={<MonetizationOnOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(symbol);
                handleOpenForm("dividend", true);
              }}
            />
            <CustomIconButton
              color="secondary"
              icon={<DeleteOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(symbol);
                handleOpenForm("delete", true);
              }}
            />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: "solid 1px silver",
            borderRadius: 4,
            maxHeight: "calc(100vh - 205px)",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Qty</TableCell>
                <TableCell>DTE</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Strike</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPositions.length > 0 ? (
                filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>{position.Qty}</TableCell>
                    <TableCell>{position.DTE}</TableCell>
                    <TableCell>{position.Price}</TableCell>
                    <TableCell>{position.Strike}</TableCell>
                    <TableCell>{position.Side}</TableCell>
                    <TableCell>{position.Type}</TableCell>
                    <TableCell>{position.Credit}</TableCell>
                    <TableCell>{position.Debit}</TableCell>
                    <TableCell align="right">
                      {position.Type === "Stock" ? (
                        <StockMoreButton
                          openUpdate={openForm.update}
                          setOpenUpdate={setOpenForm}
                          openDelete={openForm.delete}
                          setOpenDelete={setOpenForm}
                          openNotes={openForm.notes}
                          setOpenNotes={setOpenForm}
                          openCoveredCall={openForm.coveredCall}
                          setOpenCoveredCall={setOpenForm}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      ) : (
                        <OptionMoreButton
                          onCloseUpdate={() => handleOpenForm("update")}
                          onCloseDelete={() => handleOpenForm("delete")}
                          onCloseNotes={() => handleOpenForm("note")}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={100} align="center">
                    <NoDataFound label="No options found. Click 'New Entry' to add one." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={100}>
                  {/* stock data */}
                  <Stack direction="row" justifyContent="space-between">
                    <Grid container direction="column" spacing={2} flex={1}>
                      <Grid size={4}>Original Cost Basis: $200</Grid>
                      <Grid size={4}>Open Stock Qty: $100</Grid>
                      <Grid size={4}>Dividends Collected: $200</Grid>
                      <Grid size={4}>Stock P/L: $200</Grid>
                      <Grid size={4}>Adjusted Cost Basis: $200</Grid>
                      <Grid size={4}>Current Stock Price: $100</Grid>
                    </Grid>
                    {/* options data */}
                    <Grid container direction="column" spacing={2} flex={1}>
                      <Grid size={4}>Net Premium: $100</Grid>
                      <Grid size={4}>Open Option P/L: $100</Grid>
                      <Grid size={4}>Open Option Qty: $200</Grid>
                      <Grid size={4}>Closed Option P/L: $100</Grid>
                    </Grid>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default function StocksOptionsTable() {
  const [openForm, setOpenForm] = useState({
    addStock: false,
    addOption: false,
    dividend: false,
    note: false,
    coveredCall: false,
    update: false,
    delete: false,
  });
  const [anchorAddMoreMenu, setAnchorAddMoreMenu] = useState(null);
  const openAddMoreMenu = Boolean(anchorAddMoreMenu);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  // Dummy positions data
  const positions = [
    {
      id: 1,
      Symbol: "TGT",
      Qty: 100,
      DTE: 30,
      Type: "Stock",
      Side: "Long",
      Price: 120.5,
      CurrentPrice: 130.2,
      PL: 970,
      Change: "8.1%",
    },
    {
      id: 2,
      Symbol: "KO",
      Qty: 50,
      Type: "Option",
      Side: "Short",
      Price: 45.0,
      CurrentPrice: 42.5,
      PL: -125,
      Change: "-5.6%",
    },
    {
      id: 3,
      Symbol: "KO",
      Qty: 100,
      Type: "Option",
      Side: "Short",
      Price: 47.0,
      CurrentPrice: 42.5,
      PL: -125,
      Change: "-8.6%",
    },
  ];

  const uniqueSymbols = Object.values(
    positions.reduce((acc, pos) => {
      acc[pos.Symbol] = acc[pos.Symbol] || pos; // keep first occurrence
      return acc;
    }, {})
  );

  const filteredPositions =
    filter === "all"
      ? positions
      : positions.filter((p) => {
          const status =
            typeof p.status === "string"
              ? p.status.toLowerCase()
              : p.status === true
              ? "open"
              : "closed";
          return filter === status;
        });

  const handleOpenForm = (key, value) =>
    setOpenForm((prev) => ({ ...prev, [key]: value ?? !prev[key] }));

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" py={2}>
        {/* Filter Chips */}
        <Stack direction="row" spacing={1}>
          <Chip
            label="All"
            clickable
            sx={{
              bgcolor: filter === "all" ? "primary" : "background.paper",
              color: filter === "all" ? "#fff" : "#000",
            }}
            onClick={() => setFilter("all")}
          />
          <Chip
            label="Open"
            clickable
            sx={{
              bgcolor: filter === "open" ? "primary" : "background.paper",
              color: filter === "open" ? "#fff" : "#000",
            }}
            onClick={() => setFilter("open")}
          />
          <Chip
            label="Closed"
            clickable
            sx={{
              bgcolor: filter === "closed" ? "primary" : "background.paper",
              color: filter === "closed" ? "#fff" : "#000",
            }}
            onClick={() => setFilter("closed")}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <CustomButton label="Links" />
          <CustomButton
            label="New Entry"
            icon={<AddCircleOutlineOutlinedIcon />}
            onClick={(e) => setAnchorAddMoreMenu(e.currentTarget)}
          />
          <Menu
            id="addMoreMenu"
            anchorEl={anchorAddMoreMenu}
            open={openAddMoreMenu}
            onClose={() => setAnchorAddMoreMenu(null)}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setAnchorAddMoreMenu(null);
                handleOpenForm("addStock", true);
              }}
            >
              Stock
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setAnchorAddMoreMenu(null);
                handleOpenForm("addOption", true);
              }}
            >
              Option
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <div>
        {uniqueSymbols.map((symbol) => (
          <SymbolRows
            key={symbol.id}
            symbol={symbol}
            filteredPositions={filteredPositions.filter(
              (s) => s.Symbol === symbol.Symbol
            )}
            selected={selected}
            setSelected={setSelected}
            openForm={openForm}
            setOpenForm={setOpenForm}
            handleOpenForm={handleOpenForm}
          />
        ))}
      </div>

      {/* modals */}
      <AddStockForm
        open={openForm.addStock}
        onClose={() => handleOpenForm("addStock")}
      />

      <AddOptionForm
        open={openForm.addOption}
        onClose={() => handleOpenForm("addOption")}
      />

      <DividendForm
        open={openForm.dividend}
        onClose={() => handleOpenForm("dividend")}
      />

      <UpdateForm
        open={openForm.update}
        onClose={() => handleOpenForm("update")}
        selected={selected}
      />

      <DeleteForm
        open={openForm.delete}
        onClose={() => handleOpenForm("delete")}
        selected={selected}
      />
    </Stack>
  );
}
