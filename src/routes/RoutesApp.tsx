import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/Login"
import Canvas from "../pages/canvas/Canvas"
import Account from "../pages/Account"

export default function RoutesApp() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/canvas" element={<Canvas />}/>
      <Route path="/account" element={<Account />}/>
    </Routes>
  );
}