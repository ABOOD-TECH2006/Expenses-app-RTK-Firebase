import { useDispatch } from "react-redux";
import { deleteExpenseFirebase } from "../redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpensesTable = ({ Expenses = [], loading }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = (firebaseId) => {
    dispatch(deleteExpenseFirebase(firebaseId));
  };

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{ borderRadius: 3, boxShadow: 6, border: "2px solid #6776af" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f4ff" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#273685" }}>
              Title
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#273685" }}>
              Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#273685" }}>
              Value
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#273685" }}>
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#273685" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="50%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="70%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                  </TableRow>
                ))
            : Expenses.map((expense) => (
                <TableRow
                  key={expense.firebaseId}
                  sx={{ "&:hover": { backgroundColor: "#f9f9ff" } }}
                >
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.value}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => onDeleteHandler(expense.firebaseId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
