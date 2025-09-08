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
import AddDividendForm from "./add-dividend-form";
import { UpdateStockForm, DeleteStockForm } from "./update-stock-form";
import { UpdateOptionForm, DeleteOptionForm } from "./update-option-form";
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
  stock,
  selected,
  setSelected,
  openForm,
  setOpenForm,
  handleOpenForm,
}) => {
  const [expanded, setExpanded] = useState(false);

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
              icon={<MonetizationOnOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(stock);
                handleOpenForm("dividend");
              }}
            />
            <CustomIconButton
              icon={<DeleteOutlinedIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(stock);
                handleOpenForm("delete");
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
                          openUpdate={openForm.updateStock}
                          onCloseUpdate={() => handleOpenForm("updateStock")}
                          openDelete={openForm.deleteStock}
                          onCloseDelete={() => handleOpenForm("deleteStock")}
                          openNotes={openForm.notes}
                          onCloseNotes={() => handleOpenForm("notes")}
                          openCoveredCall={openForm.coveredCall}
                          onCloseCoveredCall={() =>
                            handleOpenForm("coveredCall")
                          }
                          selected={position}
                          setSelected={setSelected}
                        />
                      ) : (
                        <OptionMoreButton
                          onCloseUpdate={() => handleOpenForm("update")}
                          onCloseDelete={() => handleOpenForm("delete")}
                          onCloseNotes={() => handleOpenForm("note")}
                          selected={position}
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
    updateStock: false,
    updateOption: false,
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
                handleOpenForm("addStock");
              }}
            >
              Stock
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setAnchorAddMoreMenu(null);
                handleOpenForm("addOption");
              }}
            >
              Option
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <div>
        {filteredStocks.map((stock) => (
          <SymbolRows
            key={stock.symbol}
            stock={stock}
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

      <AddDividendForm
        open={openForm.dividend}
        onClose={() => handleOpenForm("dividend")}
      />

      <UpdateStockForm
        open={openForm.updateStock}
        onClose={() => handleOpenForm("updateStock")}
        selected={selected}
      />

      <UpdateOptionForm
        open={openForm.updateOption}
        onClose={() => handleOpenForm("updateOption")}
        selected={selected}
      />

      <DeleteStockForm
        open={openForm.deleteStock}
        onClose={() => handleOpenForm("deleteStock")}
        selected={selected}
      />

      <DeleteOptionForm
        open={openForm.deleteOption}
        onClose={() => handleOpenForm("deleteOption")}
        selected={selected}
      />
    </Stack>
  );
}
