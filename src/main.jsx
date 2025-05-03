import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './API/CartContext.jsx'
import { AuthProvider } from "./API/AuthContext.jsx";
import { OrderProvider } from "./API/OrderContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
     </AuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
