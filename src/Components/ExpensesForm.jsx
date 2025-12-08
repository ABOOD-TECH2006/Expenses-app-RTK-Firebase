// ExpensesForm.js
// This component handles the form to add a new expense.
// It sends data to Firebase (POST), then adds it to Redux.

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/store";
import axios from "axios";

const ExpensesForm = () => {
  const TitleRef = useRef();
  const DateRef = useRef();
  const ValueRef = useRef();
  const DescriptionRef = useRef();

  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !TitleRef.current.value ||
      !DateRef.current.value ||
      !ValueRef.current.value ||
      !DescriptionRef.current.value
    ) {
      return alert("Please fill out all fields.");
    }

    // Expense object
    const expense = {
      title: TitleRef.current.value,
      date: DateRef.current.value,
      value: ValueRef.current.value,
      description: DescriptionRef.current.value,
    };

    // Send expense to Firebase
    const response = await axios.post(
      "https://expenses-rtk-app-default-rtdb.firebaseio.com/expenses.json",
      expense
    );

    const firebaseId = response.data.name; // Firebase ID returned

    // Add to Redux
    dispatch(addExpense({ firebaseId, ...expense }));

    // Clear inputs
    TitleRef.current.value = "";
    DateRef.current.value = "";
    ValueRef.current.value = "";
    DescriptionRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input type="text" ref={TitleRef} placeholder="Expense title" />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" ref={DateRef} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Value</label>
          <input type="number" ref={ValueRef} placeholder="Amount" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" ref={DescriptionRef} placeholder="About expense" />
        </div>
      </div>

      <button className="save-btn">Save</button>
    </form>
  );
};

export default ExpensesForm;
