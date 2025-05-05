import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../API/AuthContext.jsx";

export default function NavbarMenu({ isActive, setIsActive }) {
  const { user, setUser } = useAuth(); // Get current user from context
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Clear user state
  };
 
  const menuItems = [
    { label: "HOME", path: "/" },
    ...(user
      ? [
          { label: "PROFILE", path: "/profile" },
          { label: "MY ORDER", path: "/my-order" },
          { label: "LOGOUT", action: handleLogout },
        ]
      : [{ label: "LOGIN", path: "/login" }]),
  ];

  

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/the_cyber_03" },
    { name: "Github", url: "https://github.com/thecyber03" },
    { name: "LinkedIn", url: "https://linkedin.com/in/aziz ansari" },
    { name: "abdulaziz86723@gmail.com", url: "mailto:abdulaziz86723@gmail.com" },
    { name: "lelin's admin panel", url: "https://lelin-admin-front.vercel.app" },
  ];

  return (
    <div
      className={`fixed z-[90] h-[103vh] left-0 w-full bg-gray-50 p-8 
      transition-all duration-500 ease-in-out flex flex-col justify-center gap-5 
      lg:flex-row lg:items-center ${isActive ? "top-16" : "-top-[110%] opacity-0"}`}
    >
      {/* Navigation Links */}
      <div onClick={() => setIsActive(false)}>
        {menuItems.map(({ label, path, action }, index) =>
          action ? (
            <button key={index} onClick={action} className="flex gap-2">
              <mark className="bg-transparent text-black font-semibold">{String(index + 1).padStart(2, "0")}</mark>
              <span className="font-[Grotesk] text-7xl lg:text-7xl leading-none">{label}</span>
            </button>
          ) : (
            <Link key={index} to={path} className="flex gap-2">
              <mark className="bg-transparent text-black font-semibold">{String(index + 1).padStart(2, "0")}</mark>
              <span className="font-[Grotesk] text-7xl lg:text-7xl leading-none">{label}</span>
            </Link>
          )
        )}
      </div>


      {/* Social Links */}
      <div className="flex flex-col text-sm">
        {socialLinks.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 underline text-blue-500 font-semibold"
          >
            {name}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
