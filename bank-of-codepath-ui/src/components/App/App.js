import React, { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"

import "./App.css"
import axios from 'axios'
import { Route, Routes } from "react-router-dom"


export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const [filterInputValue, setFilterInputValue] = useState('')
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      const result = await axios.get(`http://localhost:3001/bank/transactions`)
      setTransactions(result.data.transactions)
      setIsFetching(false)
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/transaction/:transactionId"
          element={<TransactionDetail
            transactions={transactions}
            isLoading={isFetching}
            error={error}
          />}
        />
      </Routes>      
    </div>
  )
}
