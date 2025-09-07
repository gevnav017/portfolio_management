// route imports
import IncomeTable from "./income-table";
import ExpenseTable from "./expense-table";
import AssetsTable from "./assets-table";
import LiabilitiesTable from "./liabilities-table";
import ExpenseRatioChart from "./expense-ratio-chart";

// MUI imports
import { Stack } from "@mui/material";

const FinancialStatement = () => {
  return (
    <Stack spacing={2}>
      <ExpenseRatioChart />
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} flex={1}>
          <IncomeTable />
          <ExpenseTable />
        </Stack>
        <Stack spacing={2} flex={1}>
          <AssetsTable />
          <LiabilitiesTable />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FinancialStatement;
