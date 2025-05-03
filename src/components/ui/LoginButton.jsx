import React from 'react'
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (      
     <Link to="/login">
      <button className="bg-black text-white px-4 py-2 rounded-md font-medium">
        Login
      </button>
    </Link>
  )
}