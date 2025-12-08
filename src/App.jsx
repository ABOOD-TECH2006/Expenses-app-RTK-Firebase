import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "./redux/store";

import ExpensesForm from "./Components/ExpensesForm";
import ExpensesTable from "./Components/ExpensesTable";

import MainImage from "./resources/Images/m1.png";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      {/* TOP SECTION */}
      <div className="top-section">
        <img src={MainImage} alt="App Banner" />

        <section>
          <span>Expense Manager</span>
          <p>
            Track your daily expenses, save them securely in Firebase, and
            manage your financial records easily with RTK.
          </p>
        </section>
      </div>

      {/* FORM SECTION */}
      <div className="form-section">
        <ExpensesForm />
      </div>

      {/* TABLE SECTION */}
      <div className="bottom-section">
        <ExpensesTable />
      </div>
    </div>
  );
};

export default App;
