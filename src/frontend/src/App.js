import { BrowserRouter, Routes, Route } from "react-router-dom"

import Products from "./pages/Products"
import Payment from "./pages/Payment"
import Navbar from "./components/Navbar"

function App(){

  return(

    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route path="/" element={<Products/>} />

        <Route path="/payment/:price" element={<Payment/>} />

      </Routes>

    </BrowserRouter>

  )

}

export default App