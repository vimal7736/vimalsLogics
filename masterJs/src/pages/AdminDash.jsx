import React, { useMemo, useRef, useState } from 'react'

const AdminDash = () => {

  const [transactions, setTransactoins] = useState([
    { id: 1, type: "credit", amount: 5000 },
    { id: 2, type: "debit", amount: 5200 },
    { id: 3, type: "credit", amount: 5300 },
    { id: 4, type: "debit", amount: 500 },
  ])


  const totalAmount = useMemo(() => {

    return transactions.reduce((acc, txn) => {
      return txn.type == "credit"
        ?
        (
          acc + txn.amount
        ) : (
          acc - txn.amount
        )

    }, 0)

  }, [transactions])

  return (
    <div>

      Admin

      {/* <div>{totalAmount}</div> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          {
            transactions.map((items) => (
              <tr>
                <td>{items.id}</td>
                <td>{items.type}</td>
                <td>{items.amount}</td>

              </tr>
            ))
          }
          <td>{totalAmount}</td>

        </tbody>
      </table>
    </div>
  )
}

export default AdminDash