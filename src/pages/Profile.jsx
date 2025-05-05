import { useAuth } from "../API/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();
  return <nav className="text-white">{user ? `Welcome, ${user.email}` : "Please log in"}</nav>;
}
