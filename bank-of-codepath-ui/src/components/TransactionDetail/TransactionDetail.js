import { useParams } from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail({ transactions, isLoading, error }) {
  const { transactionId } = useParams()
  const transaction = transactions.find(t => `${t.id}` === transactionId) // replace this

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p className="description">No transaction found</p>

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    )
  }

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  )
}
