/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",        
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onLogin = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success",response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed",error.message);
            toast.error("Login failed")
        } finally{
            setLoading(false);
        }
    }
    const forgotPassword =()=>{
      try {
        router.push("/forgot-password");
      } catch (error:any) {
        console.log(error.message);
        toast.error("Something went wrong");
      }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8">
           <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {loading ? "Processing..." : "Welcome Back"}
         </h1>

         <p className="text-center text-gray-300 mb-8 text-sm">
          Login to continue to your dashboard
         </p>

          <label htmlFor="email" className="block text-gray-200 font-medium mb-1">
          Email
         </label>
    <input
      className="w-full bg-white/20 text-white placeholder-gray-400 border border-white/30 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
      type="text"
      id="email"
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Enter your email"
    />

    <label htmlFor="password" className="block text-gray-200 font-medium mb-1">
      Password
    </label>
    <input
      className="w-full bg-white/20 text-white placeholder-gray-400 border border-white/30 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
      type="password"
      id="password"
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Enter your password"
    />

    <button
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
      onClick={onLogin}
    >
      {loading ? "Please Wait..." : "Login"}
    </button>

    <p className="text-center mt-6 text-gray-300">
      <Link href="/forgotpassword" className="text-purple-400 hover:text-purple-300 font-medium">
        Forgot password?
      </Link>
    </p>
    <p className="text-center mt-6 text-gray-300">
      Don’t have an account?{" "}
      <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
        Sign up
      </Link>
    </p>
  </div>
</div>

    )
}