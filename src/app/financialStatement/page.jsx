// route imports
import { GetCategories } from "../api/category/route";
import { GetIncomes } from "../api/income/route";
import { GetExpenses } from "../api/expense/route";

import IncomeTable from "./incomeTable";
import ExpenseTable from "./expenseTable";

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
  const { categories } = await GetCategories();

  const { incomes, incomeTotal, incomeCategories } = await GetIncomes();
  const formattedIncomes = JSON.parse(JSON.stringify(incomes));

  const { expenses, expenseTotal, expenseCategories } = await GetExpenses();
  const formattedExpenses = JSON.parse(JSON.stringify(expenses));

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
            <IncomeTable
              incomes={formattedIncomes}
              incomeTotal={incomeTotal}
              incomeCategories={incomeCategories}
              categories={categories}
            />
          </Stack>

          {/* expense table */}
          <Stack>
            <ExpenseTable
              expenses={formattedExpenses}
              expenseTotal={expenseTotal}
              expenseCategories={expenseCategories}
              categories={categories}
            />
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
            <Card>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Total Expense</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Bar Chart</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Cash</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Passive Income</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">PAYDAY</Typography>
                <Typography variant="subtitle1">$100</Typography>
              </Stack>
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
                  {/* {assets.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>Cash</TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.amount)}
                      </TableCell>
                    </TableRow>
                  ))} */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {/* ${ccyFormat(assetTotal)} */}
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
                  {/* {assets.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>Auto Loan</TableCell>
                      <TableCell align="right">
                        ${ccyFormat(row.amount)}
                      </TableCell>
                    </TableRow>
                  ))} */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {/* ${ccyFormat(assetTotal)} */}
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
