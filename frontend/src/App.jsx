import { Routes, Route } from "react-router-dom"
import Signup from "./Signup.jsx"

export default function App() {
  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<Signup />} />
            {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
          </Routes>
      </div>
    </>
  )
}