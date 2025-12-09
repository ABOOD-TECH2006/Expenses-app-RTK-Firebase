// Redux Toolkit store for managing expenses with Firebase
// 7292231132/592622
// 4751513132/241697
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// Firebase Realtime Database base URL
const FIREBASE_URL =
  "https://expenses-rtk-app-default-rtdb.firebaseio.com/expenses";

// -----------------------------------------------------------
// FETCH EXPENSES
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(`${FIREBASE_URL}.json`);
    const data = response.data;
console.log(data);

    if (!data) return [];
    return Object.keys(data).map((key) => ({
      
      firebaseId: key,
      ...data[key],
      
    }));
  }
);

// -----------------------------------------------------------
// DELETE EXPENSE
export const deleteExpenseFirebase = createAsyncThunk(
  "expenses/deleteExpenseFirebase",
  async (firebaseId) => {
    await axios.delete(`${FIREBASE_URL}/${firebaseId}.json`);
    return firebaseId;
  }
);

// -----------------------------------------------------------
// SLICE
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load expenses.";
      })
      .addCase(deleteExpenseFirebase.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (item) => item.firebaseId !== action.payload
        );
      });
  },
});

export const { addExpense } = expensesSlice.actions;

export const store = configureStore({
  reducer: {
    expenses: expensesSlice.reducer,
  },
});

export default store;
