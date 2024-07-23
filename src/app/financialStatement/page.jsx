import React from "react";

import { Box, Stack, Typography, Card } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FinancialStatement = () => {
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

  return (
    <Stack spacing={3}>
      <Stack textAlign="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Financial Statement
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} p={2}>
          <Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <Typography variant="subtitle1">Income</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack>
            <Typography>Expense</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTaxes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
        <Stack spacing={2} p={2}>
          <Stack>
            <Typography>Escape</Typography>
            <Card>Total Expense</Card>
            <Card>Bar</Card>
            <Card>Cash</Card>
            <Card>Passive Income</Card>
            <Card>Total Income</Card>
            <Card>PAYDAY</Card>
          </Stack>
          <Stack>
            <Typography>Assets</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTaxes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack>
            <Typography>Liabilities</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTaxes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FinancialStatement;
