import { useState, useEffect } from "react";
import { useAuth } from "../API/AuthContext.jsx";
import axios from "axios";
import { useOrders } from "../API/OrderContext.jsx";


export default function MyOrder() {
  const { user } = useAuth();
  const { fetchOrders } = useOrders(); // ✅ Access OrderContext
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara/get-orders/${user._id}`
        );
        setOrders(response.data);
        fetchOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara/cancel-order/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  if (!user) {
    return <p className="text-center text-black p-4">Please log in to view your orders.</p>;
  }
  
  const addressUpdate = async () => {
    const address = prompt("Enter your new address:");
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/update-address/${user._id}`, { address });
      alert("Address updated successfully!");
    } catch {
      alert("Failed to update address. Try again.");
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-400";
      case "Shipped": return "bg-orange-400";
      case "Delivered": return "bg-green-400";
      case "Cancelled": return "bg-red-400";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-black font-bold mb-2">My Orders</h1>
      <div className="bg-black text-white text-sm p-1 rounded flex justify-between items-center">
        <p>Delivery Address: <bold className="font-semibold">{user.address}</bold></p>
        <button onClick={addressUpdate}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"> <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /> </svg>
        </button>
      </div>

      {orders.map((order) => (
        <div key={order._id} className="border border-black p-4 my-3 rounded shadow-sm bg-[#5C899D] text-black">
          <p className="text-sm bg-[#E9E9EA] text-black p-2 rounded font-medium">Order ID: <bold className="font-semibold">{order._id}</bold></p>
          <p className="text-sm bg-[#E9E9EA] text-black p-2 rounded font-medium mt-2">Delivery OTP: <bold className="font-semibold">{order.deliveryOtp}</bold></p>

          {order.cart.map((item, i) => (
            <div key={i} className="my-5 pb-3 border-b border-[#000]">
              <h1 className="font-semibold">Item: {i + 1}</h1>
              <div className="flex gap-3">
                <img src={item.images[0]} className="h-20 rounded-md shadow-sm border border-black" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>₹{item.price}</p>
                  <p className="text-gray-950">{item.quantity} {item.unit}</p>
                </div>
              </div>
              <p className="mt-2 text-sm">
                Total: ₹{item.price} × {item.NumberOfItem} = <span className="font-medium">₹{item.price * item.NumberOfItem}</span>
              </p>
            </div>
          ))}

          {/* ✅ Styled Payable Amount Section */}
          <div className="mt-2 bg-[#E9E9EA] text-black p-3 rounded">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{order.cart.reduce((acc, item) => acc + item.price * item.NumberOfItem, 0)}</span>
            </div>
            <div className="flex  justify-between text-sm">
              <span>GST (18%)</span>
              <span>₹{(order.totalAmount * 0.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Charge</span>
              <span>₹{Math.ceil(order.totalAmount / 1000) * 10}</span>
            </div>
            <hr className="my-2 border-gray-400" />
            <div className="flex justify-between font-semibold text-base">
              <span>Payable Amount</span>
              <span>₹{(order.totalAmount + order.totalAmount * 0.18 + Math.ceil(order.totalAmount / 1000) * 10).toFixed(2)}</span>
            </div>
          </div>

          {/* ✅ Order Status UI */}
          <div className="relative mb-4">
            <p className="text-sm font-semibold mb-1">Order Status</p>
            <div className="w-full h-2 bg-gray-400 rounded-full">
              <div className={`h-2 rounded-full ${getStatusColor(order.status)}`} style={{ width: order.status === "Pending" ? "25%" : order.status === "Shipped" ? "50%" : order.status === "Delivered" ? "100%" : "0%" }}></div>
            </div>
            <p className={`text-xs mt-1 font-medium ${getStatusColor(order.status)}`}>{order.status}</p>
          </div>

          {/* ✅ Payment Status UI */}
          <div className="mt-2 bg-[#E9E9EA] text-black p-3 rounded">
            <div className="flex  justify-between text-sm">
              <span>Payment Status</span>
              <span className={order.paymentStatus === "Paid" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* ✅ Delivery Date UI */}
          <div className="mt-2 bg-[#E9E9EA] text-black p-3 rounded">
            <div className="flex justify-between text-sm">
              <span>Estimated Delivery Date</span>
              <span className="font-semibold">{new Date(order.deliveryDate).toDateString()}</span>
            </div>
          </div>

          {/* ✅ Cancel Order Button */}
          <button
            onClick={() => cancelOrder(order._id)}
            className="bg-red-400 hover:bg-red-500 text-white p-2 rounded mt-3 w-full text-center"
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
}
