import React, { useEffect, useState } from 'react';
import ResponsiveTable from '../components/ui/ResponsiveTable';

const mockData = {
  user: {
    name: "vimal suresh",
    accNumber: "123456789012",
    transactions: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      type: i % 2 === 0 ? "credit" : "debit",
      amount: 1000 + i * 100,
      date: `2024-12-${(i % 30 + 1).toString().padStart(2, "0")}`,
    })),
  },
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setUserData(mockData);
    }, 1000);
  }, []);

  const maskAccountNumber = (accNumber) =>
    "***** ***** ***** " + accNumber.slice(-4);

  const calculateBalance = (transactions) =>
    transactions.reduce(
      (acc, txn) => (txn.type === "credit" ? acc + txn.amount : acc - txn.amount),
      0
    );

  if (!userData) return <div>Loading Dashboard...</div>;

  const { name, accNumber, transactions } = userData.user;

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'type', header: 'Type' },
    { key: 'amount', header: 'Amount (₹)' },
    { key: 'date', header: 'Date' },
  ];

  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  console.log(totalPages);
  
  const paginatedData = transactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Welcome, {name}</h2>
      <div className="text-gray-600">Account: {maskAccountNumber(accNumber)}</div>
      <div className="text-green-600 font-medium">
        Balance: ₹{calculateBalance(transactions)}
      </div>

      <h3 className="text-lg mt-4 mb-2 font-semibold">Transaction History</h3>
      <ResponsiveTable columns={columns} data={paginatedData} />

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
