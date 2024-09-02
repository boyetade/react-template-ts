import { useEffect, useState } from "react";

type ExpenseData = {
  expenseId: string;
  merchant: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: string;
};
function DataTable() {
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]); //create a type
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const resp = await fetch(
          "https://expenses-backend-mu.vercel.app/expenses",
          {
            headers: {
              "Content-Type": "application/json",
              Username: "bola.oyetade",
            },
          }
        );
        const data = await resp.json();
        setExpenseData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenseData();
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Date</th>
            <th style={{ textAlign: "left" }}>Merchant</th>
            <th style={{ textAlign: "left" }}>Amount</th>
            <th style={{ textAlign: "left" }}>Category</th>
            <th style={{ textAlign: "left" }}>Description</th>
            <th style={{ textAlign: "left" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {expenseData.map((e) => (
            <tr key={e.expenseId}>
              <td className="">{formatDate(e.date)}</td>
              <td>{e.merchant}</td>
              <td>£{e.amount.toFixed(2)}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
