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
import { toMoney } from "@/lib/format";
import useStocksStore from "@/store/stocksStore";

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

const SymbolRows = ({
  filteredStocks,
  selected,
  setSelected,
  openForm,
  setOpenForm,
  handleOpenForm,
}) => {
  const [expanded, setExpanded] = useState(false);
  const stock = filteredStocks[0];

  if (!stock) return null;
  console.log(stock);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{ border: "solid 1px silver" }}
      elevation={0}
    >
      <AccordionSummary
        id={`panel-header-${stock.symbol}`}
        component="div"
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography>{stock.symbol}</Typography>
          <Typography>
            P/L: ${stock.PL} - {stock.Change}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mr={2}>
            <CustomIconButton
              icon={<EditOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(stock);
                handleOpenForm("update", true);
              }}
            />
            <CustomIconButton
              icon={<MonetizationOnOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(stock);
                handleOpenForm("dividend", true);
              }}
            />
            <CustomIconButton
              icon={<DeleteOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(stock);
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
              {stock.positions?.length > 0 ? (
                stock.positions?.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>{position.quantity ?? "-"}</TableCell>
                    <TableCell>{position.dte ?? "-"}</TableCell>
                    <TableCell>
                      {position.purchasePrice != null
                        ? toMoney(position.purchasePrice)
                        : "-"}
                    </TableCell>
                    <TableCell>{position.strike ?? "-"}</TableCell>
                    <TableCell>{position.side ?? "-"}</TableCell>
                    <TableCell>{position.type ?? "-"}</TableCell>
                    <TableCell>
                      {position.credit != null ? toMoney(position.credit) : "-"}
                    </TableCell>
                    <TableCell>
                      {position.debit != null ? toMoney(position.debit) : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {position.type === "Stock" ? (
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
                    <NoDataFound label="No stock data found. Click 'New Entry' to add one." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={100}>
                  {/* stock data */}
                  <Stack direction="row" justifyContent="space-between">
                    {/* stock data */}
                    <Grid container spacing={2} flex={1}>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Original Cost Basis:{" "}
                        {toMoney(stock.metrics?.originalCostBasis)}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Open Stock Qty: {stock.metrics?.openQty}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Dividends Collected:{" "}
                        {toMoney(stock.metrics?.dividendsCollected)}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Stock P/L (Unrealized):{" "}
                        {toMoney(stock.metrics?.stockPL)}
                      </Grid>
                      {/* <Grid>Stock P/L (Realized): {toMoney(s.realizedStockPL)}</Grid> */}
                      <Grid size={{ xs: 6, md: 3 }}>
                        Adjusted Cost Basis:{" "}
                        {toMoney(stock.metrics?.adjustedCostBasis)}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Current Stock Price:{" "}
                        {toMoney(stock.metrics?.currentPrice)}
                      </Grid>
                      {/* options data */}
                      <Grid size={{ xs: 6, md: 3 }}>
                        Net Premium: {toMoney(stock.options?.netPremium)}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Open Option P/L: {toMoney(stock.options?.openOptionPL)}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Open Option Qty: {stock.options?.openOptionQty}
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        Closed Option P/L:{" "}
                        {toMoney(stock.options?.closedOptionPL)}
                      </Grid>
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

  const { stocks, getStocks } = useStocksStore();

  useEffect(() => {
    getStocks();
  }, [getStocks]);

  const filteredStocks =
    filter === "all"
      ? stocks
      : stocks.filter((p) => {
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
        {stocks.map((symbol) => (
          <SymbolRows
            key={symbol}
            filteredStocks={filteredStocks.filter(
              (s) => s.symbol === symbol.symbol
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
