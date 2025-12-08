import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "./redux/store";
import { Container, Box, Typography, Skeleton } from "@mui/material";

import ExpensesForm from "./Components/ExpensesForm";
import ExpensesTable from "./Components/ExpensesTable";
import MainImage from "./resources/Images/m1.png";

const App = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchExpenses());
    const timer = setTimeout(() => setFakeLoading(false), 1800); // simulate slow loading
    return () => clearTimeout(timer);
  }, [dispatch]);

  const isLoading = loading || fakeLoading;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        gap={4}
        mb={4}
      >
        <Box
          flex={1}
          sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 4 }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={250} />
          ) : (
            <img
              src={MainImage}
              alt="Main Visual"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Box>

        <Box flex={1} sx={{ p: 2, borderLeft: { md: "4px solid #6776af" } }}>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="70%" height={50} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={30} />
            </>
          ) : (
            <>
              <Typography variant="h4" color="primary" gutterBottom>
                Welcome to Expenses Manager
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Track your expenses in real-time using Firebase and Redux
                Toolkit.
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <ExpensesForm loading={isLoading} />
      <ExpensesTable Expenses={expenses} loading={isLoading} />
    </Container>
  );
};

export default App;
