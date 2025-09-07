// route imports
import { BarChart } from "@mui/x-charts/BarChart";
import { toMoney } from "@/lib/format";

// MUI imports
import { Stack, Typography } from "@mui/material";

// Props: { income: number, expense: number }
export default function ExpenseRatioChart({ income = 0, expense = 0 }) {
  // single row dataset; y-axis has one category "Total"
  const dataset = [{ label: "Total", income, expense }];

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <BarChart
        dataset={dataset}
        layout="horizontal"
        height={140}
        margin={{ left: 80, right: 24, top: 12, bottom: 20 }}
        yAxis={[{ scaleType: "band", dataKey: "label" }]}
        xAxis={[{ label: "Amount ($)" }]}
        series={[
          {
            dataKey: "income",
            label: "Income",
            stack: "ie", // stack them into one bar
            color: "#2e7d32",
          },
          {
            dataKey: "expense",
            label: "Expense",
            stack: "ie",
            color: "#c62828",
          },
        ]}
        grid={{ horizontal: true }}
      />

      <Stack>
        <Typography variant="body2" color="textSecondary">
          Income: {toMoney(income)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Expense: {toMoney(expense)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Payday: {toMoney(income - expense)}
        </Typography>
      </Stack>
    </Stack>
  );
}
