// route imports
import { getCategories } from "../api/category/route";
import { getIncomes } from "../api/income/route";
import { getExpenses } from "../api/expense/route";
import { getAssets } from "../api/asset/route";
import { getLiabilities } from "../api/liability/route";

import IncomeTable from "./incomeTable";
import ExpenseTable from "./expenseTable";
import AssetTable from "./assetTable";
import LiabilityTable from "./liabilityTable";

// MUI imports
import {
  Stack,
  Card,
  Typography,
} from "@mui/material";

const FinancialStatement = async () => {
  const { categories } = await getCategories();

  const { incomes, incomeTotal, incomeCategories } = await getIncomes();
  const formattedIncomes = JSON.parse(JSON.stringify(incomes) || null);

  const { expenses, expenseTotal, expenseCategories } = await getExpenses();
  const formattedExpenses = JSON.parse(JSON.stringify(expenses) || null);

  const { assets, assetTotal, assetCategories } = await getAssets();
  const formattedAssets = JSON.parse(JSON.stringify(assets) || null);

  const { liabilities, liabilityTotal, liabilityCategories } =
    await getLiabilities();
  const formattedLiabilities = JSON.parse(JSON.stringify(liabilities) || null);

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
          <Stack>
            {/* assets table */}
            <Stack>
              <AssetTable
                assets={formattedAssets}
                assetTotal={assetTotal}
                assetCategories={assetCategories}
                categories={categories}
              />
            </Stack>
          </Stack>
          <Stack>
            <Stack>
              {/* liability table */}
              <LiabilityTable
                liabilities={formattedLiabilities}
                liabilityTotal={liabilityTotal}
                liabilityCategories={liabilityCategories}
                categories={categories}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FinancialStatement;
