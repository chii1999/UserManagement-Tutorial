import React from "react"
import Drawer from "./components/Drawer"
import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Sigup from "./Sigup"

const App = () => {
  const token = localStorage.getItem("Token")

  if (!token) {
    return <Login />
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigup" element={<Sigup />} />
        <Route path="/*" element={<Drawer />} />
      </Routes>
    </div>
  )
}

export default App
