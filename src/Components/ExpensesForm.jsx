// ExpensesForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/store";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Box, TextField, Button, Skeleton } from "@mui/material";

const FIREBASE_URL =
  "https://expenses-rtk-app-default-rtdb.firebaseio.com/expenses.json";

const ExpensesForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // skeleton toggle

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // start skeleton
    try {
      const expense = {
        id: Date.now(),
        ...data,
      };

      await axios.post(FIREBASE_URL, expense);

      dispatch(addExpense(expense));
      toast.success("Expense added successfully!");

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense.");
    } finally {
      setLoading(false); // stop skeleton
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Toaster position="top-right" />

      {loading ? (
        <>
          {/* Skeletons for the inputs */}
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ mb: 2 }}
          />
          {/* Skeleton for the button */}
          <Skeleton
            variant="rectangular"
            height={48}
            width={120}
            animation="wave"
            sx={{ mt: 2 }}
          />
        </>
      ) : (
        <>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("date", { required: "Date is required" })}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
          <TextField
            label="Value"
            type="number"
            {...register("value", { required: "Value is required", min: 0 })}
            error={!!errors.value}
            helperText={errors.value?.message}
          />
          <TextField
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Button
          
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </>
      )}
    </Box>
  );
};

export default ExpensesForm;
