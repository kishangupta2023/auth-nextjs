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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing":"Signup"}</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600 "
            type="text" 
            id="username" 
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600 "
            type="text" 
            id="email" 
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600"
            type="password" 
            id="password" 
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={onSignup}
            >
                {buttonDisabled ? "Fill all the details" : "Signup"}
            </button>
            <Link href="/login" className="mt-4 text-gray-500 hover:underline">Visit login page </Link>
        </div>
    )
}