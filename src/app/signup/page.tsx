/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-vars 
"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",        
    })
    const [buttonDisabled,setButtonDisabled] =React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignup = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");

        } catch (error:any) {
            console.log("Signup failed",error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    },[user]);

return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {loading ? "Processing..." : "Create an Account"}
        </h1>
        {!loading && (
          <p className="mt-2 text-gray-400 text-sm">
            Join us and get started today
          </p>
        )}
      </div>

      {/* Username */}
      <div className="mb-5">
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full rounded-lg bg-gray-900/60 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="Username"
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full rounded-lg bg-gray-900/60 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="Email"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full rounded-lg bg-gray-900/60 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="Password"
        />
      </div>

      {/* Signup Button */}
      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className={`w-full rounded-lg py-3 font-semibold transition-all duration-200 ${
          buttonDisabled || loading
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30"
        }`}
      >
        {loading ? "Processing..." : buttonDisabled ? "Fill all details" : "Sign Up"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <span className="h-px flex-1 bg-gray-700"></span>
        <span className="text-gray-500 text-xs uppercase tracking-wide">or</span>
        <span className="h-px flex-1 bg-gray-700"></span>
      </div>

      {/* Footer */}
      <p className="text-center mt-6 text-gray-400 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  </div>
);





}