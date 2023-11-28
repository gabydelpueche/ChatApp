import { Routes, Route } from "react-router-dom"
import Signup from "./Signup.jsx"
import Home from "./Home.jsx"
import Login from "./Login.jsx"
import Chat from "./Chat.jsx"

export default function App() {
  return (
    <>
      <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
      </div>
    </>
  )
}