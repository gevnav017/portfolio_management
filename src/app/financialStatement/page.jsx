// file imports
import { AddAssetButtonDialog } from "./assets";
import db from "../../../db/db";
// MUI imports
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Button,
  Typography,
} from "@mui/material";

const FinancialStatement = async () => {
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

  const assets = await db.asset.findMany();

  return (
    <Stack spacing={3}>
      <Stack align="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Financial Statement
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        {/* side column 1 */}
        <Stack spacing={3} p={2}>
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
                      <AddAssetButtonDialog />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets?.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        {asset.desc}
                      </TableCell>
                      <TableCell align="right">
                        ${ccyFormat(asset.amount)}
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
        <Stack spacing={3} p={2}>
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
    </Stack>
  );
};

export default FinancialStatement;
