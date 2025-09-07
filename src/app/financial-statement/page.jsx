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
    <>
      <ExpenseRatioChart />
      <Stack direction="row" spacing={2}>
        <Stack flex={1}>
          <IncomeTable />
          <ExpenseTable />
        </Stack>
        <Stack flex={1}>
          <AssetsTable />
          <LiabilitiesTable />
        </Stack>
      </Stack>
    </>
  );
};

export default FinancialStatement;
