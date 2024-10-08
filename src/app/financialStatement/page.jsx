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

import { ccyFormat } from "../lib/component";

// MUI imports
import { Stack, Card, Typography, Box, LinearProgress } from "@mui/material";

const FinancialStatement = async () => {
  const { categories } = await getCategories();

  const { incomes, incomeTotal, incomeCategories, passiveIncomeTotal } =
    await getIncomes();
  const formattedIncomes = JSON.parse(JSON.stringify(incomes) || null);

  const { expenses, expenseTotal, expenseCategories } = await getExpenses();
  const formattedExpenses = JSON.parse(JSON.stringify(expenses) || null);

  const { assets, assetTotal, assetCategories, cashTotal } = await getAssets();
  const formattedAssets = JSON.parse(JSON.stringify(assets) || null);

  const { liabilities, liabilityTotal, liabilityCategories } =
    await getLiabilities();
  const formattedLiabilities = JSON.parse(JSON.stringify(liabilities) || null);

  const passiveIncomePercentComplete = () => {
    if (passiveIncomeTotal / expenseTotal > 1) {
      return 100;
    }
    if (isNaN(passiveIncomeTotal / expenseTotal)) {
      return 0;
    }
    return Math.round((passiveIncomeTotal / expenseTotal) * 100);
  };

  return (
    <Stack spacing={3}>
      <Stack align="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Financial Statement
        </Typography>
      </Stack>

      <Stack
        direction={{xs: "column", md: "row"}}
        
      >
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
                <Typography variant="subtitle1">
                  {ccyFormat(expenseTotal)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <Box sx={{ width: "100%", mr: 2 }}>
                  <LinearProgress
                    sx={{ height: "20px", borderRadius: 2 }}
                    variant="determinate"
                    value={passiveIncomePercentComplete()}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {`${passiveIncomePercentComplete()}%`}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Passive Income</Typography>
                <Typography variant="subtitle1">
                  {ccyFormat(passiveIncomeTotal)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Cash</Typography>
                <Typography variant="subtitle1">
                  {ccyFormat(cashTotal)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant="subtitle1">
                  {ccyFormat(incomeTotal)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">PAYDAY</Typography>
                <Typography variant="subtitle1">
                  {ccyFormat(incomeTotal - expenseTotal)}
                </Typography>
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
