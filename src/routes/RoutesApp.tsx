import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Authentication from "../pages/authentication/Authentication"
import Canvas from "../pages/canvas/Canvas"
import Account from "../pages/account/Account"

export default function RoutesApp() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Authentication />}/>
      <Route path="/canvas" element={<Canvas />}/>
      <Route path="/account" element={<Account />}/>
    </Routes>
  );
}