import React, { useState } from 'react';

const mockData = [
  { id: 1, name: 'Alice', amount: 500, date: '2025-04-01' },
  { id: 2, name: 'Bob', amount: 1000, date: '2025-04-02' },
  { id: 3, name: 'Charlie', amount: 750, date: '2025-04-03' },
  { id: 4, name: 'David', amount: 200, date: '2025-04-04' },
  { id: 5, name: 'Eva', amount: 1200, date: '2025-04-05' },
  { id: 6, name: 'Frank', amount: 300, date: '2025-04-06' },
  { id: 7, name: 'Grace', amount: 900, date: '2025-04-07' },
  { id: 8, name: 'Henry', amount: 400, date: '2025-04-08' },
  { id: 9, name: 'Ivy', amount: 1100, date: '2025-04-09' },
  { id: 10, name: 'Jack', amount: 600, date: '2025-04-10' },
];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">₹{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-gray-700 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
