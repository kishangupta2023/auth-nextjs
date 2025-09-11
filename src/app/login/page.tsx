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
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"Login"}</h1>
            <hr/>
            <label htmlFor="email">Email</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600"
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
            onClick={onLogin}
            >
                Login
            </button>
            <Link href="/signup" className="mt-4 text-gray-500 hover:underline">Visit Signup page </Link>
        </div>
    )
}