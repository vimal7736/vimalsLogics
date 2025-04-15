import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";


const sampleData = [
    { date: "2025-04-01", description: "Grocery", type: "debit", amount: 250 },
    { date: "2025-04-03", description: "Salary", type: "credit", amount: 3000 },
    { date: "2025-04-10", description: "Electricity Bill", type: "debit", amount: 120 },
    { date: "2025-04-12", description: "Freelance", type: "credit", amount: 500 },
    { date: "2025-04-01", description: "Grocery", type: "debit", amount: 250 },
    { date: "2025-04-03", description: "Salary", type: "credit", amount: 3000 },
    { date: "2025-04-10", description: "Electricity Bill", type: "debit", amount: 120 },
    { date: "2025-04-12", description: "Freelance", type: "credit", amount: 500 },
    { date: "2025-04-01", description: "Grocery", type: "debit", amount: 250 },
    { date: "2025-04-03", description: "Salary", type: "credit", amount: 3000 },
    { date: "2025-04-10", description: "Electricity Bill", type: "debit", amount: 120 },
    { date: "2025-04-12", description: "Freelance", type: "credit", amount: 500 },
    { date: "2025-04-01", description: "Grocery", type: "debit", amount: 250 },
    { date: "2025-04-03", description: "Salary", type: "credit", amount: 3000 },
    { date: "2025-04-10", description: "Electricity Bill", type: "debit", amount: 120 },
    { date: "2025-04-12", description: "Freelance", type: "credit", amount: 500 },
    { date: "2025-04-01", description: "Grocery", type: "debit", amount: 250 },
    { date: "2025-04-03", description: "Salary", type: "credit", amount: 3000 },
    { date: "2025-04-10", description: "Electricity Bill", type: "debit", amount: 120 },
    { date: "2025-04-12", description: "Freelance", type: "credit", amount: 500 },
  ];

const TransactionTable = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sorting, setSorting] = useState([]);

  // Filter logic
  const filteredData = useMemo(() => {
    return sampleData
      .filter((row) => {
        if (typeFilter) return row.type === typeFilter;
        return true;
      })
      .filter((row) => {
        if (startDate && new Date(row.date) < new Date(startDate)) return false;
        if (endDate && new Date(row.date) > new Date(endDate)) return false;
        return true;
      });
  }, [sampleData, typeFilter, startDate, endDate]);

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: info => `$${info.getValue()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label>Type: </label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div>
          <label>Start Date: </label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
