import { Routes, Route } from "react-router-dom"
import Signup from "./Signup.jsx"
import Home from "./Home.jsx"

export default function App() {
  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </div>
    </>
  )
}