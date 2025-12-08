// ExpensesTable.js
// This file displays the list of expenses and allows deleting them.
// When delete is clicked, it deletes from Firebase AND Redux.

import { useSelector, useDispatch } from "react-redux";
import { deleteExpenseFirebase } from "../redux/store";

const ExpensesTable = () => {
  // Get expenses from Redux state
  const expenses = useSelector((state) => state.expenses.items);
  const dispatch = useDispatch();

  // Delete handler
  const onDeleteHandler = (firebaseId) => {
    dispatch(deleteExpenseFirebase(firebaseId));
  };

  return (
    <div className="bottom-section">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.firebaseId}>
              <td>{expense.title}</td>
              <td>{expense.date}</td>
              <td>{expense.value}</td>
              <td>
                <button
                  className="DeleteButton"
                  onClick={() => onDeleteHandler(expense.firebaseId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
