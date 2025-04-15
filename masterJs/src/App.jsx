import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance } from './redux/userSlice';
import { addTransaction } from './redux/transactionsSlice';

const App = () => {
  const user = useSelector((state) => state.user);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const handleTransaction = () => {
    const newTx = {
      id: Date.now(),
      type: 'debit',
      amount: 100,
      description: 'Shopping',
      date: new Date().toISOString().slice(0, 10),
    };

    dispatch(updateBalance({ type: newTx.type, amount: newTx.amount }));
    dispatch(addTransaction(newTx));
  };

  return (
    <div className="p-4">
      <h1>Hello, {user.name}</h1>
      <p>Balance: ${user.balance.toFixed(2)}</p>
      <button onClick={handleTransaction}>Simulate Debit</button>

      <h2 className="mt-4">Transactions:</h2>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.date} - {tx.type.toUpperCase()} - ${tx.amount} - {tx.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
