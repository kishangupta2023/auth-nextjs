"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios";



export default function LoginPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",        
    })
    const onLogin = async () =>{

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
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