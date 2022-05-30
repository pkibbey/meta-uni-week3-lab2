import axios from "axios";
import { useState } from "react"
import "./AddTransaction.css"

export default function AddTransaction({ setIsLoading, setError, transactionCount, setTransactions }) {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  async function handleOnSubmit(event) {
    if (!description || ~category || !amount) {
      setError('All fields must contain a value')
      return false;
    }

    setIsLoading(true)

    const result = await axios.post('http://localhost:3001/bank/transactions', {
      transaction: {
        id: transactionCount + 1,
        postedAt: new Date().toISOString(),
        description,
        category,
        amount: parseInt(amount, 10)  
      }
    })
    setTransactions(t => [...t, result.data.transaction])
    setDescription('')
    setCategory('')
    setAmount('')

    event.preventDefault()
    setIsLoading(false)
  }

  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter a category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
