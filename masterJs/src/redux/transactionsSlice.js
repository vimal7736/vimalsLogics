import { createSlice } from '@reduxjs/toolkit';

const initialTransactions = [
  { id: 1, type: "credit", amount: 2500.00, description: "Salary Deposit", date: "2025-04-10" },
  { id: 2, type: "debit", amount: 85.43, description: "Grocery Store", date: "2025-04-09" },
  { id: 3, type: "debit", amount: 122.15, description: "Electric Bill", date: "2025-04-08" },
  { id: 4, type: "credit", amount: 300.00, description: "Freelance Work", date: "2025-04-07" },
  { id: 5, type: "debit", amount: 56.80, description: "Dinner", date: "2025-04-06" },
  { id: 6, type: "debit", amount: 42.50, description: "Gas Station", date: "2025-04-05" }
];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactions,
  reducers: {
    addTransaction(state, action) {
      state.unshift(action.payload);
    }
  }
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
