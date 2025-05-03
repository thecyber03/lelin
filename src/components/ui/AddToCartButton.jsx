import { useCart } from "../../API/CartContext.jsx";

export default function AddToCartButton({ product }) {
  const { cart, addToCart, removeFromCart } = useCart();

  // Check if any item in the cart matches the base product ID (ignoring unique suffix)
  const matchingItems = cart.filter((item) => item._id === product._id);
  const isInCart = matchingItems.length > 0;

  function handleClick(e) {
    e.stopPropagation();

    if (isInCart) {
      // Remove only the latest added item (optional: change logic to remove first if needed)
      const itemToRemove = matchingItems[matchingItems.length - 1];
      removeFromCart(itemToRemove._id);
    } else {
      addToCart(product);
    }
  }

  return (
    <button 
      className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap lg:text-[10px] lg:px-[4px] lg:py-[1px] ${
        isInCart ? "bg-gray-500 text-white" : "bg-green-700 text-white"
      }`}
      onClick={handleClick}
    >
      {isInCart ? "Added" : "Add to Cart"}
    </button>
  );
}
