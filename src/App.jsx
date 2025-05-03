import { useState } from "react";
import Navbar from './components/Navbar.jsx'
import ReactRouter from './router/ReactRouter.jsx'
import { ProductProvider } from './API/ProductContext.jsx'

export default function App() {
  
  return (
    <div>
      <Navbar />
      <ProductProvider>
       <ReactRouter/>
      </ProductProvider>
    </div>
  )
}