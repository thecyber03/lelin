import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Import Heroicons
import { useNavigate } from "react-router-dom";

export default function SearchProduct() {
  const navigate = useNavigate()
 
  const handleClick = () => {
     navigate('/s')
  }

  return (
    <div onClick={handleClick}
      className="bg-white flex items-center gap-2 border border-gray-300 rounded-md p-2">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      <p className="text-gray-500">Search by name, category</p>
    </div>
  );
}
