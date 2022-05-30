import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home({ setIsLoading, filterInputValue, transfers, transactions, setTransactions, setError }) {
  const value = filterInputValue.toLowerCase()

  const filteredTransactions = filterInputValue ? transactions.filter(t => {
    return (
      !!t.description.toLowerCase().includes(value) ||
      !!t.category.toLowerCase().includes(value)
    )
  }) : transactions

  return (
    <div className="Home">
      <AddTransaction setIsLoading={setIsLoading} setError={setError} setTransactions={setTransactions} transactionCount={transactions.length} />
      <BankActivity transfers={transfers} transactions={filteredTransactions} />
    </div>
  )
}
