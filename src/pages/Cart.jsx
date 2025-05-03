import React from "react";
import { useCart } from "../API/CartContext.jsx";
import { Link } from "react-router-dom";
import LoginButton from '../components/ui/LoginButton.jsx';
import { useAuth } from "../API/AuthContext.jsx";
import axios from 'axios';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  // Calculate total amount correctly
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.NumberOfItem), 0);
  
  const placeOrder = async () => {
    if (!user.address) {
      const address = prompt("Enter your address to proceed:");
      if (!address) return alert("Address is required.");
  
      try {
        await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/update-address/${user._id}`, { address });
      } catch (error) {
        return alert("Failed to update address. Try again.");
      }
    }
  
    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara/place-order/${user._id}`,
        { userId: user._id, cart, totalAmount }
      );
  
      status === 200 ? (alert("Order placed!"), clearCart()) : alert("Order failed. Try again.");
    } catch {
      alert("Error placing order. Try again later.");
    }
  };

  


  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <p className="text-md text-gray-500 font-semibold">Your cart is empty.</p>
        {!user && (
          <Link to="/login">
            <p className="text-sm text-gray-500 cursor-pointer">
              Please <mark className="text-blue-500 underline bg-transparent font-semibold">Login</mark> to continue shopping
            </p>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item._id} className="flex items-center gap-4 border-b py-2">
          {/* Image */}
          <div className="w-16 h-16 overflow-hidden flex justify-center items-center bg-gray-100 rounded-md">
            {item.images && (
              <img src={item.images[0]} alt={item.title} className="h-full w-auto object-contain" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="flex gap-1">
              <p className="text-gray-500 text-sm">{item.quantity}</p>
              <p className="text-gray-500 text-sm">{item.unit}</p>
            </div>
            <p className="text-gray-700 font-semibold">₹{item.price * item.NumberOfItem}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                item.NumberOfItem > 1
                  ? updateCartQuantity(item._id, item.NumberOfItem - 1)
                  : removeFromCart(item._id)
              }
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-lg"
            >
              -
            </button>
            <span className="font-semibold">{item.NumberOfItem}</span>
            <button
              onClick={() => updateCartQuantity(item._id, item.NumberOfItem + 1)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-lg"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total & Checkout Section */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center border-t px-4 py-5 bg-white">
        <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>

        {user ? (
          <Link to="/my-order">
            <button onClick={placeOrder} className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">
              Place Order
            </button>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
