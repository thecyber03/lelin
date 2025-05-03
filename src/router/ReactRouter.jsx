import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home.jsx'
import ProductView from '../pages/ProductView.jsx'
import Cart from '../pages/Cart.jsx'
import Login from '../pages/Login.jsx'
import Search from '../pages/Search.jsx'
import Profile from '../pages/Profile.jsx'
import MyOrder from '../pages/MyOrder.jsx'
import Footer from '../components/Footer.jsx'

export default function ReactRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Home /> <Footer/> </>} />
        <Route path="/product/:id" element={<><ProductView /> <Footer/> </>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/s" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-order" element={<MyOrder />} />
      </Routes>
    </div>
  )
}