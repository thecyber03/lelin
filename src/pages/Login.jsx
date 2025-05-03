import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/ui/BrandLogo.jsx'
import axios from "axios";
import { useAuth } from '../API/AuthContext.jsx'

const API = import.meta.env.VITE_BACKEND_URI;

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { fetchUser } = useAuth();

  const handleSubmit = async () => {
    if (!(step === 1 ? email : otp)) return alert(`Enter ${step === 1 ? "email" : "OTP"}`);
    setLoading(true);
    try {
      const url = `${API}/${step === 1 ? "send-otp" : "verify-otp"}`;
      const { data } = await axios.post(url, { email, otp });
      if (step === 1) setStep(2);
      else {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        fetchUser(); // ✅ Update state immediately
        window.dispatchEvent(new Event("storage")); // ✅ Notify all components
        navigate('/')
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };
  
  useEffect(() => {
    async function keepwarm() {
     const res = await axios.get(`${API}/keep-warm`)
     console.log(res.data)
    }
    keepwarm()
  }, [])
  

  return (
    <div className="h-[85vh] flex justify-center items-end lg:items-center">
      <div className="bg-white w-[85vw] lg:w-[30vw] p-3 shadow rounded mb-16 lg:mb-0">
        <div className="w-full text-center">
        <BrandLogo/>
        </div>
        <p className="text-xs text-gray-500 text-center mb-2">Login or Signup</p>
       
        <InputField 
          label={step === 1 ? "Email" : "Enter OTP"} 
          value={step === 1 ? email : otp} 
          onChange={(e) => (step === 1 ? setEmail(e.target.value) : setOtp(e.target.value))} 
        />
        {step !== 1 && <p className="text-xs text-gray-500">OTP sent at email <bold className="text-black font-bold">{email}</bold></p>}
        {step !== 1 && <p className="text-xs text-gray-500">Check Inbox or Spam mails</p>}


        <button 
          onClick={handleSubmit} 
          disabled={loading || (step === 1 ? !email.trim() : !otp.trim())} 
          className="bg-black text-white w-full p-2 rounded mt-3 lg:text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (step === 1 ? "Sending..." : "Verifying...") : (step === 1 ? "Continue" : "Verify")}
        </button>


        <p className="text-xs text-gray-500 text-center mt-2 lg:text-[10px]">
          Aziz Ansari © 2025 <mark className="text-blue-500 underline bg-transparent">Terms & Conditions</mark>
        </p>
      </div>
    </div>
  );
}

const InputField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 lg:text-xs">
    <label>{label}</label>
    <input type="text" value={value} onChange={onChange} className="border rounded p-2 outline-none focus:border-black w-full" />
  </div>
);
