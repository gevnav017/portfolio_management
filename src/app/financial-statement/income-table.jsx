//route imports
import { UpdateDeleteIconButton } from "@/components/CustomButtons";
import NoDataFound from "@/components/NoDataFound";
import TitleBar from "@/components/TitleBar";

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
} from "@mui/material";

const IncomeTable = () => {
  return (
    <Stack spacing={2}>
      <TitleBar title="Income" />
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "solid 1px silver",
          borderRadius: 4,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2].length > 0 ? (
              [1, 2].map((el) => (
                <TableRow key={el}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <UpdateDeleteIconButton />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={100} align="center">
                  <NoDataFound label="No options found. Click 'New Entry' to add one." />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default IncomeTable;
