// ExpensesRow.jsx
import { useDispatch } from "react-redux";
import { deleteExpenseFirebase } from "../redux/store";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpensesRow = ({ expense }) => {
  const dispatch = useDispatch();

  const handleDelete = async (firebaseId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This expense will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await dispatch(deleteExpenseFirebase(firebaseId)); // بدون unwrap
          return true;
        } catch (err) {
          throw err;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) toast.success("Expense deleted successfully");
    else if (result.dismiss === Swal.DismissReason.cancel)
      toast("Deletion cancelled");
    else toast.error("Failed to delete expense");
  };

  return (
    <TableRow>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.date}</TableCell>
      <TableCell>{expense.value}</TableCell>
      <TableCell>{expense.description}</TableCell>
      <TableCell>
        <IconButton
          type="button"
          color="error"
          onClick={() => handleDelete(expense.firebaseId)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ExpensesRow;
