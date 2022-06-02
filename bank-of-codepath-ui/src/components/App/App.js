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

  const fetchData = async () => {
    setIsFetching(true)
    setError('');

    const transactionResult = await axios.get(`http://localhost:3001/bank/transactions`)
    setTransactions(transactionResult.data.transactions)

    const transferResult = await axios.get(`http://localhost:3001/bank/transfers`)
    setTransfers(transferResult.data.transfers)

    setIsFetching(false)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <Navbar
        filterInputValue={filterInputValue}
        setFilterInputValue={setFilterInputValue}
      />
      {!!error && <div id="error">{error}</div>}
      <Routes>
        <Route
          path="/"
          element={<Home
            transfers={transfers}
            transactions={transactions}
            setTransactions={setTransactions}
            setError={setError}
            setIsLoading={setIsFetching}
            filterInputValue={filterInputValue}
            fetchData={fetchData}
          />} 
        />
        <Route
          path="/transaction/:transactionId"
          element={<TransactionDetail 
            isLoading={isFetching}
            setIsLoading={setIsFetching}
            error={error}
            fetchData={fetchData}
          />}
        />
      </Routes>      
    </div>
  )
}
