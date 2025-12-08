// src/redux/store.js
// This file manages the global state of the app using Redux Toolkit.
// It handles: fetching expenses from Firebase, deleting expenses, and storing them in Redux.

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
// FETCH ALL EXPENSES FROM FIREBASE (GET)
// This sends a GET request to Firebase and converts the returned object to an array.
// -----------------------------------------------------------
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(`${FIREBASE_URL}.json`);
    const data = response.data;

    if (!data) return [];

    // Firebase returns an object => Convert to array
    return Object.keys(data).map((key) => ({
      firebaseId: key,
      ...data[key],
    }));
  }
);

// -----------------------------------------------------------
// DELETE AN EXPENSE FROM FIREBASE (DELETE)
// This deletes a specific expense by its Firebase ID.
// -----------------------------------------------------------
export const deleteExpenseFirebase = createAsyncThunk(
  "expenses/deleteExpenseFirebase",
  async (firebaseId) => {
    await axios.delete(`${FIREBASE_URL}/${firebaseId}.json`);
    return firebaseId;
  }
);

// -----------------------------------------------------------
// SLICE (Reducers + extra actions)
// -----------------------------------------------------------
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Adds an expense locally AFTER it is saved to Firebase
    addExpense(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // When fetch begins
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })

      // When fetch is successful
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // When fetch fails
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load expenses.";
      })

      // When an expense is successfully deleted
      .addCase(deleteExpenseFirebase.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.firebaseId !== action.payload
        );
      });
  },
});

export const { addExpense } = expensesSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    expenses: expensesSlice.reducer,
  },
});
export default store