import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './AuthContext.jsx'

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara/get-orders/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders(); // ✅ Fetch orders on mount
  }, []);

  return (
    <OrderContext.Provider value={{ orders, setOrders, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
