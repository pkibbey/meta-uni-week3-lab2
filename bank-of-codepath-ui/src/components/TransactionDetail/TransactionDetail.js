import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail({ fetchData, isLoading, setIsLoading, error }) {
  const { transactionId } = useParams()

  const [transaction, setTransaction] = useState({})

  async function payTransaction(transactionId) {
    const transaction = await axios.put(`http://localhost:3001/bank/transactions/${transactionId}`)
    setTransaction(transaction.data.transaction);
    fetchData();
  }

  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true)
      const result = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
      setTransaction(result.data.transaction)
      setIsLoading(false)
    }

    fetchTransactionById();
  }, [transactionId, setIsLoading])

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
        {transaction.amount < 0 && (
          <button
            style={{
              backgroundColor: transaction.paid ? 'darkorange' : 'greenyellow',
              color: transaction.paid ? 'white' : 'inherit',
              cursor: transaction.paid ? 'default' : 'pointer',
              alignSelf: 'center',
              padding: '8px 16px',
              borderRadius: '5px',
              marginTop: '16px'
            }}
            disabled={!!transaction.paid}
            onClick={(e) => {
              if (!transaction.paid) {
                e.stopPropagation()
                e.preventDefault()
                payTransaction(transaction.id)  
              }
            }}
          >{transaction.paid ? 'Paid' : 'Pay'}</button>
        )}
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
