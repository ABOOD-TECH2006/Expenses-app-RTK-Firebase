// ExpensesTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import ExpensesRow from "./ExpensesRowBody";

const ExpensesTable = ({ Expenses, loading }) => {
  const skeletonRows = 5;

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : Expenses.map((expense) => (
                <ExpensesRow key={expense.firebaseId} expense={expense} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
