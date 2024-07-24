"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const FinancialStatement = () => {
  const [openNewIncomeEntry, setOpenNewIncomeEntry] = useState(false);
  const { register, handleSubmit } = useForm();

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow("Paperclips (Box)", 100, 1.15),
    createRow("Paper (Case)", 10, 45.99),
    createRow("Waste Basket", 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const onSubmitNewIncome = (formData) => {
    console.log(formData);
  };

  return (
    <Stack spacing={3}>
      <Stack align="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Financial Statement
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        {/* side column 1 */}
        <Stack spacing={2} p={2}>
          {/* income table */}
          <Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Income</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpenNewIncomeEntry(true);
                        }}
                      >
                        Add Income
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>
                        Salary category then drop down for details
                      </TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${ccyFormat(invoiceSubtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          {/* expense table */}
          <Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Expense</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined">Add Expense</Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>Auto Loan</TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${ccyFormat(invoiceSubtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>

        {/* side column 2 */}
        <Stack spacing={2} p={2}>
          {/* summary of financial statement */}
          <Stack spacing={2}>
            <Stack align="center">
              <Typography variant="subtitle1">
                Increase Passive Income to Escape the Rat Race
              </Typography>
            </Stack>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">Total Expense</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">Bar Chart</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">Cash</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">Passive Income</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">Total Income</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography variant="subtitle1">PAYDAY</Typography>
              <Typography variant="subtitle1">$100</Typography>
            </Card>
          </Stack>
          {/* assets table */}
          <Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Asset</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined">Add Asset</Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>Cash</TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${ccyFormat(invoiceSubtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          {/* liability table */}
          <Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Liability</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined">Add Liability</Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>Auto Loan</TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${ccyFormat(invoiceSubtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>

      {/* dialog for new entry */}
      <Dialog
        open={openNewIncomeEntry}
        onClose={() => {
          setOpenNewIncomeEntry(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmitNewIncome)}>
          <DialogTitle>New Income Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter option contract information below
            </DialogContentText>
            <Stack gap={2}>
              <TextField
                // inputRef={register("symbol")}
                autoFocus
                required
                margin="dense"
                id="symbol"
                name="symbol"
                label="Symbol"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="shares"
                name="shares"
                label="Quantity of shares"
                type="number"
                fullWidth
                variant="standard"
              />
              <FormControl variant="standard" fullWidth>
              <InputLabel id="tradeSideSelect">Trade Side</InputLabel>
              <Select
                labelId="tradeSideSelect"
                value={"test"}
                onChange={() => {}}
              >
                <MenuItem value={"test"}>Buy to open</MenuItem>
              </Select>
            </FormControl>
              <TextField
                autoFocus
                required
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="tradeDate"
                name="tradeDate"
                type="date"
                fullWidth
                variant="standard"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewIncomeEntry(false);
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

export default FinancialStatement;
